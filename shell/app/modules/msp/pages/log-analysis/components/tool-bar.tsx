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
import i18n from 'i18n';
import { Button, Dropdown, Menu, Pagination, Switch } from 'core/nusi';
import {
  CloseSmall as IconCloseSmall,
  Download as IconDownload,
  DownOne as IconDownOne,
  SettingTwo as IconSettingTwo,
  UpOne as IconUpOne,
} from '@icon-park/react';
import { produce } from 'immer';
import mspLogAnalyticsStore from 'msp/stores/log-analytics';

export type ISort = 'desc' | 'asc';

const Item: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return (
    <div {...rest} className="flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

interface IProps {
  addonId: string;
  total: number;
  defaultSort?: ISort;
  onSort?: (sort: ISort) => void;
  onPageChange: (pageNo: number, pageSize?: number) => void;
  onDownLoad: () => void;
  pageSize: number;
  pageNo: number;
}

const ToolBar = ({ defaultSort, onSort, onPageChange, total, onDownLoad, addonId, pageSize, pageNo }: IProps) => {
  const [sort, setSort] = React.useState<ISort>(defaultSort || 'asc');
  const [visible, setVisible] = React.useState(false);
  const { updateShowTags } = mspLogAnalyticsStore.reducers;
  const data = mspLogAnalyticsStore.useStore((s) => s.fields);

  const handleSort = React.useCallback(() => {
    const newSort = sort === 'desc' ? 'asc' : 'desc';
    setSort(newSort);
    onSort?.(newSort);
  }, [sort]);

  const handleDisplayChange = (checked: boolean, record: LOG_ANALYTICS.IField) => {
    const newField = produce(data, (draft) => {
      if (draft) {
        const target = draft.find((t) => t.fieldName === record.fieldName);
        target.display = checked;
      }
    });
    window.localStorage.setItem(addonId, JSON.stringify(newField));
    updateShowTags(newField);
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
        <div className="max-h-48 overflow-y-auto" data-l={data?.length}>
          {data?.map((item) => {
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
  }, [data]);

  return (
    <div className="flex justify-between">
      <div className="flex">
        <Button size="small" className="flex items-center cursor-pointer" onClick={handleSort}>
          {i18n.t('time')}
          <span className="flex flex-col">
            <IconUpOne className="-mb-1" theme="filled" size="14" fill={sort === 'asc' ? '#6a549e' : '#999999'} />
            <IconDownOne className="-mt-1" theme="filled" size="14" fill={sort === 'desc' ? '#6a549e' : '#999999'} />
          </span>
        </Button>
        <Button size="small" className="flex items-center cursor-pointer ml-2" onClick={onDownLoad}>
          <IconDownload theme="filled" size="14" fill="currentColor" />
          {i18n.t('download')}
        </Button>
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
      <Pagination
        size="small"
        showSizeChanger
        total={total}
        onChange={onPageChange}
        pageSize={pageSize}
        current={pageNo}
      />
    </div>
  );
};

export default ToolBar;
