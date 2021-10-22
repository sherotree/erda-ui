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
import moment from 'moment';
import i18n from 'i18n';
import { head, isEmpty, map, take } from 'lodash';
import { Button, message, Modal, Select, Spin, Table, Tooltip, Switch } from 'core/nusi';
import { Avatar, ErdaCustomIcon, FormModal, MemberSelector } from 'common';
import { useUpdate } from 'common/use-hooks';
import { ColumnProps, FormInstance } from 'core/common/interface';
import { useMount, useUnmount } from 'react-use';
import { useUserMap } from 'core/stores/userMap';
import { useLoading } from 'core/stores/loading';
import notifyGroupStore from 'application/stores/notify-group';
import agent from 'agent';

const { confirm } = Modal;

enum TargetType {
  USER = 'user',
  EXTERNAL_USER = 'external_user',
  DINGDING = 'dingding',
  WEBHOOK = 'webhook',
  ROLE = 'role',
}

export const notifyChannelOptionsMap = {
  [TargetType.DINGDING]: [{ name: i18n.t('DingTalk'), value: 'dingding' }],
  [TargetType.USER]: [
    { name: i18n.t('application:email'), value: 'email' },
    { name: i18n.t('site message'), value: 'mbox' },
  ],
  [TargetType.EXTERNAL_USER]: [{ name: i18n.t('application:email'), value: 'email' }],
  [TargetType.WEBHOOK]: [{ name: i18n.t('application:webhook'), value: 'webhook' }],
  [TargetType.ROLE]: [
    { name: i18n.t('application:email'), value: 'email' },
    { name: i18n.t('site message'), value: 'mbox' },
  ],
};

// 当群组为成员或外部成员时，通知方式包含 电话/短信
export const smsNotifyChannelOptionsMap = Object.assign({}, notifyChannelOptionsMap, {
  [TargetType.USER]: [
    { name: i18n.t('application:email'), value: 'email' },
    { name: i18n.t('site message'), value: 'mbox' },
    { name: i18n.t('SMS'), value: 'sms' },
    { name: i18n.t('phone'), value: 'vms' },
  ],
  [TargetType.EXTERNAL_USER]: [
    { name: i18n.t('application:email'), value: 'email' },
    { name: i18n.t('SMS'), value: 'sms' },
    { name: i18n.t('phone'), value: 'vms' },
  ],
});

const groupTargetMap = {
  user: i18n.t('application:member'),
  dingding: i18n.t('application:DingTalk address'),
  webhook: i18n.t('application:external api'),
  external_user: i18n.t('application:external user'),
  role: i18n.t('member role'),
};

const data = {
  data: [
    {
      channelProviderType: {
        displayName: 'Example',
        name: 'Example',
      },
      config: {},
      createAt: 'Example',
      creatorName: 'Example',
      enable: true,
      id: 'Example',
      name: 'Example',
      scopeId: 'Example',
      scopeType: 'Example',
      type: {
        displayName: 'Example',
        name: 'Example',
      },
      updateAt: 'Example',
    },
  ],
  page: 1,
  pageSize: 1,
  total: 1,
};
interface IProps {
  commonPayload: {
    scopeType: string;
    scopeId: string;
    projectId?: string;
  };
  memberStore: any;
}

