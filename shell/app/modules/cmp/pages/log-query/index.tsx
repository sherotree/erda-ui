import * as React from 'react';
import { Input, Table, Tabs, message, Select } from 'core/nusi';
import { isEmpty, get, forEach, mapKeys, map, reduce, pick } from 'lodash';
import i18n from 'i18n';
import classnames from 'classnames';
import moment from 'moment';
import { CustomFilter, useFilter, PureBoardGrid, Panel, TimeSelect } from 'common';
import { goTo, setLS } from 'common/utils';
import { useLoading } from 'core/stores/loading';
import LogAnalyzeStore from '../../stores/log-analyze';
import LogTagSelector from 'cmp/common/components/log-tag-selector';
import routeInfoStore from 'core/stores/route';
import mspStore from 'msp/stores/micro-service';
import { regLog } from 'common/components/log/log-util';
import { useUnmount } from 'react-use';
import { ITimeRange, transformRange } from 'common/components/time-select/common';
import './index.scss';

const defaultRange: ITimeRange = {
  mode: 'quick',
  quick: 'hours:1',
  customize: {},
};
const { date } = transformRange(defaultRange);

const parseLogContent = (content: string) => {
  let level = '';
  let showContent = content;
  if (regLog.LOGSTART.test(content)) {
    const [parent, _level, _params] = regLog.LOGSTART.exec(content) || [];
    const [serviceName] = (_params || '').split(',');
    level = _level;
    showContent = `${level} [${serviceName}] ${content.split(parent).join('')}`;
  }
  return showContent;
};

const { TabPane } = Tabs;
const sizeList = [50, 100, 200, 500, 1000];

