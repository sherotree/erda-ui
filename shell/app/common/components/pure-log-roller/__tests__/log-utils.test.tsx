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

import { regLog } from '../log-util';

describe('log-util', () => {
  it('regLog.LOGSTART should work well', () => {
    const str = '2021-06-29T11:05:45.713Z INFO - [content]';
    expect(regLog.LOGSTART.test(str)).toBeTruthy();
    const result = regLog.LOGSTART.exec(str) || [];
    const [, time, level, params] = result;
    expect(time).toBe('2021-06-29T11:05:45.713Z');
    expect(level).toBe('INFO');
    expect(params).toBe('content');
  });
});
