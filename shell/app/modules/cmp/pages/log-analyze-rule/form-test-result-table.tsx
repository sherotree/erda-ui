import * as React from 'react';
import i18n from 'i18n';
import { Table, Form as NForm } from 'core/nusi';
import { getLabel } from 'app/configForm/nusi-form/form-items/common';

const FormItem = NForm.Item;

export default () =>
  React.memo(({ fieldConfig }: any) => {
    const { visible, value, valid, required, wrapperProps, label, labelTip } = fieldConfig;
    const columns = [
      {
        title: i18n.t('key'),
        dataIndex: 'key',
      },
      {
        title: i18n.t('value'),
        dataIndex: 'value',
      },
      {
        title: i18n.t('org:alias'),
        dataIndex: 'name',
      },
    ];

    return (
      <FormItem
        colon
        label={getLabel(label, labelTip)}
        className={visible ? '' : 'hidden'}
        validateStatus={valid[0]}
        help={valid[1]}
        required={required}
        {...wrapperProps}
      >
        <Table bordered rowKey="uniId" dataSource={value} columns={columns} scroll={{ x: '100%' }} />
      </FormItem>
    );
  });
