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
import { useUpdate } from 'common';
import { throttle } from 'lodash';
import moment from 'moment';
import i18n from 'i18n';
import { useMount, useUpdateEffect } from 'react-use';
import routeInfoStore from 'core/stores/route';
import { DoubleLeft as IconDoubleLeft, DoubleRight as IconDoubleRight } from '@icon-park/react';
import LogQuery from 'msp/pages/log-analysis/components/log-query';
import TimeChart from 'msp/pages/log-analysis/components/time-chart';
import ToolBar, { ISort } from 'msp/pages/log-analysis/components/tool-bar';
import FieldMenu from 'msp/pages/log-analysis/components/field-menu';
import LogRender from 'msp/pages/log-analysis/components/log-render';
import mspStore from 'msp/stores/micro-service';
import mspLogAnalyticsStore from 'msp/stores/log-analytics';
import { downLoadLogApi } from 'msp/services/log-analytics';
import { mergeSearch, qs, setApiWithOrg, updateSearch } from 'common/utils';
import { Spin } from 'core/nusi';
import { useLoading } from 'core/stores/loading';
import { transformQueryToTagMap } from 'msp/pages/log-analysis/components/utils';

interface IState {
  leftExpand: boolean;
  showTimeChart: boolean;
  sort: ISort;
  start: number;
  end: number;
  pageSize: number;
  pageNo: number;
  queryStr?: string;
  timeRange: { start?: number; end?: number };
  tempQueryStr?: string;
}

const SORT_MAP: { [k in ISort]: string[] } = {
  desc: ['timestamp desc', 'offset desc'],
  asc: ['timestamp asc', 'offset asc'],
};
const queries: { sort?: ISort; query: string } = qs.parse(location.search);

const LogAnalysis = () => {
  const { addonId } = routeInfoStore.useStore((s) => s.params);
  const clusterName = mspStore.useStore((s) => s.clusterName);
  const [showTags, logList, logTotal, fields] = mspLogAnalyticsStore.useStore((s) => [
    s.showTags,
    s.logList,
    s.logTotal,
    s.fields,
  ]);
  const [
    { showTimeChart, sort, queryStr, tempQueryStr, end, start, leftExpand, pageNo, pageSize, timeRange },
    updater,
    update,
  ] = useUpdate<IState>({
    leftExpand: true,
    showTimeChart: true,
    sort: queries.sort ?? 'asc',
    start: undefined!,
    end: undefined!,
    pageNo: 1,
    pageSize: 15,
    queryStr: queries.query,
    timeRange: {},
    tempQueryStr: queries.query,
  });
  const [isFetchLog] = useLoading(mspLogAnalyticsStore, ['getLogAnalytics']);
  const { getFields, getLogAnalytics } = mspLogAnalyticsStore.effects;
  useMount(() => {
    getFields();
  });
  const scrollEle = React.useRef<HTMLDivElement>(null);
  const logQuery = React.useRef<{ updateHistorySearch: (v?: string) => void }>(null);

  const handleSearch = (searchParams: { start: number; end: number; queryStr?: string }) => {
    update({
      ...searchParams,
      pageNo: 1,
      tempQueryStr: searchParams.queryStr,
    });
  };

  const handleTimeChange = React.useCallback((range: { start: number; end: number }) => {
    if (!moment(range.end).isSame(moment(range.start), 'seconds')) {
      updater.timeRange(range);
    }
  }, []);

  const handleFieldSelect = (data: Obj, jumpOut?: boolean) => {
    if (jumpOut) {
      window.open(`?${mergeSearch({ query: data.queryString }, true)}`);
    } else {
      update({
        pageNo: 1,
        queryStr: data.queryString,
        tempQueryStr: data.queryString,
      });
    }
  };

  const handleDownLoad = () => {
    const query = qs.stringify({
      clusterName,
      sort: SORT_MAP[sort],
      start,
      end,
      query: queryStr,
    });
    window.open(`${setApiWithOrg(downLoadLogApi(addonId))}?${query}`);
  };

  const handleScroll = React.useCallback(
    throttle(() => {
      const scrollTop = scrollEle.current?.scrollTop ?? 0;
      // log wrapper scrollTop more than 100px, hide time chart
      updater.showTimeChart(scrollTop <= 100);
    }, 300),
    [],
  );

  React.useEffect(() => {
    scrollEle.current?.addEventListener('scroll', handleScroll);
    return () => {
      scrollEle.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useUpdateEffect(() => {
    if (start < end) {
      getLogAnalytics({
        start,
        end,
        sort: SORT_MAP[sort],
        pageNo,
        pageSize,
        query: queryStr,
        highlight: !!queryStr,
        clusterName,
      });
      logQuery.current?.updateHistorySearch(queryStr);
      updateSearch({ query: queryStr, sort });
    }
  }, [sort, start, end, queryStr, pageSize, pageNo, clusterName]);
  return (
    <div className="h-full flex flex-col">
      <LogQuery
        ref={logQuery}
        queryString={tempQueryStr}
        onQueryStringChange={updater.tempQueryStr}
        timeRange={timeRange}
        onSearch={handleSearch}
      />
      <TimeChart
        query={queryStr}
        visible={showTimeChart}
        addonId={addonId}
        start={start}
        end={end}
        clusterName={clusterName}
        onTimeChange={handleTimeChange}
      />
      <div className="tool-bar flex h-12 items-center">
        <div
          className={`font-semibold flex justify-start items-center transition-width whitespace-nowrap overflow-ellipsis ${
            leftExpand ? 'w-52' : 'w-5'
          }`}
        >
          {leftExpand ? (
            <>
              <IconDoubleLeft
                className="cursor-pointer"
                theme="outline"
                size="14"
                fill="currentColor"
                onClick={() => {
                  updater.leftExpand(false);
                }}
              />
              {i18n.t('msp:data distribution')}
            </>
          ) : (
            <IconDoubleRight
              className="cursor-pointer"
              theme="outline"
              size="14"
              fill="#333"
              onClick={() => {
                updater.leftExpand(true);
              }}
            />
          )}
        </div>
        <div className="flex-1">
          <ToolBar
            addonId={addonId}
            total={logTotal}
            defaultSort={queries.sort}
            pageNo={pageNo}
            pageSize={pageSize}
            onPageChange={(current, size) => {
              update({ pageNo: current, pageSize: size });
            }}
            onDownLoad={handleDownLoad}
            onSort={(key) => {
              update({
                sort: key,
                pageNo: 1,
              });
            }}
          />
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className={`transition-width overflow-y-auto ${leftExpand ? 'w-52' : 'w-0 overflow-hidden'}`}>
          <FieldMenu
            queryString={queryStr}
            onFieldSelect={handleFieldSelect}
            start={start}
            end={end}
            clusterName={clusterName}
          />
        </div>
        <div ref={scrollEle} className="overflow-auto flex-1 rounded border border-solid border-normal bg-lotion">
          <div className="w-full min-h-full">
            <Spin spinning={isFetchLog}>
              <LogRender
                data={logList}
                fields={fields}
                queryString={queryStr}
                onFieldSelect={handleFieldSelect}
                showTags={showTags}
              />
            </Spin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogAnalysis;
