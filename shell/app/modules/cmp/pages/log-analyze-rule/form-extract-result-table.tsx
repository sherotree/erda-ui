import * as React from 'react';
import i18n from 'i18n';
import { map } from 'lodash';
import { Table, Form as NForm, Input, Select } from 'core/nusi';
import { getLabel, noop } from 'app/configForm/nusi-form/form-items/common';

const FormItem = NForm.Item;

const TYPES = ['string', 'number'];

export default () =>
  React.memo(({ fieldConfig }: any) => {
    const { value, visible, valid, componentProps, required, wrapperProps, label, labelTip } = fieldConfig;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: i18n.t('key'),
        dataIndex: 'key',
        render: (val: string, { uniId }: any) => (
          <Input
            defaultValue={val}
            maxLength={50}
            onBlur={(e: any) => (componentProps.onChange || noop)(value, uniId, { key: 'key', value: e.target.value })}
          />
        ),
      },
      {
        title: i18n.t('type'),
        dataIndex: 'type',
        render: (val: string, { uniId }: any) => (
          <Select
            defaultValue={val}
            onSelect={(v: any) => (componentProps.onChange || noop)(value, uniId, { key: 'type', value: v })}
          >
            {map(TYPES, (type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        ),
      },
      {
        title: i18n.t('org:alias'),
        dataIndex: 'name',
        render: (val: string, { uniId }: any) => (
          <Input
            defaultValue={val}
            maxLength={50}
            onBlur={(e: any) => (componentProps.onChange || noop)(value, uniId, { key: 'name', value: e.target.value })}
          />
        ),
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
