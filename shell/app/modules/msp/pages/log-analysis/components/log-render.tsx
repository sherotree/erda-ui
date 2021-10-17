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
import { formatTime, goTo, setLS } from 'common/utils';
import { map, pick } from 'lodash';
import { Dropdown, Menu, Popover, Tag, Modal } from 'core/nusi';
import {
  logToken,
  logTokenReg,
  mergeTagToString,
  transformQueryToTagMap,
} from 'msp/pages/log-analysis/components/utils';
import {
  ChartLine as IconChartLine,
  CopyOne as IconCopyOne,
  Edit as IconEdit,
  More as IconMore,
  Plus as IconPlus,
  Share as IconShare,
  FileSearchTwo as IconLogSearch,
  Down as IconDown,
  Right as IconRight,
} from '@icon-park/react';
import { IIconProps } from '@icon-park/react/es/runtime';
import Spotlight from 'msp/pages/log-analysis/components/spotlight';
import { LOGIC_OPERATOR } from 'msp/pages/log-analysis/components/constants';
import { Copy, EmptyHolder } from 'common';
import routeInfoStore from 'core/stores/route';
import i18n from 'i18n';
import LogContext from './log-context';

interface IProps {
  data: LOG_ANALYTICS.LogItem[];
  renderIndex?: (data: LOG_ANALYTICS.LogItem) => React.ReactNode;
  queryString?: string;
  onFieldSelect: (data: Obj, jumpOut?: boolean) => void;
  showTags: string[];
  fields: LOG_ANALYTICS.IField[];
}

type IMenuType = 'add' | 'create';

interface IQueryProps {
  onMenuClick: (key: IMenuType, jumpOut: boolean) => void;
}

const Query: React.FC<IQueryProps> = ({ children, onMenuClick }) => {
  const [visible, setVisible] = React.useState(false);
  const handleOpenNewPage = (e, key: IMenuType) => {
    e.stopPropagation();
    setVisible(false);
    onMenuClick(key, true);
  };
  return (
    <Dropdown
      visible={visible}
      onVisibleChange={setVisible}
      destroyPopupOnHide
      overlayClassName="w-40 min-w-0"
      trigger={['click']}
      overlay={
        <Menu
          onClick={({ key }) => {
            setVisible(false);
            onMenuClick(key, false);
          }}
        >
          <Menu.Item key="add" className="flex">
            <div className="flex-1">
              <IconPlus theme="outline" size="14" fill="currentColor" /> {i18n.t('msp:add to query')}
            </div>
            <IconShare
              theme="outline"
              size="14"
              fill="currentColor"
              onClick={(e) => {
                handleOpenNewPage(e, 'add');
              }}
            />
          </Menu.Item>
          <Menu.Item key="create" className="flex">
            <div className="flex-1">
              <IconEdit theme="outline" size="14" fill="currentColor" /> {i18n.t('msp:new query')}
            </div>
            <IconShare
              theme="outline"
              size="14"
              fill="currentColor"
              onClick={(e) => {
                handleOpenNewPage(e, 'create');
              }}
            />
          </Menu.Item>
        </Menu>
      }
    >
      {children}
    </Dropdown>
  );
};

interface ILogItemToolBarProps {
  highlight: { [k: string]: string[] };
  data: LOG_ANALYTICS.LogItem;
  fields: LOG_ANALYTICS.IField[];
  showTags: string[];
  onClickField: (tag: string, field: string, target?: DOMRect) => void;
  onAction: (type: IMenuType, tag: string, field: string, jumpOut?: boolean) => void;
  onHandleLogModalVisible: (id: string, source: LOG_ANALYTICS.LogItem) => void;
}

