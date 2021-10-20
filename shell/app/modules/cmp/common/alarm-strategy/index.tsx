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
import { map, isEmpty, isNull, every, forEach, uniqueId, filter, find, findIndex, fill, cloneDeep } from 'lodash';
import moment from 'moment';
import { useMount, useUnmount } from 'react-use';
import { Modal, Button, Spin, Switch, Select, Table, Input, InputNumber, Popover, Divider, Tooltip } from 'core/nusi';
import { FormModal } from 'common';
import { useSwitch, useUpdate } from 'common/use-hooks';
import { goTo, insertWhen } from 'common/utils';
import { FormInstance, ColumnProps } from 'core/common/interface';
import i18n from 'i18n';
import { useLoading } from 'core/stores/loading';
import notifyGroupStore from 'application/stores/notify-group';
import orgMemberStore from 'common/stores/org-member';
import projectMemberStore from 'common/stores/project-member';
import cmpAlarmStrategyStore from 'app/modules/cmp/stores/alarm-strategy';
import mspAlarmStrategyStore from 'app/modules/msp/alarm-manage/alarm-strategy/stores/alarm-strategy';
import {
  notifyChannelOptionsMap,
  smsNotifyChannelOptionsMap,
  ListTargets,
} from 'application/pages/settings/components/app-notify/common-notify-group';
import { usePerm, WithAuth } from 'user/common';
import clusterStore from 'cmp/stores/cluster';
import orgStore from 'app/org-home/stores/org';
import './index.scss';
import routeInfoStore from 'core/stores/route';
import { AddOne as IconAddOne, ReduceOne as IconReduceOne } from '@icon-park/react';
import {
  mockNotifyStrategy,
  mockTriggerConditionKeys,
  mockTriggerConditionOperators,
  mockTriggerConditionValues,
} from './mock';
import { TriggerConditionSelect } from './trigger-condition-select';

const { confirm, warning } = Modal;
const { Option } = Select;

enum ScopeType {
  ORG = 'org',
  PROJECT = 'project',
  MSP = 'msp',
}

enum SilencePeriodType {
  FIXED = 'fixed',
  DOUBLED = 'doubled',
}

const SILENCE_PERIOD_POLICY_MAP = {
  [SilencePeriodType.FIXED]: i18n.t('org:fixed'),
  [SilencePeriodType.DOUBLED]: i18n.t('org:doubled'),
};

const alarmStrategyStoreMap = {
  [ScopeType.ORG]: cmpAlarmStrategyStore,
  [ScopeType.MSP]: mspAlarmStrategyStore,
};

const memberStoreMap = {
  [ScopeType.ORG]: orgMemberStore,
  [ScopeType.MSP]: projectMemberStore,
};

const notifyGroupPage = {
  [ScopeType.ORG]: goTo.pages.cmpNotifyGroup,
  [ScopeType.MSP]: goTo.pages.mspProjectNotifyGroup,
};

interface IProps {
  scopeType: ScopeType.ORG | ScopeType.MSP;
  scopeId: string;
  commonPayload?: Obj;
}

