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
import mspLogAnalyticsStore from 'msp/stores/log-analytics';
import { Popover, Tag, Dropdown, Select, Button, Input, Menu, Switch } from 'core/nusi';
import {
  CloseSmall as IconCloseSmall,
  SettingTwo as IconSettingTwo,
  Down as IconDown,
  Right as IconRight,
} from '@icon-park/react';
import i18n from 'i18n';
import { LOGIC_OPERATOR } from 'msp/pages/log-analysis/components/constants';
import { formatTime } from 'common/utils';
import { produce } from 'immer';
import mspStore from 'msp/stores/micro-service';
import { last, map, throttle, forEach, filter } from 'lodash';
import './log-context.scss';

const { Group: ButtonGroup } = Button;
const { Option } = Select;

const INITIAL = 'INITIAL';
const BEFORE = 'BEFORE';
const AFTER = 'AFTER';

const Item: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return (
    <div {...rest} className="flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
const LogContextHeader = ({
  zeroLog,
  source,
  handleBefore,
  handleAfter,
  handleQuery,
  scrollToActive,
  contextFields,
  setContextFields,
}) => {
  const defaultLogTags = ['application_name', 'service_name', 'pod_name'];
  const [selectedTags, setSelectedTags] = React.useState(defaultLogTags);
  const [filters, setFilters] = React.useState([] as string[]);
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

  console.log({ filters });
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
          <Input className="w-16" onPressEnter={(e) => setFilters([...filters, e.target.value])} />
        </div>
      </div>
    </>
  );
};

const LogContext = ({ source, data, fields }: { source: any; data: any }) => {
  const zeroLog = data.find((item) => item.source._id === source._id);
  const clusterName = mspStore.useStore((s) => s.clusterName);
  const ref = React.useRef();
  const activeRef = React.useRef();
  const [query, setQuery] = React.useState('');
  const [logData, setLogData] = React.useState([]) as any[];
  const { getLogAnalyticContext } = mspLogAnalyticsStore.effects;
  const [current, setCurrent] = React.useState(source);
  const [usedIds, setUsedIds] = React.useState(new Set());
  const [operate, setOperate] = React.useState(INITIAL); // 'INITIAL', 'BEFORE', 'AFTER'
  const [contextFields, setContextFields] = React.useState(fields);
  const showTags = contextFields.filter((item) => item.display).map((item) => item.fieldName);
  const [sort, setSort] = React.useState('asc');

  const activeIndex = logData.findIndex((x) => x?.source?._id === source._id);

  function onScroll() {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;

    // 滚动到top的时候
    if (scrollTop < 10) {
      handleBefore();
    }

    // 滚动到底部的时候
    if (scrollHeight - scrollTop - clientHeight < 10) {
      handleAfter();
    }
  }

  const LogContextContent = ({ content }) => {
    const [isExpand, setIsExpand] = React.useState(false);
    const isFoldContent = String(content).length > 1000;
    const value = isFoldContent && !isExpand ? `${String(content).slice(0, 1000)} ...` : content;
    return (
      <span>
        {isFoldContent && (
          <span className="absolute -left-5">
            {isExpand ? (
              <>
                <IconDown
                  className="cursor-pointer"
                  theme="outline"
                  size="14"
                  fill="currentColor"
                  onClick={() => {
                    setIsExpand(false);
                  }}
                />
              </>
            ) : (
              <IconRight
                className="cursor-pointer"
                theme="outline"
                size="14"
                fill="#333"
                onClick={() => {
                  setIsExpand(true);
                }}
              />
            )}
          </span>
        )}
        {value}
      </span>
    );
  };

  const LogContextRecord = ({ item, isActive, order, showTags }) => {
    const { tags, ...rest } = item;
    return (
      <div className="flex" ref={isActive ? activeRef : null} style={{ background: isActive ? 'green' : 'white' }}>
        <div className="mr-4">{order}</div>
        <div className="font-semibold text-xs leading-5">{formatTime(rest.timestamp, 'MM-DD HH:mm:ss')}</div>
        <div>
          <div className="flex flex-wrap flex-1">
            {map(tags ?? {}, (tagName, tagKey) => {
              const fieldName = `tags.${tagKey}`;
              if (!showTags.includes(fieldName)) {
                return null;
              }
              return (
                <Popover
                  content={
                    <div>
                      <span className="bg-cultured leading-5 font-medium">{fieldName}</span>:{' '}
                      <span className="leading-5">{tagName}</span>
                    </div>
                  }
                >
                  <Tag className="mr-0 text-xs" color="#999999">
                    {tagName}
                  </Tag>
                </Popover>
              );
            })}
          </div>
          {map(rest, (value, tag) => {
            if (!showTags.includes(tag)) {
              return null;
            }

            return (
              <p className="text-xs leading-5 relative">
                <span className="bg-cultured leading-5 font-medium">{tag}</span>:{' '}
                <span className="leading-5">
                  <LogContextContent tag={tag} content={value} />
                </span>
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const throttleScroll = throttle(onScroll, 100);
  React.useEffect(() => {
    getLogAnalyticContext({
      timestampNanos: current.timestampNanos,
      id: current.id,
      offset: current.offset,
      sort,
      query,
      clusterName,
      count: 20,
    }).then((res) => {
      const content = res || [];
      if (usedIds.has(`${current._id}_${sort}`)) {
        return;
      }

      if (operate === INITIAL) {
        setLogData([{ source }, ...content]);
      }
      if (operate === BEFORE) {
        setLogData((pre: any) => [...content, ...pre]);
        setSort('desc');
      }
      if (operate === AFTER) {
        setLogData((pre: any) => [...pre, ...content]);
        setSort('asc');
      }

      usedIds.add(`${current._id}_${sort}`);
      setUsedIds(usedIds);
    });
  }, [current, sort, query]);

  // TODO: 标签 XX 参考 邮箱、站内信，暂时定 选一个触发一次接口

  function handleBefore() {
    setOperate(BEFORE);
    setCurrent(logData?.[0]?.source);
    setSort('desc');
  }

  function handleAfter() {
    setOperate(AFTER);
    const lastItem = last(logData) as any;
    setCurrent(lastItem?.source);
    setSort('asc');
  }

  function scrollToActive() {
    activeRef.current.scrollIntoView();
  }

  return (
    <>
      <LogContextHeader
        zeroLog={zeroLog}
        source={source}
        handleBefore={handleBefore}
        handleAfter={handleAfter}
        handleQuery={setQuery}
        scrollToActive={scrollToActive}
        contextFields={contextFields}
        setContextFields={setContextFields}
      />
      <div className="log-context-wrapper" ref={ref} onScroll={throttleScroll}>
        {map(logData, (item, index) => (
          <LogContextRecord
            item={item.source}
            key={item.source._id}
            isActive={activeIndex === index}
            order={index - activeIndex}
            showTags={showTags}
          />
        ))}
      </div>
    </>
  );
};

export default LogContext;