const LogItemToolBar = ({
  data,
  onClickField,
  onAction,
  onHandleLogModalVisible,
  showTags,
  highlight,
}: ILogItemToolBarProps) => {
  const [isIn, params] = routeInfoStore.useStore((s) => [s.isIn, s.params]);
  const tagRef = React.useRef<{ [k: string]: HTMLSpanElement | null }>({});
  const iconProps: IIconProps = {
    className: 'cursor-pointer',
    theme: 'outline',
    size: '14',
    fill: 'currentColor',
  };

  const copyCls = `log-copy-${data.source._id}`;

  const handleClick = (field: string) => {
    const target = tagRef.current[field]?.getBoundingClientRect();
    onClickField?.('', '', target);
  };

  const handleMenuClick = (type: IMenuType, tag: string, field: string, jumpOut) => {
    onAction?.(type, tag, field, jumpOut);
  };

  const handleCreateRule = (tags: LOG_ANALYTICS.LogItem['source']['tags'], content: string) => {
    if (tags.origin !== 'sls') {
      const targetTagMap = pick(tags, [
        'dice_project_name',
        'dice_workspace',
        'dice_application_name',
        'dice_service_name',
      ]);
      const targetTags = map(targetTagMap, (v, k) => `${k}=${v}`);
      setLS('logRuleTags', targetTags);
    } else {
      setLS('logRuleTags', []);
    }
    setLS('logRuleContent', content);
    const path = isIn('msp')
      ? goTo.resolve.ms_addLogAnalyzeRule({ ...params, source: 'log-query' })
      : isIn('cmp')
      ? goTo.resolve.addLogAnalyzeRule({ ...params, source: 'log-query' })
      : '';
    goTo(path, { jumpOut: true });
  };

  return (
    <div className="mb-2 flex">
      <div className="w-20">
        <Copy selector={`.${copyCls}`} opts={{ text: () => data.source.content }}>
          <span className="text-darkgray hover:text-primary">
            <IconCopyOne {...iconProps} className={`cursor-copy ${copyCls}`} />
          </span>
        </Copy>
        <span className="text-darkgray hover:text-primary">
          <IconLogSearch
            {...iconProps}
            onClick={() => {
              onHandleLogModalVisible(data?.source);
            }}
          />
        </span>
        <span className="text-darkgray hover:text-primary">
          <Popover content={i18n.t('org:create analysis rule')}>
            <IconChartLine {...iconProps} onClick={() => handleCreateRule(data.source.tags, data.source.content)} />
          </Popover>
        </span>
        <Popover
          content={
            <div>
              {map(data.source.tags ?? {}, (tagValue, tagName) => {
                return (
                  <div>
                    <span className="bg-cultured leading-5 font-medium">{tagName}</span>:{' '}
                    <span className="leading-5">{tagValue}</span>
                  </div>
                );
              })}
            </div>
          }
        >
          <span className="text-darkgray hover:text-primary">
            <IconMore {...iconProps} />
          </span>
        </Popover>
      </div>
      <div className="flex flex-wrap flex-1">
        {map(data.source.tags ?? {}, (item, tagKey) => {
          const fieldName = `tags.${tagKey}`;
          if (!showTags.includes(fieldName)) {
            return null;
          }
          const highlights = highlight?.[fieldName] ?? [];
          const isHighlight = highlights.includes(item);
          return (
            <Query
              onMenuClick={(key, jumpOut) => {
                handleMenuClick(key, fieldName, item, jumpOut);
              }}
            >
              <div
                key={item}
                className="cursor-pointer mr-2 mb-1"
                ref={(e) => {
                  tagRef.current[`${tagKey}-${item}`] = e;
                }}
                onClick={() => {
                  handleClick(`${tagKey}-${item}`);
                }}
              >
                <Popover
                  content={
                    <div>
                      <span className="bg-cultured leading-5 font-medium">{fieldName}</span>:{' '}
                      <span className="leading-5">{item}</span>
                    </div>
                  }
                >
                  <Tag className="mr-0 text-xs" color="#999999">
                    {isHighlight ? <span className="text-red">{item}</span> : item}
                  </Tag>
                </Popover>
              </div>
            </Query>
          );
        })}
      </div>
    </div>
  );
};

interface ILogerContent {
  content: string;
  tag: string;
  highlights: string[];
  onClickField: (tag: string, field: string, target?: DOMRect) => void;
  onAction: (type: IMenuType, tag: string, field: string, jumpOut?: boolean) => void;
}

