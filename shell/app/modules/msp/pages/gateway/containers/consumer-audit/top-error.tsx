import * as React from 'react';
import { Table, Tooltip } from 'core/nusi';
import { get } from 'lodash';
import { Copy } from 'common';
import i18n from 'i18n';

export const TopErrorPanel = ({ data }: { data: object }) => {
  const list = get(data, 'results');
  const columns = [
    {
      title: i18n.t('msp:api path'),
      dataIndex: 'name',
      key: 'name',
      render: (value: string) => (
        <Tooltip title={value}>
          <Copy copyText={value}>{value}</Copy>
        </Tooltip>
      ),
    },
    {
      title: i18n.t('msp:total number of errors'),
      dataIndex: 'data',
    },
  ];

  return <Table columns={columns} dataSource={list} scroll={{ x: '100%' }} />;
};