export default () => {
  const [timeSpan, setTimeSpan] = React.useState({
    triggerTimer: 0,
    start: date[0].valueOf(),
    end: date[1].valueOf(),
  });
  const [logStatistics, logs] = LogAnalyzeStore.useStore((s) => [s.logStatistics, s.logs]);
  const { getLogStatistics, getLogs, getAddonLogStatistics, getAddonLogs } = LogAnalyzeStore;
  const [isIn, params] = routeInfoStore.useStore((s) => [s.isIn, s.params]);
  const [pageNo, setPageNo] = React.useState(1);
  const [loadingLogs, loadingAddonLogs] = useLoading(LogAnalyzeStore, ['getLogStatistics', 'getAddonLogStatistics']);
  const clusterName = mspStore.useStore((s) => s.clusterName);

  useUnmount(() => {
    LogAnalyzeStore.clearLogs();
    LogAnalyzeStore.clearLogStatistics();
  });

  const handleChange = (_, range: moment.Moment[]) => {
    setTimeSpan({
      triggerTimer: Date.now(),
      start: range[0].valueOf(),
      end: range[1].valueOf(),
    });
    onSubmit({ ...queryCondition, start: range[0].valueOf(), end: range[1].valueOf() });
  };

  const getData = (obj: any = {}) => {
    const { start, end, query, size, tags } = obj;
    const tagMap = reduce(
      tags,
      (result, tagString) => {
        const [k, v] = tagString.split('=');
        return {
          ...result,
          [`tags.${k}`]: v,
        };
      },
      {},
    );

    if (isIn('msp')) {
      const addonQuery = {
        start: start ?? timeSpan.start,
        end: end ?? timeSpan.end,
        query,
        size,
        ...tagMap,
        addonID: params.addonId,
        clusterName,
      };
      getAddonLogStatistics(addonQuery);
      getAddonLogs({ ...addonQuery, sort: ['timestamp desc', 'offset desc'] }).then(() => {
        setPageNo(1);
      });
    } else if (isIn('cmp')) {
      const addonQuery = {
        start,
        end,
        query,
        size,
        ...tagMap,
      };
      getLogStatistics(addonQuery);
      getLogs({ ...addonQuery, sort: ['timestamp desc', 'offset desc'] }).then(() => {
        setPageNo(1);
      });
    }
  };

  const { onSubmit, onReset, queryCondition } = useFilter({
    getData,
    fieldConvertor: {
      tags: (val) => {
        return val;
      },
    },
    extraQuery: {
      start: timeSpan.start,
      end: timeSpan.end,
    },
    initQuery: {
      size: sizeList[0],
    },
  });

  const handleCheckTraceDetail = (e: any, id: string) => {
    e.stopPropagation();
    if (!id) return;
    onSubmit({ ...queryCondition, tags: [`request-id=${id}`] });
  };

  const handleCreateRule = (e: any, tags: any, content: string) => {
    e.stopPropagation();
    if (tags.origin !== 'sls') {
      const targetTagMap = pick(tags, [
        'dice_project_name',
        'dice_workspace',
        'dice_application_name',
        'dice_service_name',
      ]);
      const targetTags = map(targetTagMap, (v, k) => `${k}=${v}`);
      setLS('logRuleTags', targetTags);
    } else {
      setLS('logRuleTags', []);
    }
    setLS('logRuleContent', content);
    const path = isIn('msp')
      ? goTo.resolve.ms_addLogAnalyzeRule({ ...params, source: 'log-query' })
      : isIn('cmp')
      ? goTo.resolve.addLogAnalyzeRule({ ...params, source: 'log-query' })
      : '';
    goTo(path);
  };

  const convertLogCount = (staticData: LOG_ANALYZE.LogStatistics) => {
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

  const filterConfig = React.useMemo(
    () => [
      {
        type: Input,
        name: 'query',
        customProps: {
          placeholder: i18n.t('msp:search by content'),
        },
      },
      {
        type: LogTagSelector,
        name: 'tags',
        customProps: {
          size: 'small',
          customValidValue: (val: string, beforeVals: string[]) => {
            const tagReg = /^[_a-zA-Z][a-zA-Z0-9_]*[=]{1}[\s\S]+$/;
            if (tagReg.test(val)) {
              const beforeKeys = map(beforeVals, (beforeVal) => beforeVal.split('=')[0]);
              if (beforeKeys.includes(val.split('=')[0])) {
                message.warning(i18n.t('org:the same key already existed'));
                return false;
              }
              return true;
            } else {
              message.warning(`${val} ${i18n.t('dcos:is invalid tag')}`);
              return false;
            }
          },
        },
      },
      {
        type: Select,
        name: 'size',
        customProps: {
          options: map(sizeList, (num) => (
            <Select.Option key={num} value={num}>
              {num}
            </Select.Option>
          )),
          placeholder: i18n.t('cmp:Please select the maximum number of queries'),
        },
      },
    ],
    [],
  );

  const layout = React.useMemo(
    () => [
      {
        w: 24,
        h: 7,
        x: 0,
        y: 0,
        i: 'log-count',
        moved: false,
        static: false,
        view: {
          chartType: 'chart:area',
          hideHeader: true,
          staticData: convertLogCount(logStatistics),
          config: {
            optionProps: {
              isMoreThanOneDay: true,
            },
          },
        },
      },
    ],
    [logStatistics],
  );

  const columns = [
    {
      width: 200,
      title: i18n.t('time'),
      dataIndex: 'timestamp',
      render: (timestamp: number) => moment(timestamp).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: i18n.t('content'),
      dataIndex: 'content',
      render: (item: string) => <pre className="code-block log-preview"> {parseLogContent(item)} </pre>,
    },
    {
      width: 140,
      title: i18n.t('operation'),
      key: 'uniId',
      render: ({ tags, content, source }: LOG_ANALYZE.Log) => (
        <div className="table-operations">
          <a
            onClick={(e) => handleCheckTraceDetail(e, tags['request-id'])}
            className={classnames({
              'table-operations-btn': true,
              'not-allowed': !tags['request-id'],
            })}
          >
            {i18n.t('msp:transactions')}
          </a>
          <a
            onClick={(e) => {
              if (source === 'sls') return;
              handleCreateRule(e, tags, content);
            }}
            className={classnames({
              'table-operations-btn': true,
              'not-allowed': source === 'sls',
            })}
          >
            {i18n.t('org:create analysis rule')}
          </a>
        </div>
      ),
    },
  ];

  const expandedRowRender = (record: LOG_ANALYZE.Log) => {
    return (
      <Tabs defaultActiveKey="1" size="small" className="log-query-message-tab">
        <TabPane tab="Text" key="1">
          <pre className="code-block prewrap">{record.content}</pre>
        </TabPane>
        <TabPane tab="JSON" key="2">
          <pre className="code-block">{JSON.stringify(record, null, 2)}</pre>
        </TabPane>
      </Tabs>
    );
  };

  return (
    <div className="log-query">
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-3">
          <CustomFilter onReset={onReset} onSubmit={onSubmit} config={filterConfig} isConnectQuery />
        </div>
        <TimeSelect className="h-7" defaultValue={defaultRange} onChange={handleChange} />
      </div>
      <Panel title={i18n.t('msp:number of logs')} className="block mb-4">
        <PureBoardGrid layout={layout} />
      </Panel>
      <Panel title={i18n.t('msp:log message')} className="block">
        <Table
          loading={loadingLogs || loadingAddonLogs}
          rowKey="uniId"
          dataSource={logs}
          columns={columns}
          expandedRowRender={expandedRowRender}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 20,
            current: pageNo,
            onChange: (page) => setPageNo(page),
          }}
          scroll={{ x: '100%' }}
        />
      </Panel>
    </div>
  );
};
