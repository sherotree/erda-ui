// Copyright (c) 2021 Terminus, Inc.
//
// This program is free software: you can use, redistribute, and/or modify
// it under the terms of the GNU Affero General Public License, version 3
// or later ("AGPL"), as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import mspLogAnalyticsStore from 'msp/stores/log-analytics';
import { Popover, Tag, Spin, message } from 'core/nusi';
import { formatTime } from 'common/utils';
import mspStore from 'msp/stores/micro-service';
import { map, throttle, uniqueId, last } from 'lodash';
import './log-context.scss';
import { LogContextHeader } from './log-context-header';
import { LogContextContent } from './log-context-content';
import { EmptyHolder } from 'common';
import { useUpdate } from 'common/use-hooks';
import i18n from 'i18n';

const INITIAL = 'INITIAL';
const BEFORE = 'BEFORE';
const AFTER = 'AFTER';

interface ILogRecordProps {
  item: LOG_ANALYTICS.ILogSource;
  isActive: boolean;
  order: number;
  showTags: string[];
}

const LogContext = ({
  source,
  data,
  fields,
}: {
  source: LOG_ANALYTICS.ILogSource;
  data: LOG_ANALYTICS.LogItem[];
  fields: LOG_ANALYTICS.IField[];
}) => {
  const zeroLog = data.find((item) => item.source._id === source._id);
  const clusterName = mspStore.useStore((s) => s.clusterName);
  const ref = React.useRef();
  const activeRef = React.useRef();
  const [{ logData, current, usedIds, operate, contextFields, sort, query, filters, loading }, updater, update] =
    useUpdate({
      logData: [],
      current: source,
      usedIds: new Set(),
      operate: INITIAL,
      contextFields: fields,
      sort: 'asc',
      query: '',
      filters: [],
      loading: false,
    });

  const { getLogAnalyticContext } = mspLogAnalyticsStore.effects;
  const showTags = contextFields.filter((item) => item.display).map((item) => item.fieldName);
  const activeIndex = logData.findIndex((x) => x?.source?._id === source._id);

  const foo = ['source', 'id', 'stream', 'content', 'uniId'];

  function onScroll() {
    const { scrollTop = 0, scrollHeight = 0, clientHeight = 0 } = ref.current || {};

    // 滚动到top的时候
    if (scrollTop < 5) {
      handleBefore();
    }

    // 滚动到底部的时候
    if (scrollHeight - scrollTop - clientHeight < 5) {
      handleAfter();
    }
  }

  const LogContextRecord = ({ item, isActive, order, showTags }: ILogRecordProps) => {
    const { tags, ...rest } = item;
    return (
      <div
        className={`flex p-2 border-0 border-b border-brightgray border-solid ${
          isActive ? 'bg-light-cyan' : ''
        } hover:bg-magnolia`}
        ref={isActive ? activeRef : null}
      >
        <div className="flex items-center w-min">
          <div
            className={`mr-4 font-semibold ${order === 0 ? 'text-primary' : ''} ${
              order > 0 ? 'text-green' : 'text-red'
            }`}
          >
            {order}
          </div>
          <div className="font-semibold text-xs leading-5 w-24">{formatTime(rest.timestamp, 'MM-DD HH:mm:ss')}</div>
        </div>
        <div className="ml-4">
          <div className="flex flex-wrap flex-1 mb-1">
            {map(tags ?? {}, (tagName, tagKey) => {
              const fieldName = `tags.${tagKey}`;
              if (!showTags.includes(fieldName)) {
                return null;
              }
              return (
                <Popover
                  content={
                    <div>
                      <span className="bg-cultured leading-5 font-medium">{fieldName}</span>:{' '}
                      <span className="leading-5">{tagName}</span>
                    </div>
                  }
                >
                  <Tag className="mr-2 mb-1 text-xs" color="#999999">
                    {tagName}
                  </Tag>
                </Popover>
              );
            })}
          </div>
          {map(rest, (value, tag) => {
            if (!showTags.includes(tag)) {
              return null;
            }

            return (
              <p className="text-xs leading-5 relative">
                <span className="bg-cultured leading-5 font-medium">{tag}</span>:{' '}
                <span className="leading-5">
                  <LogContextContent content={value} />
                </span>
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const throttleScroll = throttle(onScroll, 800);

  React.useEffect(() => {
    updater.loading(true);
    getLogAnalyticContext({
      timestampNanos: current.timestampNanos,
      id: current.id,
      offset: current.offset,
      sort,
      query,
      clusterName,
      count: 20,
    }).then((res) => {
      updater.loading(false);
      const content = res || [];

      if (content?.length === 0) {
        throttle(message.info('没有更多数据'), 1000);
      }

      if (usedIds.has(`${current._id}_${sort}`)) {
        return;
      }

      if (operate === INITIAL) {
        updater.logData([{ source }, ...content]);
      }
      if (operate === BEFORE) {
        const _content = [...content].reverse();
        updater.logData([..._content, ...logData]);
        updater.sort('desc');
      }
      if (operate === AFTER) {
        updater.logData([...logData, ...content]);
        updater.sort('asc');
      }

      usedIds.add(`${current._id}_${sort}`);
      updater.usedIds(usedIds);
    });
  }, [current, sort, query]);

  function handleBefore() {
    updater.operate(BEFORE);
    updater.current(logData[0].source);
    updater.sort('desc');
  }

  function handleAfter() {
    updater.operate(AFTER);
    updater.current(last(logData).source);
    updater.sort('asc');
  }

  function scrollToActive() {
    activeRef.current.scrollIntoView();
  }

  const filterLogData = logData.filter(
    (item) => filters?.length === 0 || filters.every((filter) => foo.some((k) => item?.source?.[k]?.includes(filter))),
  );

  return (
    <>
      <LogContextHeader
        zeroLog={zeroLog}
        source={source}
        handleBefore={() => {
          handleBefore();
          ref.current.scrollTo({
            top: 10,
            left: 0,
            behavior: 'smooth',
          });
        }}
        handleAfter={() => {
          handleAfter();
          ref.current.scrollTo({
            top: ref.current.scrollHeight + 50,
            left: 0,
            behavior: 'smooth',
          });
        }}
        handleQuery={(value: string) => {
          update({
            query: value,
            logData: [],
            current: source,
            usedIds: new Set(),
            operate: INITIAL,
            sort: 'asc',
            loading: false,
          });
        }}
        scrollToActive={scrollToActive}
        contextFields={contextFields}
        setContextFields={(value: any) => updater.contextFields(value)}
        filters={filters}
        setFilters={(value: any[]) => updater.filters(value)}
      />
      <div className="log-context-wrapper h-5/6 overflow-auto" ref={ref} onScroll={throttleScroll}>
        {loading && operate === BEFORE && (
          <div className="flex justify-center mb-1">
            <Spin className="mr-2" />
            <span className="text-primary">{i18n.t('load more')}</span>
          </div>
        )}
        {map(filterLogData, (item, index) => {
          return (
            <LogContextRecord
              item={item.source}
              key={uniqueId()}
              isActive={activeIndex === index}
              order={Number(index) - activeIndex}
              showTags={showTags}
            />
          );
        })}
        {filterLogData?.length === 0 && <EmptyHolder relative />}
        {loading && operate === AFTER && (
          <div className="flex justify-center mt-1">
            <Spin className="mr-2" />
            <span className="text-primary">{i18n.t('load more')}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default LogContext;
