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
import { CloseSmall as IconCloseSmall, SettingTwo as IconSettingTwo } from '@icon-park/react';
import i18n from 'i18n';
import mspStore from 'msp/stores/micro-service';
import { find, map } from 'lodash';

const { Group: ButtonGroup } = Button;
const { Option } = Select;

const Item: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return (
    <div {...rest} className="flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
const LogContextHeader = ({ displayLogTags, source }) => {
  const tagOptions = map(source.tags, (value, key) => {
    console.log({ value, key }, 111);
    return <Option value={key} key={key}>{`${key}: ${value}`}</Option>;
  });
  console.log({ tagOptions });
  const [visible, setVisible] = React.useState(false);
  const handleDisplayChange = (checked: boolean, record: LOG_ANALYTICS.IField) => {
    // const newField = produce(data, (draft) => {
    //   if (draft) {
    //     const target = draft.find(t => t.fieldName === record.fieldName);
    //     target.display = checked;
    //   }
    // });
    // window.localStorage.setItem(addonId, JSON.stringify(newField));
    // updateShowTags(newField);
  };

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
        <div className="max-h-48 overflow-y-auto" data-l={[]?.length}>
          {[]?.map((item) => {
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
  }, []);
  return (
    <>
      <div className="flex">
        <div>
          {displayLogTags.map((item) => (
            <Tag closable className="mr-4 text-xs" onClose={() => handleCloseTag()} color="#999999" key={item.tagKey}>
              <span className="mr-2">{item.tagKey}:</span>
              <span>{item.tagName}</span>
            </Tag>
          ))}
        </div>
        <Select mode="multiple" allowClear style={{ width: 400 }} placeholder="选择标签" onChange={() => {}}>
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
          <Button size="small" onClick={() => '更早'}>
            更早
          </Button>
          <Button size="small" onClick={() => '当前日志'}>
            当前日志
          </Button>
          <Button size="small" onClick={() => '更新'}>
            更新
          </Button>
        </ButtonGroup>
        <div>
          <span>过滤条件:</span>
          <Input className="w-16" />
        </div>
      </div>
    </>
  );
};

const LogContextRecord = () => {
  return (
    <div className="flex">
      <div className="mr-4">1</div>
      <div className="mr-4">2021-10-10 12:30:89</div>
      <div>
        <Tag>标签</Tag>
        <div>neirong</div>
      </div>
    </div>
  );
};
const LogContext = ({ source, data }: { source: any; data: any }) => {
  const zeroLog = data.find((item) => item.source._id === source._id);
  const clusterName = mspStore.useStore((s) => s.clusterName);
  const [displayLogTags, setDisplayLogTags] = React.useState([] as any);
  const defaultLogTags = ['application_name', 'service_name', 'pod_name'];
  const [logData, setLogData] = React.useState([]);
  const { getLogAnalyticContext } = mspLogAnalyticsStore.effects;
  const foo = [] as any;

  React.useEffect(() => {
    const { timestampNanos, id, offset } = source;
    // TODO: 进来初始数据，应该0号前后是有数据的
    getLogAnalyticContext({
      timestampNanos,
      id,
      offset,
      sort: 'asc',
      query: '',
      clusterName,
      count: 20,
    }).then((content) => setLogData(content));
  }, []);

  React.useEffect(() => {
    map(defaultLogTags, (item) => {
      if (item in zeroLog.source.tags) {
        foo.push({ tagKey: `tags.${item}`, tagName: zeroLog.source.tags[item] });
      }
    });
    setDisplayLogTags(foo);
  }, []);
  // TODO: 标签 XX 参考 邮箱、站内信，暂时定 选一个触发一次接口

  // 删除 tag
  // handleCloseTag = removedTag => {
  //   const tags = this.state.tags.filter(tag => tag !== removedTag);
  //   console.log(tags);
  //   this.setState({ tags });
  // };

  return (
    <>
      <LogContextHeader displayLogTags={displayLogTags} source={source} />
      <div>
        {map(logData, (item, index) => (
          <LogContextRecord key={index} />
        ))}
      </div>
    </>
  );
};

export default LogContext;
