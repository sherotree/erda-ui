import React from 'react';
import { map } from 'lodash';
import { ReduceOne as IconReduceOne } from '@icon-park/react';
import { Select } from 'core/nusi';

const { Option } = Select;

export const TriggerConditionSelect = ({
  keyOptions,
  id,
  current,
  handleEditTriggerConditions,
  handleRemoveTriggerConditions,
  operatorOptions,
  valueOptions,
  updater,
  valueOptionsList,
}) => {
  return (
    <div className="flex items-center mb-4">
      <Select
        className="mr-8"
        value={current?.condition}
        onSelect={(value) => {
          handleEditTriggerConditions(id, { key: 'condition', value });
          const currentOptions = valueOptionsList
            .find((item: { key: any }) => item.key === value)
            .options.map((item: any) => ({ key: item, display: item }));

          updater.triggerConditionValueOptions(currentOptions);
          handleEditTriggerConditions(id, { key: 'value', value: currentOptions[0]?.key });
        }}
      >
        {map(keyOptions, (item) => {
          return (
            <Option key={item?.key} value={item?.key}>
              {item?.displayName}
            </Option>
          );
        })}
      </Select>
      <Select
        className="mr-8"
        value={current?.operator}
        onSelect={(value) => handleEditTriggerConditions(id, { key: 'operator', value })}
      >
        {map(operatorOptions, (item) => {
          return (
            <Option key={item.key} value={item.key}>
              {item.display}
            </Option>
          );
        })}
      </Select>
      <Select
        placeholder="请选择对应值"
        value={current?.value}
        onSelect={(value) => handleEditTriggerConditions(id, { key: 'value', value })}
      >
        {map(valueOptions, (item) => {
          return (
            <Option key={item?.key} value={item?.key}>
              {item?.display}
            </Option>
          );
        })}
      </Select>
      <IconReduceOne className="cursor-pointer ml-8" size="16" onClick={() => handleRemoveTriggerConditions(id)} />
    </div>
  );
};
