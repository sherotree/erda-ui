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

import { LOGIC_OPERATOR } from 'msp/pages/log-analysis/components/constants';

const blank = ' ';
const blankColon = ': ';
// log separator
export const logTokenStr = ', \'";=()+[]{}?@&<>/:\n\t\r';
// log split rules
export const logTokenReg = /([, '";=()+[\]{}?@&<>/:\n\t\r])/gi;
// export const logTokenReg = /([, '";=()[\]{}?@&<>/:\n\t\r]|-(?=\d+))/gi;
export const logToken = logTokenStr.split('').reduce(
  (acc, token) => ({
    ...acc,
    [token]: true,
  }),
  {},
);

// escape special characters
const escape = (str: string) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

const mergeQuery = ({
  quickMap,
  connectSymbol,
  originString,
  keyName,
  valueStr,
}: {
  quickMap: Obj;
  connectSymbol: LOGIC_OPERATOR;
  originString: string;
  keyName: string;
  valueStr: string;
}) => {
  try {
    const tagName = escape(keyName);
    const tagReg = new RegExp(''.concat(tagName, '\\s*:'));
    if (quickMap[keyName] && tagReg.test(originString)) {
      const value = escape(quickMap[keyName]);
      const valueReg = new RegExp(''.concat(tagName, '\\s*:\\s*').concat(value));
      return originString.replace(valueReg, ''.concat(keyName, blankColon).concat(valueStr));
    }
  } catch (_) {
    return ''.concat(originString, blank).concat(connectSymbol, blank).concat(keyName, blankColon).concat(valueStr);
  }
  return ''.concat(originString, blank).concat(connectSymbol, blank).concat(keyName, blankColon).concat(valueStr);
};

export const mergeTagToString = (
  connectSymbol: LOGIC_OPERATOR,
  tag: string,
  value: string,
  originString: string,
  tagMap = {},
): { queryString: string; tagMap: Obj } => {
  let valueStr = value.replace(/"/g, '\\"');
  if (value && /[\s,'";=()[\]{}?@&<>/:.#|]/g.test(value)) {
    valueStr = value.replace(/"/g, '\\"');
  }
  valueStr = '"'.concat(valueStr, '"');
  const queryString =
    originString.trim() === ''
      ? ''.concat(tag, blankColon).concat(valueStr)
      : mergeQuery({
          quickMap: tagMap,
          originString,
          connectSymbol,
          keyName: tag,
          valueStr,
        });
  return {
    queryString,
    tagMap: {
      ...tagMap,
      [tag]: valueStr,
    },
  };
};

export const transformQueryToTagMap = (query?: string) => {
  const queries = query?.split(/AND|OR|NOT/) ?? [];
  return queries.reduce((previousValue, currentValue) => {
    const [k, value] = currentValue.split(':');
    const key = k?.trim();
    let temp = {};
    if (key?.startsWith('tags')) {
      temp = { [key]: value?.trim() };
    }
    return {
      ...previousValue,
      ...temp,
    };
  }, {});
};