export default ({ scopeType, scopeId, commonPayload }: IProps) => {
  const memberStore = memberStoreMap[scopeType];
  const params = routeInfoStore.useStore((s) => s.params);
  const roleMap = memberStore.useStore((s) => s.roleMap);
  const { getRoleMap } = memberStore.effects;
  const alarmStrategyStore = alarmStrategyStoreMap[scopeType];
  const [
    alertList,
    alarmPaging,
    alarmScopeMap,
    alertTypes,
    // alertTriggerConditions,
    // alertTriggerConditionsContent
  ] = alarmStrategyStore.useStore((s) => [
    s.alertList,
    s.alarmPaging,
    s.alarmScopeMap,
    s.alertTypes,
    s.alertTriggerConditions,
    s.alertTriggerConditionsContent,
  ]);
  // TODO: 如果接口挂了
  const alertTriggerConditions = [
    {
      displayName: '服务',
      key: 'service_name',
    },
    {
      key: 'application_name',
      displayName: '应用',
    },
  ];

  const alertTriggerConditionsContent = [
    {
      key: 'application_name',
      options: ['go-demo', 'test', 'dev'],
    },
    {
      key: 'service_name',
      options: ['go-demo', 'foo1', 'foo2', 'foo3'],
    },
  ];

  const { total, pageNo, pageSize } = alarmPaging;
  const orgId = orgStore.getState((s) => s.currentOrg.id);
  const [getAlertDetailLoading, getAlertsLoading, toggleAlertLoading] = useLoading(alarmStrategyStore, [
    'getAlertDetail',
    'getAlerts',
    'toggleAlert',
  ]);
  const {
    getAlerts,
    createAlert,
    editAlert,
    toggleAlert,
    deleteAlert,
    getAlertDetail,
    getAlarmScopes,
    getAlertTypes,
    getAlertTriggerConditions,
    getAlertTriggerConditionsContent,
  } = alarmStrategyStore.effects;
  const { clearAlerts } = alarmStrategyStore.reducers;
  const { getNotifyGroups } = notifyGroupStore.effects;
  const notifyGroups = notifyGroupStore.useStore((s) => s.notifyGroups);
  const [modalVisible, openModal, closeModal] = useSwitch(false);

  const orgAddNotificationGroupAuth = usePerm((s) => s.org.cmp.alarms.addNotificationGroup.pass);

  const { getSMSNotifyConfig } = clusterStore.effects;
  const enableMS = clusterStore.useStore((s) => s.enableMS);
  const notifyChannelMap = enableMS ? smsNotifyChannelOptionsMap : notifyChannelOptionsMap;

  const addNotificationGroupAuth = scopeType === ScopeType.ORG ? orgAddNotificationGroupAuth : true; // 企业中心的添加通知组，需要验证权限，项目的暂无埋点

  const [state, updater, update] = useUpdate({
    editingRules: [] as any,
    editingFormRule: {},
    activedGroupId: undefined,
    triggerConditions: [],
    triggerConditionValueOptions: [],
    selectedNotifyGroup: null,
    notifyLevel: null,
    notifyMethod: null,
  });

  useMount(() => {
    let payload = { scopeType, scopeId };
    if (scopeType === ScopeType.MSP) {
      payload = {
        scopeType: commonPayload?.scopeType,
        scopeId: commonPayload?.scopeId,
      };
    }
    getSMSNotifyConfig({ orgId });
    getAlerts();
    getAlarmScopes();
    getAlertTriggerConditions(scopeType);
    getAlertTriggerConditionsContent({ projectId: scopeId, scopeType });
    getAlertTypes();
    getNotifyGroups(payload);
    getRoleMap({ scopeType, scopeId: scopeType === ScopeType.MSP ? commonPayload?.scopeId : scopeId });
  });

  useUnmount(() => {
    clearAlerts();
  });

  // 获取规则枚举
  const windows = React.useMemo(() => alertTypes.windows, [alertTypes.windows]);
  const silenceMap = React.useMemo(() => {
    const result = {};
    forEach(alertTypes.silence, (item) => {
      result[`${item.value}-${item.unit.key}`] = item.unit;
    });
    return result;
  }, [alertTypes.silence]);
  const operatorMap = React.useMemo(() => {
    const result = {};
    forEach(alertTypes.operators, (item) => {
      result[item.key] = item.display;
    });
    return result;
  }, [alertTypes.operators]);
  const aggregatorMap = React.useMemo(() => {
    const result = {};
    forEach(alertTypes.aggregator, (item) => {
      result[item.key] = item.display;
    });
    return result;
  }, [alertTypes.aggregator]);
  const [alertTypeRuleMap, allRuleFieldMap, allRuleMap, allRules] = React.useMemo(() => {
    const _alertTypeRuleMap = {};
    const _allRuleMap = {};
    const _allRuleFieldMap = {};
    let _allRules: any[] = [];
    forEach(alertTypes.alertTypeRules, ({ alertType, rules }) => {
      _alertTypeRuleMap[alertType.key] = rules;
      forEach(rules, (item) => {
        _allRuleMap[item.alertIndex.key] = item.alertIndex.display;
        forEach(item.functions, (subItem) => {
          _allRuleFieldMap[subItem.field.key] = subItem.field.display;
        });
      });
      _allRules = _allRules.concat(
        map(rules, ({ alertIndex, functions, ...rest }) => ({
          alertIndex: alertIndex.key,
          functions: map(functions, ({ field, ...subRest }) => ({ field: field.key, ...subRest })),
          ...rest,
        })),
      );
    });
    return [_alertTypeRuleMap, _allRuleFieldMap, _allRuleMap, _allRules];
  }, [alertTypes.alertTypeRules]);

  const getFunctionsValueElement = (item: any, functionIndex: number, key: string) => {
    let functionsValueElement = null;
    switch (typeof item.value) {
      case 'boolean':
        functionsValueElement = (
          <Switch
            checkedChildren="true"
            unCheckedChildren="false"
            defaultChecked={item.value}
            onClick={(v: boolean) => {
              handleEditEditingRuleField(key, functionIndex, { key: 'value', value: v });
            }}
          />
        );
        break;
      case 'string':
        functionsValueElement = (
          <Input
            className="value"
            defaultValue={item.value}
            onChange={(e: any) => {
              handleEditEditingRuleField(key, functionIndex, { key: 'value', value: e.target.value });
            }}
          />
        );
        break;
      case 'number':
        functionsValueElement = (
          <InputNumber
            className="value"
            min={0}
            defaultValue={item.value}
            onChange={(v: string | number | undefined) => {
              handleEditEditingRuleField(key, functionIndex, { key: 'value', value: Number(v) });
            }}
          />
        );
        break;
      default:
        break;
    }
    return functionsValueElement;
  };

  const columns: Array<ColumnProps<COMMON_STRATEGY_NOTIFY.IFormRule>> = [
    {
      title: i18n.t('org:rule name'),
      dataIndex: 'alertIndex',
      render: (value: string, { key }) => (
        <Select
          value={value}
          onSelect={(alertIndex: any) => {
            const rules = cloneDeep(state.editingRules);
            const rule = find(allRules, { alertIndex });
            const index = findIndex(rules, { key });
            fill(rules, { key, ...rule }, index, index + 1);
            updater.editingRules(rules);
          }}
        >
          {map(allRules, ({ alertIndex, id }) => (
            <Option key={id} value={alertIndex}>
              {allRuleMap[alertIndex]}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: `${i18n.t('org:duration')}(min)`,
      dataIndex: 'window',
      width: 130,
      render: (value: number, { key }: COMMON_STRATEGY_NOTIFY.IFormRule) => (
        <Select
          value={value}
          onSelect={(window: any) => handleEditEditingRule(key, { key: 'window', value: Number(window) })}
        >
          {map(windows, (item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: i18n.t('org:aggregation rules'),
      dataIndex: 'functions',
      width: 410,
      render: (functions: any[], { key }: COMMON_STRATEGY_NOTIFY.IFormRule) => (
        <div className="function-list">
          {map(functions, (item, index) => (
            <div className="function-item flex-div flex items-center" key={item.field}>
              <Tooltip title={allRuleFieldMap[item.field]}>
                <span className="field-name mr-2 nowrap">{allRuleFieldMap[item.field]}</span>
              </Tooltip>
              <span className="aggregator mr-2">{aggregatorMap[item.aggregator]}</span>
              {/* <Select
                  className="aggregator mr-2"
                  defaultValue={item.aggregator}
                  disabled
                >
                  {map(aggregatorMap, (name, _key) => (<Option key={_key} value={_key}>{name}</Option>))}
                </Select> */}
              <Select
                className="operator mr-2"
                defaultValue={item.operator}
                onSelect={(value: any) => {
                  handleEditEditingRuleField(key, index, { key: 'operator', value: String(value) });
                }}
              >
                {map(operatorMap, (name, _key) => (
                  <Option key={_key} value={_key}>
                    {name}
                  </Option>
                ))}
              </Select>
              {getFunctionsValueElement(item, index, key)}
            </div>
          ))}
        </div>
      ),
    },
    // {
    //   title: i18n.t('org:alarm after recovery'),
    //   dataIndex: 'isRecover',
    //   width: 105,
    //   render: (isRecover: boolean, { key }: COMMON_STRATEGY_NOTIFY.IFormRule) => <Switch checked={isRecover} onChange={checked => handleEditEditingRule(key, { key: 'isRecover', value: checked })} />,
    // },
    {
      title: i18n.t('operate'),
      width: 65,
      render: (record: COMMON_STRATEGY_NOTIFY.IFormRule) => {
        return (
          <div className="table-operations">
            <span
              className="table-operations-btn"
              onClick={() => {
                handleRemoveEditingRule(record.key);
              }}
            >
              {i18n.t('delete')}
            </span>
          </div>
        );
      },
    },
  ];

  const NotifyGroupSelect = () => {
    const selectedNotifyGroup = mockNotifyStrategy.data?.groups?.find((x) => x?.key === state.selectedNotifyGroup);
    const levels = mockNotifyStrategy?.data?.levels || [];
    const notifyMethodOptions = selectedNotifyGroup?.notifyMethods || [];

    return (
      <div className="flex">
        <Select
          className="mr-8"
          value={state.selectedNotifyGroup}
          dropdownRender={(menu) => (
            <div>
              {menu}
              <Divider className="my-1" />
              <div className="text-xs px-2 py-1 text-desc" onMouseDown={(e) => e.preventDefault()}>
                <WithAuth pass={addNotificationGroupAuth}>
                  <span
                    className="hover-active"
                    onClick={() => {
                      goTo(notifyGroupPage[scopeType], { projectId: scopeId, ...params });
                    }}
                  >
                    {i18n.t('org:add more notification groups')}
                  </span>
                </WithAuth>
              </div>
            </div>
          )}
          onSelect={(value) =>
            update({
              selectedNotifyGroup: value,
              notifyMethod: null,
              notifyLevel: null,
            })
          }
        >
          {map(mockNotifyStrategy.data?.groups, (item) => {
            return (
              <Option key={item?.key} value={item?.key}>
                {item?.display}
              </Option>
            );
          })}
        </Select>
        <Select className="mr-8" value={state.notifyLevel} onSelect={(value) => updater.notifyLevel(value)}>
          {map(levels, (item) => {
            return (
              <Option key={item?.key} value={item?.key}>
                {item?.display}
              </Option>
            );
          })}
        </Select>
        <Select value={state.notifyMethod} onSelect={(value) => updater.notifyMethod(value)}>
          {map(notifyMethodOptions, (item) => {
            return (
              <Option key={item?.key} value={item?.key}>
                {item?.display}
              </Option>
            );
          })}
        </Select>
      </div>
    );
  };

  // console.log('state.editingRules', state.editingRules, { allRules });
  let fieldsList = [
    {
      label: i18n.t('org:alarm name'),
      name: 'name',
      itemProps: {
        disabled: !isEmpty(state.editingFormRule),
        maxLength: 50,
      },
      initialValue: state.editingFormRule.name,
    },
    {
      label: (
        <div>
          <span>{i18n.d('触发条件')}</span>
          <IconAddOne className="cursor-pointer" size="24" onClick={() => handleAddTriggerConditions()} />
        </div>
      ),
      name: 'triggerConditions',
      required: false,
      getComp: () => (
        <>
          {state.triggerConditions.map((item) => (
            <TriggerConditionSelect
              keyOptions={alertTriggerConditions}
              key={item.id}
              id={item.id}
              updater={updater}
              current={state.triggerConditions.find((x) => x.id === item.id)}
              handleEditTriggerConditions={handleEditTriggerConditions}
              handleRemoveTriggerConditions={handleRemoveTriggerConditions}
              operatorOptions={alertTypes.operators}
              valueOptions={state.triggerConditionValueOptions}
              valueOptionsList={alertTriggerConditionsContent}
            />
          ))}
        </>
      ),
    },
    {
      label: i18n.t('org:alarm rule'),
      name: 'expressions',
      required: false,
      getComp: () => (
        <>
          <div className="opportunity-header mb-2">
            <Popover
              placement="bottomLeft"
              trigger="click"
              content={
                <div className="alarm-rule-collection">
                  {map(alertTypes.alertTypeRules, (item) => (
                    <div
                      className="collection-item hover-active-bg"
                      key={item.alertType.key}
                      onClick={() => {
                        handleClickAlertType(item.alertType.key);
                      }}
                    >
                      {item.alertType.display}
                    </div>
                  ))}
                </div>
              }
            >
              <Button className="mr-2">{i18n.t('org:type template')}</Button>
            </Popover>
            <Button type="primary" ghost onClick={handleAddEditingRule}>
              {i18n.t('org:add rule')}
            </Button>
          </div>
          <Table
            bordered
            rowKey="key"
            className="opportunity-table"
            dataSource={state.editingRules}
            columns={columns}
            // table's scroll cannot be used with  select's getPopupContainer
            scroll={undefined}
          />
        </>
      ),
    },
    {
      label: i18n.t('org:silence period'),
      name: 'silence',
      initialValue: state.editingFormRule.notifies
        ? `${state.editingFormRule.notifies[0].silence.value}-${state.editingFormRule.notifies[0].silence.unit}`
        : undefined,
      type: 'select',
      options: map(silenceMap, ({ display }, value) => ({ name: `${value.split('-')[0]}${display}`, value })),
    },
    {
      label: i18n.t('silence period policy'),
      name: 'silencePolicy',
      initialValue: state.editingFormRule.notifies
        ? `${state.editingFormRule.notifies[0].silence.policy}`
        : SilencePeriodType.FIXED,
      type: 'radioGroup',
      options: map(SILENCE_PERIOD_POLICY_MAP, (name, value) => ({ name, value })),
    },
    // TODO: 通知策略
    // {
    //   label: i18n.d('org:select group'),
    //   name: 'groupId',
    //   getComp: () => NotifyGroupSelect(),
    // },
    {
      label: i18n.t('org:select group'),
      name: 'groupId',
      initialValue: state.activedGroupId,
      config: {
        valuePropType: 'array',
      },
      getComp: ({ form }: { form: FormInstance }) => {
        return (
          <Select
            onSelect={(id: any) => {
              form.setFieldsValue({ groupType: [], groupId: id });
              updater.activedGroupId(id);
            }}
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider className="my-1" />
                <div className="text-xs px-2 py-1 text-desc" onMouseDown={(e) => e.preventDefault()}>
                  <WithAuth pass={addNotificationGroupAuth}>
                    <span
                      className="hover-active"
                      onClick={() => {
                        goTo(notifyGroupPage[scopeType], { projectId: scopeId, ...params });
                      }}
                    >
                      {i18n.t('org:add more notification groups')}
                    </span>
                  </WithAuth>
                </div>
              </div>
            )}
          >
            {map(notifyGroups, ({ id, name }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        );
      },
    },
  ];

  if (scopeType === ScopeType.ORG) {
    fieldsList.splice(1, 0, {
      label: i18n.t('org:alarm cluster'),
      name: 'clusterName',
      type: 'select',
      initialValue: state.editingFormRule.clusterName,
      options: map(alarmScopeMap, (name, id) => ({ name, value: id })),
      itemProps: {
        mode: 'multiple',
      },
    });
  }

  // msp project has not application，hide application selector
  if (scopeType === ScopeType.MSP && commonPayload?.projectType !== 'MSP') {
    fieldsList.splice(1, 0, {
      label: i18n.t('application'),
      name: 'appId',
      type: 'select',
      initialValue: state.editingFormRule.appId,
      options: map(alarmScopeMap, (name, id) => ({ name, value: id })),
      itemProps: {
        mode: 'multiple',
      },
    });
  }

  if (state.activedGroupId) {
    const activedGroup = find(notifyGroups, ({ id }) => id === state.activedGroupId);

    fieldsList = [
      ...fieldsList,
      {
        name: 'groupType',
        label: i18n.t('application:notification method'),
        required: true,
        type: 'select',
        initialValue: state.editingFormRule.notifies ? state.editingFormRule.notifies[0].groupType.split(',') : [],
        options: (activedGroup && notifyChannelMap[activedGroup.targets[0].type]) || [],
        itemProps: {
          mode: 'multiple',
        },
      },
    ];
  }

  // 添加集合的规则
  const handleClickAlertType = (val: string) => {
    const formRules: COMMON_STRATEGY_NOTIFY.IFormRule[] = map(
      alertTypeRuleMap[val],
      (rule: COMMON_STRATEGY_NOTIFY.IDataExpression) => ({
        key: uniqueId(),
        alertIndex: rule.alertIndex.key,
        window: rule.window,
        functions: map(rule.functions, ({ field, ...rest }) => ({
          field: field.key,
          ...rest,
        })),
        isRecover: rule.isRecover,
      }),
    );
    updater.editingRules([...formRules, ...state.editingRules]);
  };

  // 添加单条规则
  const handleAddEditingRule = () => {
    updater.editingRules([
      {
        key: uniqueId(),
        ...allRules[0],
      },
      ...state.editingRules,
    ]);
  };

  // 移除表格编辑中的规则
  const handleRemoveEditingRule = (key: string) => {
    updater.editingRules(filter(state.editingRules, (item) => item.key !== key));
  };

  // 编辑单条规则
  const handleEditEditingRule = (key: string, item: { key: string; value: any }) => {
    const rules = cloneDeep(state.editingRules);
    const rule = find(rules, { key });
    const index = findIndex(rules, { key });

    fill(rules, { key, ...rule, [item.key]: item.value }, index, index + 1);
    updater.editingRules(rules);
  };

  // 添加单条触发条件
  const handleAddTriggerConditions = () => {
    const currentTriggerValues = alertTriggerConditionsContent
      .find((item) => item.key === alertTriggerConditions?.[0]?.key)
      .options.map((item) => ({ key: item, display: item }));

    updater.triggerConditionValueOptions(currentTriggerValues);

    updater.triggerConditions([
      {
        id: uniqueId(),
        condition: alertTriggerConditions[0]?.key,
        operator: alertTypes.operators?.[0]?.key,
        value: currentTriggerValues[0]?.key,
      },
      ...state.triggerConditions,
    ]);
  };

  // 移除表格编辑中的规则
  const handleRemoveTriggerConditions = (id: string) => {
    updater.triggerConditions(filter(state.triggerConditions, (item) => item.id !== id));
  };

  // 编辑单条触发条件
  const handleEditTriggerConditions = (id: string, item: { key: string; value: any }) => {
    const rules = cloneDeep(state.triggerConditions);
    const rule = find(rules, { id });
    const index = findIndex(rules, { id });

    fill(rules, { id, ...rule, [item.key]: item.value }, index, index + 1);
    updater.triggerConditions(rules);
  };

  // 编辑单条规则下的指标
  const handleEditEditingRuleField = (id: string, index: number, item: { key: string; value: any }) => {
    const rules = cloneDeep(state.editingRules);
    const { functions } = find(rules, { id });
    const functionItem = functions[index];

    fill(functions, { ...functionItem, [item.key]: item.value }, index, index + 1);
    handleEditEditingRule(id, { key: 'functions', value: functions });
  };

  const handleDeleteAlarm = (id: number) => {
    confirm({
      title: i18n.t('application:are you sure you want to delete this item?'),
      content: i18n.t('application:the notification will be permanently deleted'),
      onOk() {
        deleteAlert(id);
      },
    });
  };
  // console.log(state.editingFormRule, state.editingRules, { alertTypes }, 6677);
  const handleEditALarm = (id: number) => {
    getAlertDetail(id).then(({ name, clusterNames, appIds, rules, notifies }: any) => {
      updater.editingFormRule({
        id,
        name,
        clusterName: clusterNames || [],
        appId: appIds || [],
        notifies,
        triggerConditions: state.triggerConditions,
      });
      updater.editingRules(map(rules, (rule) => ({ key: uniqueId(), ...rule })));
      updater.activedGroupId(notifies[0].groupId);
      openModal();
    });
  };

  const handleAddAlarm = (param: any) => {
    const { name, clusterName, appId, groupId, groupType, silence, silencePolicy } = param;
    const payload: COMMON_STRATEGY_NOTIFY.IAlertBody = {
      name,
      clusterNames: clusterName,
      appIds: appId,
      domain: location.origin,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      rules: map(state.editingRules, ({ key, ...rest }) => rest),
      notifies: [
        {
          silence: { value: Number(silence.split('-')[0]), unit: silenceMap[silence].key, policy: silencePolicy },
          type: 'notify_group',
          groupId,
          groupType: groupType.join(','),
        },
      ],
      triggerConditons: state.triggerConditions,
    };
    if (!isEmpty(state.editingFormRule)) {
      editAlert({ body: payload, id: state.editingFormRule.id });
    } else {
      createAlert(payload);
    }
    handleCloseModal();
  };

  const beforeSubmit = async (param: any) => {
    if (isEmpty(state.editingRules)) {
      warning({
        title: i18n.t('org:create at least one rule'),
      });
      return null;
    }
    const isLegalFunctions = every(state.editingRules, ({ functions }) => {
      return every(functions, ({ value }) => {
        return !(isNull(value) || value === '');
      });
    });
    if (!isLegalFunctions) {
      warning({
        title: i18n.t('org:rule value cannot be empty'),
      });
      return null;
    }
    return param;
  };

  const handlePageChange = (no: number) => {
    getAlerts({ pageNo: no });
  };

  const handleCloseModal = () => {
    update({
      editingRules: [],
      editingFormRule: {},
      activedGroupId: undefined,
    });
    closeModal();
  };

  const alartListColumns: Array<ColumnProps<COMMON_STRATEGY_NOTIFY.IAlert>> = [
    {
      title: i18n.t('org:alarm name'),
      dataIndex: 'name',
      width: 150,
    },
    ...insertWhen(scopeType === ScopeType.ORG, [
      {
        title: i18n.t('org:cluster'),
        dataIndex: 'clusterNames',
        width: 200,
        render: (clusterNames: string[]) => map(clusterNames, (clusterName) => alarmScopeMap[clusterName]).join(),
      },
    ]),
    ...insertWhen(scopeType === ScopeType.MSP && commonPayload?.projectType !== 'MSP', [
      {
        title: i18n.t('application'),
        dataIndex: 'appIds',
        width: 200,
        render: (appIds: string[]) => map(appIds, (appId) => alarmScopeMap[appId]).join(),
      },
    ]),
    {
      title: i18n.t('default:notification target'),
      dataIndex: ['notifies', '0', 'notifyGroup'],
      width: 400,
      className: 'notify-info',
      ellipsis: true,
      render: (notifyGroup: COMMON_STRATEGY_NOTIFY.INotifyGroup) => {
        const tips = i18n.t('org:Notification group does not exist or has been remove. Please change one.');
        return (
          <div className="flex-div flex">
            {isEmpty(notifyGroup) ? (
              <Tooltip title={tips}>
                <span className="text-sub">{tips}</span>
              </Tooltip>
            ) : (
              <ListTargets targets={notifyGroup.targets} roleMap={roleMap} />
            )}
          </div>
        );
      },
    },
    {
      title: i18n.t('default:create time'),
      dataIndex: 'createTime',
      width: 180,
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: i18n.t('default:operation'),
      dataIndex: 'id',
      width: 150,
      render: (_text, record) => {
        return (
          <div className="table-operations">
            <span className="table-operations-btn" onClick={() => handleEditALarm(record.id)}>
              {i18n.t('application:edit')}
            </span>
            <span
              className="table-operations-btn"
              onClick={() => {
                handleDeleteAlarm(record.id);
              }}
            >
              {i18n.t('application:delete')}
            </span>
            <Switch
              size="small"
              defaultChecked={record.enable}
              onChange={() => {
                toggleAlert({
                  id: record.id,
                  enable: !record.enable,
                }).then(() => {
                  getAlerts({ pageNo });
                });
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="alarm-strategy">
      <div className="top-button-group">
        <Button
          type="primary"
          onClick={() => {
            openModal();
          }}
        >
          {i18n.t('org:new strategy')}
        </Button>
        <FormModal
          loading={getAlertDetailLoading}
          width={1000}
          visible={modalVisible}
          onCancel={handleCloseModal}
          title={isEmpty(state.editingFormRule) ? i18n.t('org:new strategy') : i18n.t('org:edit strategy')}
          fieldsList={fieldsList}
          modalProps={{ destroyOnClose: true, bodyStyle: { height: '70vh', overflow: 'auto' } }}
          onOk={handleAddAlarm}
          beforeSubmit={beforeSubmit}
        />
      </div>
      <Spin spinning={getAlertsLoading || toggleAlertLoading}>
        <Table
          rowKey="id"
          columns={alartListColumns}
          dataSource={alertList}
          pagination={{
            current: pageNo,
            pageSize,
            total,
            onChange: handlePageChange,
          }}
          scroll={{ x: '100%' }}
        />
      </Spin>
    </div>
  );
};
