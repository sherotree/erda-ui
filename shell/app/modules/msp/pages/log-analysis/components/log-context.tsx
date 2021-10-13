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

import { Popover, Tag } from 'core/nusi';
import { find, map } from 'lodash';

const LogContext = ({ id, data }: { id: string; data: any }) => {
  const zeroLog = data.find((item) => item.source._id === id);
  const [displayLogTags, setDisplayLogTags] = React.useState([] as any);
  const defaultLogTags = ['application_name', 'service_name', 'pod_name'];
  const foo = [] as any;

  React.useEffect(() => {
    map(defaultLogTags, (item) => {
      if (item in zeroLog.source.tags) {
        foo.push({ tagKey: `tags.${item}`, tagName: zeroLog.source.tags[item] });
      }
    });
    setDisplayLogTags(foo);
  }, []);
  // TODO: 标签 XX 参考 邮箱、站内信，暂时定 选一个触发一次接口
  console.log({ zeroLog, displayLogTags, foo });

  // 删除 tag
  // handleCloseTag = removedTag => {
  //   const tags = this.state.tags.filter(tag => tag !== removedTag);
  //   console.log(tags);
  //   this.setState({ tags });
  // };

  return (
    <>
      <div>
        {displayLogTags.map((item) => (
          <Tag closable className="mr-4 text-xs" onClose={() => handleCloseTag()} color="#999999" key={item.tagKey}>
            <span className="mr-2">{item.tagKey}:</span>
            <span>{item.tagName}</span>
          </Tag>
        ))}
      </div>
    </>
  );
};

export default LogContext;
