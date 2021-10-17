// Copyright (c) 2021 Terminus, Inc.
//
// This program is free software: you can use, redistribute, and/or modify
// it under the terms of the GNU Affero General Public License, version 3
// or later ("AGPL"), as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import { Tag, Dropdown, Select, Button, Input, Menu, Switch } from 'core/nusi';
import { CloseSmall as IconCloseSmall, SettingTwo as IconSettingTwo } from '@icon-park/react';
import i18n from 'i18n';
import { produce } from 'immer';
import { map, forEach } from 'lodash';
import './log-context.scss';

const { Group: ButtonGroup } = Button;
const { Option } = Select;

const Item: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return (
    <div {...rest} className="flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

export const LogContextHeader = ({
  zeroLog,
  source,
  handleBefore,
  handleAfter,
  handleQuery,
  scrollToActive,
  contextFields,
  setContextFields,
  filters,
  setFilters,
}) => {
  const defaultLogTags = ['application_name', 'service_name', 'pod_name'];
  const [selectedTags, setSelectedTags] = React.useState(defaultLogTags);
  const [filterValue, setFilterValue] = React.useState('');
  const displayTags = [] as Array<{ tagKey: string; tagName: string }>;
  const queryArr = [] as string[];
  const tagOptions = map(source.tags, (value, key) => {
    return (
      <Option value={key} key={key}>
        {key}
      </Option>
    );
  });
  const [visible, setVisible] = React.useState(false);
  const handleDisplayChange = (checked: boolean, record: LOG_ANALYTICS.IField) => {
    const newField = produce(contextFields, (draft) => {
      if (draft) {
        const target = draft.find((t) => t.fieldName === record.fieldName);
        target.display = checked;
      }
    });
    setContextFields(newField);
  };

  forEach(selectedTags, (item) => {
    if (item in zeroLog.source.tags) {
      displayTags.push({ tagKey: `${item}`, tagName: zeroLog.source.tags[item] });
      queryArr.push(`tags.${item}: "${zeroLog.source.tags[item]}"`);
    }
  });

  React.useEffect(() => {
    handleQuery(queryArr.join(' AND '));
  }, [selectedTags]);

  // 删除 tag
  function handleCloseTag(removedTag) {
    const foo = selectedTags.filter((item) => item !== removedTag);
    setSelectedTags(foo);
  }

  const menu = React.useMemo(() => {
    return (
      <Menu>
        <Menu.Item className="cursor-default">
          <Item>
            <div className="font-semibold">{i18n.t('msp:display setting')}</div>
            <span className="hover:text-primary">
              <IconCloseSmall
                className="cursor-pointer"
                theme="filled"
                size="24"
                fill="currentColor"
                onClick={() => {
                  setVisible(false);
                }}
              />
            </span>
          </Item>
        </Menu.Item>
        <Menu.Item className="cursor-default">
          <Item>
            <div className="text-darkgray">{i18n.t('field')}</div>
            <div className="text-darkgray">{i18n.t('msp:show')}</div>
          </Item>
        </Menu.Item>
        <Menu.Divider />
        <div className="max-h-48 overflow-y-auto">
          {contextFields?.map((item) => {
            return (
              <>
                <Menu.Item className="cursor-default ant-dropdown-menu-item ant-dropdown-menu-item-only-child">
                  <Item>
                    <div>{item.fieldName}</div>
                    <Switch
                      size="small"
                      checked={item.display}
                      onChange={(checked) => {
                        handleDisplayChange(checked, item);
                      }}
                    />
                  </Item>
                </Menu.Item>
                <Menu.Divider className="ant-dropdown-menu-item-divider" />
              </>
            );
          })}
        </div>
      </Menu>
    );
  }, [contextFields]);

  return (
    <>
      <div className="flex">
        <div>
          {displayTags.map((item) => (
            <Tag
              closable
              className="mr-4 text-xs"
              onClose={() => {
                handleCloseTag(item.tagKey);
              }}
              color="#999999"
              key={item.tagKey}
            >
              <span className="mr-2">{item.tagKey}:</span>
              <span>{item.tagName}</span>
            </Tag>
          ))}
        </div>
        <Select
          value={selectedTags}
          defaultValue={defaultLogTags}
          mode="multiple"
          showSearch
          allowClear
          style={{ width: 400 }}
          placeholder="选择标签"
          onChange={(value) => {
            setSelectedTags(value);
          }}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {tagOptions}
        </Select>
        <Dropdown
          visible={visible}
          onVisibleChange={setVisible}
          overlayClassName="w-64"
          trigger={['click']}
          overlay={menu}
        >
          <Button
            size="small"
            className="flex items-center cursor-pointer ml-2"
            onClick={() => {
              setVisible(true);
            }}
          >
            <IconSettingTwo theme="outline" size="14" fill="currentColor" />
            {i18n.t('setting')}
          </Button>
        </Dropdown>
      </div>
      <div className="flex">
        <ButtonGroup className="download-btn-group mb-4">
          <Button size="small" onClick={handleBefore}>
            更早
          </Button>
          <Button size="small" onClick={scrollToActive}>
            当前日志
          </Button>
          <Button size="small" onClick={handleAfter}>
            更新
          </Button>
        </ButtonGroup>
        <div>
          <span>过滤条件:</span>
          <Input
            className="w-16"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            onPressEnter={(e) => {
              const trimValue = e.target.value.trim();
              if (trimValue !== '') {
                setFilters([...filters, e.target.value]);
                setFilterValue('');
              }
            }}
          />
          {map(filters, (item) => (
            <Tag
              onClick={() => {
                setFilters([...filters.filter((x) => x !== item)]);
              }}
            >
              {item}
            </Tag>
          ))}
        </div>
      </div>
    </>
  );
};
