import * as React from 'react';
import i18n from 'i18n';
import { Button, Form as NForm } from 'core/nusi';
import { getLabel, noop } from 'app/configForm/nusi-form/form-items/common';

const FormItem = NForm.Item;

export default ({ loading }: any) =>
  React.memo(({ fieldConfig }: any) => {
    const { visible, valid, componentProps, required, wrapperProps, label, labelTip } = fieldConfig;
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
        <Button loading={loading} type="primary" ghost onClick={() => (componentProps.onChange || noop)()}>
          {i18n.t('analyze')}
        </Button>
      </FormItem>
    );
  });
