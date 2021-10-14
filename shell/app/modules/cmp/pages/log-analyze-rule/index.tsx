import * as React from 'react';
import { Table, Popconfirm, Switch, Button } from 'core/nusi';
import i18n from 'i18n';
import moment from 'moment';
import { useMount } from 'react-use';
import { goTo } from 'common/utils';
import { useLoading } from 'core/stores/loading';
import LogAnalyzeStore from '../../stores/log-analyze';

const RULE_TYPE_MAP = {
  regexp: i18n.t('regexp'),
};

export default () => {
  const [rules] = LogAnalyzeStore.useStore((s) => [s.rules]);
  const { getRules, toggleRule, deleteRule } = LogAnalyzeStore;
  const [loading] = useLoading(LogAnalyzeStore, ['toggleRule']);
  useMount(() => {
    getRules();
  });

  const columns = [
    {
      title: i18n.t('name'),
      dataIndex: 'name',
    },
    {
      title: i18n.t('org:rule type'),
      dataIndex: 'types',
      render: (type: string) => RULE_TYPE_MAP[type],
    },
    {
      title: i18n.t('update time'),
      dataIndex: 'update_time',
      render: (timestamp: number) => moment(timestamp).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      width: 230,
      title: i18n.t('operation'),
      dataIndex: 'id',
      render: (_, record: LOG_ANALYZE.RuleListItem) => (
        <div className="table-operations">
          <a
            className="table-operations-btn"
            onClick={() => {
              goTo(`./${record.id}`);
            }}
          >
            {i18n.t('edit')}
          </a>
          <Popconfirm title={`${i18n.t('common:confirm deletion')}?`} onConfirm={() => deleteRule(record.id)}>
            <span className="table-operations-btn">{i18n.t('delete')}</span>
          </Popconfirm>
          <Switch
            size="small"
            defaultChecked={record.enable}
            loading={loading}
            onChange={(checked) => toggleRule({ id: record.id, enable: checked })}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="log-analyze-rule">
      <div className="top-button-group">
        <Button type="primary" onClick={() => goTo('./add')}>
          {i18n.t('org:create analysis rule')}
        </Button>
      </div>
      <Table rowKey="id" dataSource={rules} columns={columns} scroll={{ x: '100%' }} />
    </div>
  );
};
