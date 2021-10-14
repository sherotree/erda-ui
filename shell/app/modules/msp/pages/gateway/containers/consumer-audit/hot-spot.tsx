import * as React from 'react';
import { Table, Tooltip } from 'core/nusi';
import { get } from 'lodash';
import { Copy } from 'common';
import i18n from 'i18n';

export const HotSpotPanel = ({ data }: { data: object }) => {
  const list = get(data, 'results');
  const columns = [
    {
      title: 'API',
      dataIndex: 'name',
      key: 'name',
      render: (value: string) => (
        <Tooltip title={value}>
          <Copy copyText={value}>{value}</Copy>
        </Tooltip>
      ),
    },
    {
      title: i18n.t('msp:successful call amount'),
      dataIndex: 'data',
    },
  ];

  return <Table columns={columns} dataSource={list} scroll={{ x: '100%' }} />;
};
