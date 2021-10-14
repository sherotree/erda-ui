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
import { Button, Input, Popover } from 'core/nusi';
import { uniq } from 'lodash';
import i18n from 'i18n';
import { Attention as IconAttention, History as IconHistory } from '@icon-park/react';
import { TimeSelect, useUpdate } from 'common';
import { ITimeRange, transformRange } from 'common/components/time-select/common';
import moment from 'moment';
import { useLocalStorage, useMount } from 'react-use';
import { produce } from 'immer';
import { qs, updateSearch } from 'common/utils';

interface IProps {
  queryString?: string;
  onQueryStringChange: (str: string) => void;
  onSearch: (data: { start: number; end: number; queryStr?: string }) => void;
  timeRange: {
    start?: number;
    end?: number;
  };
}

interface IState {
  triggerTime: number;
  date: ITimeRange;
}

const query = qs.parse(location.search);
let defaultDate: ITimeRange = {
  mode: 'quick',
  quick: 'hours:1',
  customize: {
    start: undefined,
    end: undefined,
  },
};

if (query.mode === 'quick' && query.quick) {
  defaultDate = { mode: 'quick', quick: query.quick, customize: {} };
} else if (query.mode === 'customize' && query.start && query.end) {
  defaultDate = { mode: 'customize', quick: '', customize: { start: moment(+query.start), end: moment(+query.end) } };
}

const storageKey = 'log-history-query-params';

const OperationTips = () => {
  return (
    <Popover
      title={i18n.t('msp:query syntax')}
      content={
        <>
          <p>{i18n.t('msp:search guide')}</p>
          <p>1. {i18n.t('msp:full text query')}：quick</p>
          <p>2. {i18n.t('msp:exact match')}：&quot;John Smith&quot;</p>
          <p>3. {i18n.t('msp:operator')}: &quot;John Smith&quot; AND (quick OR brown)</p>
          <p>4. {i18n.t('msp:tags search')}: tags.pod_name: &quot;pod-name&quot;</p>
          <p>5. {i18n.t('msp:operator guide')}</p>
        </>
      }
    >
      <IconAttention className="cursor-pointer" theme="outline" size="14" fill="#333" />
    </Popover>
  );
};

const initHistorySearch = (): string[] => {
  let defaultHistory;
  const str = window.localStorage.getItem(storageKey) ?? '[]';
  try {
    const temp = JSON.parse(str);
    defaultHistory = [];
    if (Array.isArray(temp)) {
      defaultHistory = temp;
    }
  } catch (_) {
    defaultHistory = [];
  }
  return defaultHistory;
};

const LogQuery = React.forwardRef((props: IProps, ref) => {
  const inp = React.useRef({});
  const [historySearch, setHistorySearch] = useLocalStorage(storageKey, initHistorySearch());
  const [{ date, triggerTime }, updater] = useUpdate<IState>({
    date: defaultDate,
    triggerTime: 0,
  });

  const updateHistorySearch = React.useCallback(
    (queryStr?: string) => {
      const newHistory = produce(historySearch, (draft = []) => {
        if (queryStr && !draft.includes(queryStr)) {
          draft.unshift(queryStr);
        }
      });
      setHistorySearch(uniq(newHistory).slice(0, 20));
    },
    [historySearch],
  );

  React.useImperativeHandle(ref, () => ({
    updateHistorySearch,
  }));

  React.useEffect(() => {
    if (date.mode === 'quick') {
      updateSearch({ mode: date.mode, quick: date.quick, start: undefined, end: undefined });
    } else {
      updateSearch({
        mode: date.mode,
        quick: undefined,
        start: date.customize.start?.valueOf(),
        end: date.customize.end?.valueOf(),
      });
    }
  }, [date]);

  React.useEffect(() => {
    const { start, end } = props.timeRange ?? {};
    if (start && end) {
      const range: ITimeRange = {
        mode: 'customize',
        quick: undefined,
        customize: {
          start: moment(start),
          end: moment(end),
        },
      };
      updater.date(range);
      search(range);
    }
  }, [props.timeRange]);

  const search = React.useCallback(
    (timeRange?: ITimeRange) => {
      const {
        date: [start, end],
      } = transformRange(timeRange ?? date);
      props.onSearch({
        start: start.valueOf(),
        end: end.valueOf(),
        queryStr: props.queryString,
      });
    },
    [date, props.queryString],
  );

  const handleQuickSearch = React.useCallback(
    (queryStr) => {
      props.onQueryStringChange?.(queryStr);
      const {
        date: [start, end],
      } = transformRange(date);
      props.onSearch({
        start: start.valueOf(),
        end: end.valueOf(),
        queryStr,
      });
    },
    [date],
  );

  const handleDateChange = React.useCallback(
    (timeRange) => {
      updater.date(timeRange);
      search(timeRange);
    },
    [search],
  );

  const handleSearch = React.useCallback(() => {
    search();
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onQueryStringChange?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { target, keyCode, ctrlKey } = e;
    // Enter
    if (keyCode == 13) {
      const source = target.value;
      let cursorPosition = -1;
      // Ctrl + Enter new line
      if (ctrlKey) {
        if (target.selectionStart) {
          cursorPosition = target.selectionStart;
        } else {
          const range = document.selection.createRange();
          range.moveStart('character', -target.value.length);
          cursorPosition = range.text.length;
        }
        const newStr = `${source.slice(0, cursorPosition)}\n${source.slice(cursorPosition)}`;
        props.onQueryStringChange?.(newStr);
        inp.current = {
          cursorPosition: cursorPosition + 1,
          target,
        };
      } else {
        e.preventDefault();
        handleSearch();
      }
    }
  };

  React.useLayoutEffect(() => {
    const { target, cursorPosition = props.queryString?.length ?? 0 } = inp.current;
    if (target) {
      if (target.setSelectionRange) {
        target.setSelectionRange(cursorPosition, cursorPosition);
        target.focus();
      }
      inp.current = {};
    }
  }, [props.queryString]);

  useMount(() => {
    search();
  });

  return (
    <div className="flex items-start mb-2.5">
      <div className="flex flex-1 mr-3 relative">
        <Input.TextArea
          value={props.queryString}
          autoSize
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="pr-12"
        />
        <div className="absolute top-2 right-1.5 flex items-center">
          {historySearch?.length ? (
            <Popover
              overlayClassName="pr-0"
              placement="bottomRight"
              title={i18n.t('msp:query history')}
              content={
                <div className="w-72 max-h-56 overflow-y-auto">
                  {historySearch?.map((item) => {
                    return (
                      <p
                        title={item}
                        onClick={() => {
                          handleQuickSearch(item);
                        }}
                        className="overflow-ellipsis overflow-hidden whitespace-nowrap cursor-pointer hover:bg-magnolia hover:text-primary leading-6"
                        key={item}
                      >
                        {item}
                      </p>
                    );
                  })}
                </div>
              }
            >
              <IconHistory className="cursor-pointer mr-2" theme="filled" size="14" fill="currentColor" />
            </Popover>
          ) : null}
          <OperationTips />
        </div>
      </div>

      <div className="flex">
        <TimeSelect triggerChangeOnMounted className="mr-3" value={date} onChange={handleDateChange} />
        <Button type="primary" onClick={handleSearch}>
          {i18n.t('addonPlatform:search')}
        </Button>
      </div>
    </div>
  );
});
export default LogQuery;