const LogContentRender: React.FC<ILogerContent> = ({ content, tag, onClickField, onAction, highlights }) => {
  const spanRef = React.useRef<{ [k: string]: HTMLSpanElement | null }>({});
  const [isExpand, setIsExpand] = React.useState(false);
  const isFoldContent = String(content).length > 1000;
  const value = isFoldContent && !isExpand ? `${String(content).slice(0, 1000)} ...` : content;

  const handleClick = React.useCallback(
    (field: string, refFlag) => {
      const target = spanRef.current[refFlag]?.getBoundingClientRect();
      onClickField(tag, field, target);
    },
    [tag, onClickField],
  );
  const handleMenuClick = React.useCallback(
    (type: IMenuType, field: string, jumpOut: boolean) => {
      onAction?.(type, tag, field, jumpOut);
    },
    [tag, onAction],
  );

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

      <>
        {String(value)
          .split(logTokenReg)
          .map((t, index) => {
            if (logToken[t]) {
              return <span className={`font-medium ${t === '\t' ? 'ml-4' : ''}`}>{t}</span>;
            } else {
              const isHighlight = highlights?.includes(t);
              return (
                <Query
                  onMenuClick={(key, jumpOut) => {
                    handleMenuClick(key, t, jumpOut);
                  }}
                >
                  <span
                    ref={(e) => {
                      spanRef.current[`${t}-${index}`] = e;
                    }}
                    onClick={() => {
                      handleClick(t, `${t}-${index}`);
                    }}
                    className={`cursor-pointer font-medium inline-block ${
                      isHighlight ? 'text-red' : 'hover:text-primary'
                    }`}
                  >
                    {t}
                  </span>
                </Query>
              );
            }
          })}
        <br />
      </>
    </span>
  );
};

const LogRender = ({ data, renderIndex, queryString, onFieldSelect, showTags, fields }: IProps) => {
  const [visible, setVisible] = React.useState(false);
  const [isLogModalVisible, setIsLogModalVisible] = React.useState(false);
  const [viewLogSource, setViewLogSource] = React.useState({});
  const ref = React.useRef<DOMRect>();
  const fieldsMap = React.useRef<Obj>({});
  React.useEffect(() => {
    fieldsMap.current = transformQueryToTagMap(queryString);
  }, [queryString]);
  const handleFieldClick = (_tag: string, _field: string, target?: DOMRect) => {
    if (target) {
      ref.current = target;
      setVisible(true);
    }
  };
  const handleClickMenu = React.useCallback(
    (type: IMenuType, tag: string, field: string, jumpOut?: boolean) => {
      setVisible(false);
      const operator = LOGIC_OPERATOR.AND;
      const { queryString: newQueryString, tagMap } = mergeTagToString(
        operator,
        tag,
        field,
        type === 'add' ? queryString ?? '' : '',
        fieldsMap.current,
      );
      fieldsMap.current = tagMap;
      onFieldSelect?.({ queryString: newQueryString }, jumpOut);
    },
    [queryString, onFieldSelect],
  );

  const handleLogModalVisible = (source: Omit<LOG_ANALYTICS.LogItem, 'highlight'>) => {
    setIsLogModalVisible(true);
    setViewLogSource(source);
  };
  return (
    <div className="min-h-full">
      {data.length === 0 && <EmptyHolder relative />}
      {data.map((item) => {
        const {
          source: { tags, ...rest },
          highlight,
        } = item;

        return (
          <div key={rest._id} className="flex p-2 border-0 border-b border-brightgray border-solid hover:bg-magnolia">
            {renderIndex ? renderIndex(item) : null}
            <div className="font-semibold text-xs leading-5">{formatTime(rest.timestamp, 'MM-DD HH:mm:ss')}</div>
            <div className="flex-1 pl-2">
              <LogItemToolBar
                highlight={highlight}
                fields={fields}
                showTags={showTags}
                data={item}
                onClickField={handleFieldClick}
                onAction={handleClickMenu}
                onHandleLogModalVisible={handleLogModalVisible}
              />

              {map(rest, (value, tag) => {
                if (!showTags.includes(tag)) {
                  return null;
                }

                const highlights = highlight?.[tag] ?? [];
                return (
                  <p className="text-xs leading-5 relative">
                    <span className="bg-cultured leading-5 font-medium">{tag}</span>:{' '}
                    <span className="leading-5">
                      <LogContentRender
                        highlights={highlights}
                        tag={tag}
                        content={value}
                        onClickField={handleFieldClick}
                        onAction={handleClickMenu}
                      />
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
      <Spotlight visible={visible} target={ref.current} onVisibleChange={setVisible} />
      {isLogModalVisible && (
        <Modal
          width={1000}
          visible
          bodyStyle={{ height: '80vh', overflow: 'auto' }}
          onCancel={() => setIsLogModalVisible(false)}
          footer={null}
          title="上下文浏览"
        >
          <LogContext source={viewLogSource} data={data} fields={fields} />
        </Modal>
      )}
    </div>
  );
};

export default LogRender;
