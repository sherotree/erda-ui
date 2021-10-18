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
import {
  CloseSmall as IconCloseSmall,
  FocusOne as IconFocusOne,
  Filter as IconFilter,
  Down as IconDown,
} from '@icon-park/react';
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
  const [visible2, setVisible2] = React.useState(false);
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

  function handleCloseTag(removedTag: string) {
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

  const bar = (
    <Menu>
      <div className="max-h-48 overflow-y-auto">
        {map(
          Object.keys(source.tags).filter((x) => !selectedTags.includes(x)),
          (item) => (
            <Menu.Item
              className="p-2 cursor-pointer"
              key={item}
              onClick={() => setSelectedTags([...selectedTags, item])}
            >
              {item}
            </Menu.Item>
          ),
        )}
      </div>
    </Menu>
  );

  return (
    <>
      <div className="flex justify-between">
        <div>
          {displayTags.map((item) => (
            <Tag
              closable
              className="mr-2 mb-1 text-xs"
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

        <div className="flex">
          <Dropdown
            visible={visible2}
            onVisibleChange={setVisible2}
            overlayClassName="w-64"
            trigger={['click']}
            overlay={bar}
          >
            <Button
              size="small"
              className="flex items-center cursor-pointer ml-2"
              onClick={() => {
                setVisible2(true);
              }}
            >
              <span className="mr-1">{i18n.t('msp:label selection')}</span>
              <IconDown theme="outline" size="14" fill="currentColor" />
            </Button>
          </Dropdown>
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
              <span className="mr-1">{i18n.t('msp:field filtering')}</span>
              <IconFilter theme="outline" size="14" fill="currentColor" />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="flex mt-2 mb-4 items-center">
        <ButtonGroup>
          <Button size="small" onClick={handleBefore}>
            {i18n.t('msp:earlier')}
          </Button>
          <Button size="small" onClick={scrollToActive}>
            <IconFocusOne theme="outline" size="14" fill="currentColor" />
            {i18n.t('msp:current log')}
          </Button>
          <Button size="small" onClick={handleAfter}>
            {i18n.t('msp:later')}
          </Button>
        </ButtonGroup>
        <div className="ml-4 flex items-center">
          <span className="mr-2">{i18n.t('project:filter condition')}:</span>
          <Input
            className="w-40 mr-4"
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
              closable
              className="mb-1 mr-2 text-xs"
              color="#999999"
              key={item}
              onClose={() => {
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
