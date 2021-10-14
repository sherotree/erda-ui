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
import { PureBoardGrid } from 'common';
import { forEach, get, isEmpty, mapKeys } from 'lodash';
import { getStatistic } from 'msp/services/log-analytics';
import './time-chart.scss';

interface IProps {
  query?: string;
  start: number;
  end: number;
  clusterName: string;
  addonId: string;
  visible: boolean;
  onTimeChange: (data: { start: number; end: number }) => void;
}

const convertLogCount = (staticData: LOG_ANALYZE.LogStatistics | null) => {
  if (isEmpty(staticData)) return {};

  const { time = [], results = [] } = staticData || {};
  const data = get(results, '[0].data') || [];
  const yAxis = [];
  const metricData = [] as object[];
  forEach(data, (item) => {
    mapKeys(item, (v) => {
      const { chartType, ...rest } = v;
      yAxis[v.axisIndex] = 1;
      metricData.push({
        ...rest,
        name: v.tag || v.name,
        type: chartType,
      });
    });
  });
  const yAxisLength = yAxis.length;
  return { time, metricData, yAxisLength, xAxisIsTime: true };
};

const TimeChart = (props: IProps) => {
  const { visible = true, addonId, clusterName, start, end, query } = props;
  const [logStatistics, setLogStatistics] = React.useState({});
  React.useEffect(() => {
    if (start && end) {
      getStatistic({
        clusterName,
        start,
        end,
        addon: addonId,
        query,
      }).then((res) => {
        setLogStatistics(res.data);
      });
    }
  }, [clusterName, start, end, addonId, query]);

  const layout = React.useMemo(
    () => [
      {
        w: 24,
        h: 4,
        x: 0,
        y: 0,
        i: 'log-count',
        moved: false,
        static: false,
        view: {
          chartType: 'chart:bar',
          hideHeader: true,
          staticData: convertLogCount(logStatistics),
          config: {
            optionProps: {
              isMoreThanOneDay: true,
              useBrush: true,
            },
            option: {
              brush: {
                toolbox: [''],
                throttleType: 'debounce',
                throttleDelay: 300,
                xAxisIndex: 0,
              },
              legend: {
                show: false,
              },
              grid: {
                x: 20,
                y: 20,
                x2: 20,
                y2: 20,
                top: 15,
                bottom: 15,
                left: 20,
                right: 20,
                height: 100,
              },
            },
          },
        },
      },
    ],
    [logStatistics],
  );

  return (
    <div className={`log-time-chart flex-shrink-0 transition-height overflow-hidden ${visible ? 'mb-2 h-32' : 'h-0'}`}>
      <div className="h-full rounded">
        <PureBoardGrid layout={layout} onBoardEvent={props.onTimeChange} />
      </div>
    </div>
  );
};

export default TimeChart;
