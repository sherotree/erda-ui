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
import { Input, Menu, Progress } from 'core/nusi';
import i18n from 'i18n';
import './field-menu.scss';
import { useUpdate } from 'common/use-hooks';
import { LOGIC_OPERATOR } from 'msp/pages/log-analysis/components/constants';
import { mergeTagToString, transformQueryToTagMap } from 'msp/pages/log-analysis/components/utils';
import mspLogAnalyticsStore from 'msp/stores/log-analytics';

interface IProps {
  start: number;
  end: number;
  clusterName: string;
  queryString?: string;
  onFieldSelect: (data: Obj) => void;
}

interface IState {
  openKeys: string[];
  keyWord: string;
}

const FieldMenu = (props: IProps) => {
  const { onFieldSelect, queryString = '', start, end, clusterName } = props;
  const { getAggregation } = mspLogAnalyticsStore.effects;
  const [menu] = mspLogAnalyticsStore.useStore((s) => [s.menu]);
  const [{ keyWord, openKeys }, updater] = useUpdate<IState>({
    openKeys: [],
    keyWord: '',
  });
  const fieldsMap = React.useRef<Obj>({});
  React.useEffect(() => {
    fieldsMap.current = transformQueryToTagMap(queryString);
  }, [queryString]);
  const handleClickField = React.useCallback(
    (keyName, keyValue) => {
      const operator = LOGIC_OPERATOR.AND;
      const { queryString: newQueryString, tagMap } = mergeTagToString(
        operator,
        keyName,
        keyValue,
        queryString,
        fieldsMap.current,
      );
      fieldsMap.current = tagMap;

      onFieldSelect?.({ queryString: newQueryString });
    },
    [queryString],
  );

  const handleTitleClick = (key: string) => {
    getAggregation({ clusterName, start, end, query: queryString, aggFields: [key], targetKey: key });
  };

  const handleOpenChange = (keys: React.Key[]) => {
    updater.openKeys(keys.map((item) => String(item).replace('empty', 'notEmpty')));
  };

  return (
    <>
      <Input.Search
        placeholder={i18n.t('search {name}', { name: i18n.t('field') })}
        className="pr-4"
        onSearch={updater.keyWord}
      />
      <Menu
        openKeys={openKeys}
        className="log-field-menu"
        mode="inline"
        selectable={false}
        multiple
        onOpenChange={handleOpenChange}
      >
        {menu
          ?.filter((t) => t.fieldName.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()))
          .map((item) => {
            const { total = 1, fieldName } = item;
            return (
              <Menu.SubMenu
                className="pl-0"
                key={`${fieldName}-${item.subMenu?.length ? 'notEmpty' : 'empty'}`}
                title={
                  <div title={fieldName} className="pr-8 overflow-ellipsis overflow-hidden whitespace-nowrap">
                    {fieldName}
                  </div>
                }
                onTitleClick={() => {
                  handleTitleClick(fieldName);
                }}
              >
                {item.subMenu?.map(({ key, count }) => {
                  const percent = +((count / total) * 100).toFixed(2);
                  return (
                    <Menu.Item
                      key={key}
                      className="pl-0"
                      onClick={() => {
                        handleClickField(fieldName, key);
                      }}
                    >
                      <div
                        title={key}
                        className="overflow-ellipsis overflow-hidden whitespace-nowrap h-5 text-xs leading-5 hover:underline"
                      >
                        {key}
                      </div>
                      <Progress size="small" percent={percent} status="active" strokeLinecap="square" />
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            );
          })}
      </Menu>
    </>
  );
};

export default FieldMenu;
