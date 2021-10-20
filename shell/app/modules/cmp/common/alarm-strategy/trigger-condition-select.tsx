import React from 'react';
import { map } from 'lodash';
import { mockTriggerConditionKeys, mockTriggerConditionOperators, mockTriggerConditionValues } from './mock';
import { AddOne as IconAddOne, ReduceOne as IconReduceOne } from '@icon-park/react';
import { Button, Select } from 'core/nusi';

const { Option } = Select;

export const TriggerConditionSelect = ({
  id,
  current,
  handleEditTriggerConditions,
  handleRemoveTriggerConditions,
  triggerOperators,
  triggerConditionKeys,
  triggerConditionValues,
  handleAddTriggerConditions,
  isLast,
  updater,
}) => {
  return (
    <div className="flex items-center">
      <Select
        className="mr-8"
        value={current?.triggerConditionKey}
        onSelect={(value) => {
          handleEditTriggerConditions(id, { key: 'triggerConditionKey', value });

          updater.triggerConditionValues(mockTriggerConditionValues); // TODO:这里的 mockTriggerConditionValues 改成从接口返回的列表
          handleEditTriggerConditions(id, { key: 'triggerConditionValue', value: mockTriggerConditionValues[0]?.key });
        }}
      >
        {map(triggerConditionKeys, (item) => {
          return (
            <Option key={item?.key} value={item?.key}>
              {item?.display}
            </Option>
          );
        })}
      </Select>
      <Select
        className="mr-8"
        value={current?.triggerConditionOperator}
        onSelect={(value) => handleEditTriggerConditions(id, { key: 'triggerConditionOperator', value })}
      >
        {map(triggerOperators, (item) => {
          return (
            <Option key={item?.key} value={item?.key}>
              {item?.display}
            </Option>
          );
        })}
      </Select>
      <Select
        value={current?.triggerConditionValue}
        onSelect={(value) => handleEditTriggerConditions(id, { key: 'triggerConditionValue', value })}
      >
        {map(triggerConditionValues, (item) => {
          return (
            <Option key={item?.key} value={item?.key}>
              {item?.display}
            </Option>
          );
        })}
      </Select>
      <IconReduceOne className="cursor-pointer" size="16" onClick={() => handleRemoveTriggerConditions(id)} />
      {isLast && <IconAddOne className="cursor-pointer" size="16" onClick={() => handleAddTriggerConditions()} />}
    </div>
  );
};
