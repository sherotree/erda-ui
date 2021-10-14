import * as React from 'react';
import i18n from 'i18n';
import { map } from 'lodash';
import { Button, Form as NForm, Tooltip, Dropdown, Menu } from 'core/nusi';
import { getLabel, noop } from 'app/configForm/nusi-form/form-items/common';

const FormItem = NForm.Item;

export default ({ templates }: any) =>
  React.memo(({ fieldConfig }: any) => {
    const { visible, valid, componentProps, required, wrapperProps, label, labelTip } = fieldConfig;

    const menu = (
      <Menu>
        {map(templates, ({ name, desc }) => (
          <Menu.Item key={name}>
            <Tooltip title={desc} placement="right">
              <div
                key={name}
                onClick={() => {
                  (componentProps.onChange || noop)(name);
                }}
              >
                {name}
              </div>
            </Tooltip>
          </Menu.Item>
        ))}
      </Menu>
    );

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
        <Dropdown overlay={menu} trigger={['click']}>
          <Button>{i18n.t('org:select template')}</Button>
        </Dropdown>
      </FormItem>
    );
  });
