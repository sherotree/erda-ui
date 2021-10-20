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
  triggerConditions,
  alertTriggerConditionsContent,
}) => {
  console.log({ triggerConditions, triggerConditionValues, current });
  return triggerConditions.length === 0 ? (
    <div>
      <IconAddOne className="cursor-pointer" size="24" onClick={() => handleAddTriggerConditions()} />
    </div>
  ) : (
    <div className="flex items-center">
      <Select
        className="mr-8"
        value={current?.triggerConditionKey}
        onSelect={(value) => {
          handleEditTriggerConditions(id, { key: 'triggerConditionKey', value });
          updater.triggerConditionValues(
            alertTriggerConditionsContent
              .find((item) => item.key === value)
              .options.map((item) => ({ key: item, display: item })),
          ); // TODO:这里的 mockTriggerConditionValues 改成从接口返回的列表
          handleEditTriggerConditions(id, { key: 'triggerConditionValue', value: mockTriggerConditionValues[0]?.key });
        }}
      >
        {map(triggerConditionKeys, (item) => {
          return (
            <Option key={item?.key} value={item?.key}>
              {item?.displayName}
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
            <Option key={item.key} value={item.key}>
              {item.display}
            </Option>
          );
        })}
      </Select>
      <Select
        placeholder="请选择对应值"
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
