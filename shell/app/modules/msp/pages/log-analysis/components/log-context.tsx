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
import { Popover, Tag, Dropdown, Select, Button, Input } from 'core/nusi';
import mspStore from 'msp/stores/micro-service';
import { find, map } from 'lodash';

const { Group: ButtonGroup } = Button;
const LogContextHeader = ({ displayLogTags }) => {
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
        <Select>标签</Select>
        <span>字段过滤</span>
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
    <div>
      <div>1</div>
      <div>2020-01-</div>
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
  console.log({ data, source });
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
  console.log({ logData }, 8888);
  React.useEffect(() => {
    map(defaultLogTags, (item) => {
      if (item in zeroLog.source.tags) {
        foo.push({ tagKey: `tags.${item}`, tagName: zeroLog.source.tags[item] });
      }
    });
    setDisplayLogTags(foo);
  }, []);
  // TODO: 标签 XX 参考 邮箱、站内信，暂时定 选一个触发一次接口
  // console.log({ zeroLog, displayLogTags, foo });

  // 删除 tag
  // handleCloseTag = removedTag => {
  //   const tags = this.state.tags.filter(tag => tag !== removedTag);
  //   console.log(tags);
  //   this.setState({ tags });
  // };

  return (
    <>
      <LogContextHeader displayLogTags={displayLogTags} />
      {map(logData, (item) => {
        <LogContextRecord item={item} key={item} />;
      })}
    </>
  );
};

export default LogContext;
