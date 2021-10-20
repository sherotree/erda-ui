import React from 'react';
import { map, find } from 'lodash';
import { ReduceOne as IconReduceOne } from '@icon-park/react';
import i18n from 'i18n';
import { Select, Divider } from 'core/nusi';
import { WithAuth } from 'user/common';

const { Option } = Select;

export const NotifyStrategySelect = ({
  id,
  current,
  handleEditNotifyStrategy,
  valueOptions,
  updater,
  form,
  addNotificationGroupAuth,
  goToFoo,
  notifyGroups,
  alertLevelOptions,
  notifyChannelMap,
  handleRemoveNotifyStrategy,
}) => {
  return (
    <div className="flex items-center mb-4">
      <Select
        className="mr-8"
        value={current?.condition}
        onSelect={(groupId: any) => {
          form.setFieldsValue({ groupType: [], groupId: id });
          updater.activedGroupId(groupId);
          handleEditNotifyStrategy(id, { key: 'condition', value: groupId });
          const activedGroup = find(notifyGroups, ({ id: id2 }) => id2 === groupId);
          const fooOptions =
            (activedGroup && notifyChannelMap[activedGroup.targets[0].type]).map((x) => ({
              key: x.value,
              display: x.name,
            })) || [];

          updater.fooOptions(fooOptions);
          handleEditNotifyStrategy(id, { key: 'value', value: fooOptions?.[0]?.key });
        }}
        dropdownRender={(menu) => (
          <div>
            {menu}
            <Divider className="my-1" />
            <div className="text-xs px-2 py-1 text-desc" onMouseDown={(e) => e.preventDefault()}>
              <WithAuth pass={addNotificationGroupAuth}>
                <span className="hover-active" onClick={goToFoo}>
                  {i18n.t('org:add more notification groups')}
                </span>
              </WithAuth>
            </div>
          </div>
        )}
      >
        {map(notifyGroups, ({ id: id1, name }) => (
          <Option key={id1} value={id1}>
            {name}
          </Option>
        ))}
      </Select>

      <Select
        className="mr-8"
        value={current?.operator}
        onSelect={(value) => handleEditNotifyStrategy(id, { key: 'operator', value })}
      >
        {map(alertLevelOptions, (item) => {
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
        onSelect={(value) => handleEditNotifyStrategy(id, { key: 'value', value })}
      >
        {map(valueOptions, (item) => {
          return (
            <Option key={item?.key} value={item?.key}>
              {item?.display}
            </Option>
          );
        })}
      </Select>
      <IconReduceOne className="cursor-pointer ml-8" size="16" onClick={() => handleRemoveNotifyStrategy(id)} />
    </div>
  );
};
