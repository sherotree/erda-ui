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
import { Popover, Tag } from 'core/nusi';
import { formatTime } from 'common/utils';
import mspStore from 'msp/stores/micro-service';
import { last, map, throttle } from 'lodash';
import './log-context.scss';
import { LogContextHeader } from './log-context-header';
import { LogContextContent } from './log-context-content';
import { useUpdate } from 'common';

const INITIAL = 'INITIAL';
const BEFORE = 'BEFORE';
const AFTER = 'AFTER';

const LogContext = ({ source, data, fields }: { source: any; data: any }) => {
  const zeroLog = data.find((item) => item.source._id === source._id);
  const clusterName = mspStore.useStore((s) => s.clusterName);
  const ref = React.useRef();
  const activeRef = React.useRef();
  const [{ logData, current, usedIds, operate, contextFields, sort, query }, updater, update] = useUpdate({
    logData: [],
    current: source,
    usedIds: new Set(),
    operate: INITIAL,
    contextFields: fields,
    sort: 'asc',
    query: '',
  });

  const { getLogAnalyticContext } = mspLogAnalyticsStore.effects;
  const showTags = contextFields.filter((item) => item.display).map((item) => item.fieldName);
  const [filters, setFilters] = React.useState([] as string[]);

  const activeIndex = logData.findIndex((x) => x?.source?._id === source._id);
  const foo = ['source', 'id', 'stream', 'content', 'uniId'];

  function onScroll() {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;

    // 滚动到top的时候
    if (scrollTop < 10) {
      handleBefore();
    }

    // 滚动到底部的时候
    if (scrollHeight - scrollTop - clientHeight < 10) {
      handleAfter();
    }
  }

  const LogContextRecord = ({ item, isActive, order, showTags }) => {
    const { tags, ...rest } = item;
    return (
      <div
        className={`flex p-2 border-0 border-b border-brightgray border-solid ${
          isActive ? 'bg-yellow' : ''
        } hover:bg-magnolia`}
        ref={isActive ? activeRef : null}
        style={{ background: isActive ? 'purple' : 'white' }}
      >
        <div className="flex items-center flex-1">
          <div
            className={`mr-4 font-semibold ${order === 0 ? 'text-primary' : ''} ${
              order > 0 ? 'text-green' : 'text-red'
            }`}
          >
            {order}
          </div>
          <div className="font-semibold text-xs leading-5">{formatTime(rest.timestamp, 'MM-DD HH:mm:ss')}</div>
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
                  <Tag className="mr-2 text-xs" color="#999999">
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
                  <LogContextContent tag={tag} content={value} />
                </span>
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const throttleScroll = throttle(onScroll, 100);
  React.useEffect(() => {
    getLogAnalyticContext({
      timestampNanos: current.timestampNanos,
      id: current.id,
      offset: current.offset,
      sort,
      query,
      clusterName,
      count: 20,
    }).then((res) => {
      const content = res || [];
      if (usedIds.has(`${current._id}_${sort}`)) {
        return;
      }

      if (operate === INITIAL) {
        updater.logData([{ source }, ...content]);
      }
      if (operate === BEFORE) {
        updater.logData([...content, ...logData]);
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
    updater.current(logData?.[0]?.source);
    updater.sort('desc');
  }

  function handleAfter() {
    updater.operate(AFTER);
    const lastItem = last(logData) as any;
    updater.current(lastItem?.source);
    updater.sort('asc');
  }

  function scrollToActive() {
    activeRef.current.scrollIntoView();
  }

  return (
    <>
      <LogContextHeader
        zeroLog={zeroLog}
        source={source}
        handleBefore={handleBefore}
        handleAfter={handleAfter}
        handleQuery={(value: string) => updater.query(value)}
        scrollToActive={scrollToActive}
        contextFields={contextFields}
        setContextFields={(value: any) => updater.contextFields(value)}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="log-context-wrapper" ref={ref} onScroll={throttleScroll}>
        {map(logData, (item, index) => {
          const show =
            filters?.length === 0 || filters.every((filter) => foo.some((k) => item?.source?.[k]?.includes(filter)));

          return (
            show && (
              <LogContextRecord
                item={item.source}
                key={item.source._id}
                isActive={activeIndex === index}
                order={Number(index) - activeIndex}
                showTags={showTags}
              />
            )
          );
        })}
      </div>
    </>
  );
};

export default LogContext;