const NotifyChannel = ({ memberStore, commonPayload }: IProps) => {
  const notifyGroups = notifyGroupStore.useStore((s) => s.notifyGroups);
  const userMap = useUserMap();
  const formRef = React.useRef<FormInstance>(null);
  const paging = notifyGroupStore.useStore((s) => s.paging);
  const roleMap = memberStore.useStore((s) => s.roleMap);
  const { getRoleMap } = memberStore.effects;

  const { getNotifyGroups, deleteNotifyGroups, createNotifyGroups, updateNotifyGroups } = notifyGroupStore.effects;
  const { clearNotifyGroups } = notifyGroupStore.reducers;
  const [loading] = useLoading(notifyGroupStore, ['getNotifyGroups']);
  const [visible, setIsVisible] = React.useState(false);
  const [{ activedData, groupType }, updater, update] = useUpdate({
    activedData: {},
    groupType: '',
  });
  const isEditing = !isEmpty(activedData);

  const isInMsp = commonPayload.scopeType.includes('msp');

  const memberSelectProps = isInMsp
    ? {
        ...commonPayload,
        scopeType: 'msp',
      }
    : commonPayload;

  const scope = isInMsp ? 'msp' : commonPayload.scopeType;

  useMount(() => {
    handleGetNotifyGroups();
    getRoleMap({
      scopeType: scope,
      scopeId: commonPayload.scopeId,
    });
  });

  useUnmount(() => {
    clearNotifyGroups();
  });

  const handleGetNotifyGroups = (payload?: COMMON_NOTIFY.IGetNotifyGroupQuery) => {
    getNotifyGroups({ ...commonPayload, ...payload });
  };

  const handleEdit = ({ name, targets, id }: COMMON_NOTIFY.INotifyGroup) => {
    setIsVisible(true);
    const { type, values } = targets[0];
    let _targets;
    switch (type) {
      case TargetType.USER:
      case TargetType.EXTERNAL_USER:
      case TargetType.ROLE:
        _targets = map(values, (v) => v.receiver);
        break;
      case TargetType.WEBHOOK:
        _targets = values[0]?.receiver;
        break;
      default:
        _targets = values[0];
        break;
    }
    update({
      groupType: type,
      activedData: {
        id,
        name,
        targetType: type,
        targets: _targets,
      },
    });
  };

  const handleDele = (id: number) => {
    confirm({
      title: i18n.t('application:are you sure you want to delete this item?'),
      content: i18n.t('application:the notification group will be permanently deleted'),
      onOk() {
        deleteNotifyGroups(id).then(() => {
          handleGetNotifyGroups();
        });
      },
    });
  };

  const handleSubmit = (values: any, id?: number) => {
    const { name, targetType, targets } = values;
    let _values = [];
    switch (targetType) {
      case TargetType.USER:
        _values = targets.filter((item: string) => !!item).map((t: string) => ({ receiver: t }));
        break;
      case TargetType.ROLE:
      case TargetType.EXTERNAL_USER:
        _values = targets.map((t: string) => ({ receiver: t }));
        break;
      case TargetType.WEBHOOK:
        _values = [{ receiver: targets }];
        break;
      case TargetType.DINGDING:
        _values = [targets];
        break;
      default:
        break;
    }
    if (isEditing) {
      updateNotifyGroups({
        id,
        name,
        targets: [
          {
            type: targetType,
            values: _values,
          },
        ],
      }).then(() => {
        handleCancel();
        handleGetNotifyGroups();
      });
      return;
    }
    createNotifyGroups({
      ...commonPayload,
      name,
      targets: [
        {
          type: targetType,
          values: _values,
        },
      ],
    }).then(() => {
      handleCancel();
      handleGetNotifyGroups();
    });
  };

  const handleCancel = () => {
    update({
      groupType: '',
      activedData: {},
    });
    setIsVisible(false);
  };

  const fieldsList = [
    {
      name: 'name',
      label: i18n.d('渠道名称'),
      required: true,
      itemProps: {
        disabled: isEditing,
        maxLength: 50,
      },
    },
    {
      name: 'type',
      label: i18n.d('渠道类型'),
      required: true,
      getComp: ({ form }: { form: FormInstance }) => {
        return (
          <Select
            defaultValue={groupType}
            onSelect={(value: any) => {
              updater.groupType(value);
              form.setFieldsValue({ targets: undefined });
            }}
          >
            {map(groupTargetMap, (name, value) => (
              <Select.Option value={value} key="value">
                {name}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      name: 'type',
      label: i18n.d('服务商'),
      required: true,
      getComp: ({ form }: { form: FormInstance }) => {
        return (
          <Select
            defaultValue={groupType}
            onSelect={(value: any) => {
              updater.groupType(value);
              form.setFieldsValue({ targets: undefined });
            }}
          >
            {map(groupTargetMap, (name, value) => (
              <Select.Option value={value} key="value">
                {name}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      name: 'accessKey',
      label: 'AccessKey',
      required: true,
      itemProps: {
        disabled: isEditing,
        maxLength: 50,
      },
    },
    {
      name: 'accessKeySecret',
      label: 'AccessKeySecret',
      required: true,
      itemProps: {
        disabled: isEditing,
        maxLength: 50,
      },
    },
    {
      name: 'accessKeySecret',
      label: '短信签名',
      required: true,
      itemProps: {
        disabled: isEditing,
        maxLength: 50,
      },
    },
    {
      name: 'accessKeySecret',
      label: '短信模板',
      required: true,
      itemProps: {
        disabled: isEditing,
        maxLength: 50,
      },
    },
  ] as any[];

  let targetField;
  const extraFields: any[] = [];
  const testDingTalk = () => {
    const values = formRef.current?.getFieldsValue();
    const { secret, receiver } = values.targets;
    if (!secret || !receiver) {
      message.warn(i18n.t('common:please complete Dingding address and signature'));
      return;
    }
    return agent
      .post('/api/admin/notify/dingtalk-test')
      .send({
        secret,
        webhook: receiver,
      })
      .then((response: any) => {
        if (response.body.data.success) {
          message.success(i18n.t('common:sent successfully, please check the test information in the group'));
        } else {
          message.warn(i18n.t('common:sending failed, please check the configuration information'));
        }
      });
  };

  switch (groupType) {
    case TargetType.USER:
      targetField = {
        name: 'targets',
        label: groupTargetMap[groupType],
        required: true,
        getComp: () => {
          return <MemberSelector {...memberSelectProps} mode="multiple" type="Category" />;
        },
      };
      break;
    case TargetType.DINGDING:
      targetField = {
        name: ['targets', 'receiver'],
        label: groupTargetMap[groupType],
        type: 'textArea',
        required: true,
        itemProps: {
          maxLength: 200,
        },
      };
      extraFields.push({
        name: ['targets', 'secret'],
        label: i18n.t('application:signature'),
        type: 'textArea',
        required: true,
        itemProps: {
          maxLength: 200,
        },
        suffix: (
          <span className="notify-test-dingtalk" onClick={() => testDingTalk()}>
            {i18n.t('common:send test notification')}
          </span>
        ),
      });
      break;
    case TargetType.WEBHOOK:
      targetField = {
        name: 'targets',
        label: groupTargetMap[groupType],
        type: 'textArea',
        required: true,
        itemProps: {
          maxLength: 200,
        },
      };
      break;
    case TargetType.ROLE:
      targetField = {
        name: 'targets',
        label: groupTargetMap[groupType],
        required: true,
        type: 'select',
        options: map(roleMap, (name, value) => ({ value, name })),
        itemProps: {
          mode: 'multiple',
        },
      };
      break;
    default:
      break;
  }

  groupType && fieldsList.push(targetField);
  fieldsList.push(...extraFields);

  const columns: Array<ColumnProps<COMMON_NOTIFY.INotifyGroup>> = [
    {
      title: i18n.d('渠道名称'),
      dataIndex: 'name',
      width: 200,
    },
    {
      title: i18n.d('渠道类型'),
      width: 160,
      dataIndex: 'type',
      className: 'notify-info',
      ellipsis: true,
      // render: (type) => type.displayName,
    },
    {
      title: i18n.d('服务商'),
      dataIndex: 'channelProviderType',
      width: 200,
      // render: (provider) => provider.displayName,
    },
    {
      title: i18n.t('default:creator'),
      dataIndex: 'creatorName',
      width: 160,
      render: (text) => userMap[text]?.nick,
    },
    {
      title: i18n.t('default:create time'),
      dataIndex: 'createdAt',
      width: 176,
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: i18n.t('default:operation'),
      dataIndex: 'id',
      width: 160,
      fixed: 'right',
      render: (id: number, record) => {
        return (
          <div className="table-operations">
            <span className="table-operations-btn" onClick={() => handleEdit(record)}>
              {i18n.t('application:edit')}
            </span>
            <span
              className="table-operations-btn"
              onClick={() => {
                handleDele(id);
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
    <div className="notify-group-manage">
      <Tooltip title={i18n.t('application:new Group')}>
        <div
          className="notify-group-action hover-active"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          <Button type="primary">{i18n.d('新建通知渠道')}</Button>
        </div>
      </Tooltip>
      <FormModal
        width={800}
        ref={formRef}
        title={`${isEditing ? i18n.t('application:edit group') : i18n.t('application:new Group')}`}
        visible={visible}
        fieldsList={fieldsList}
        formData={activedData}
        onOk={(values: any) => {
          handleSubmit(values, isEditing && activedData.id);
        }}
        onCancel={handleCancel}
        modalProps={{ destroyOnClose: true }}
      />
      <Spin spinning={loading}>
        <Table rowKey="id" dataSource={notifyGroups} columns={columns} pagination={false} scroll={{ x: 800 }} />
      </Spin>
    </div>
  );
};

export default NotifyChannel;
