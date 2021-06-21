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
import DiceConfigPage from 'app/config-page';
import routeInfoStore from 'common/stores/route';
import { cloneDeep } from 'app/external/custom-lodash';

interface IProps {
  scopeType: string;
}

const NotifyConfigProtocol = ({scopeType}: IProps) => {
  const [{ appId, projectId }] = routeInfoStore.useStore(s => [s.params]);
  const scopeId = scopeType === 'app' ? appId : projectId;
  return (
    <div>
      <DiceConfigPage
        showLoading
        scenarioKey='notify-config'
        scenarioType='notify-config'
        inParams={{scopeType,scopeId}}
        useMock={location.search.includes('useMock') ? useMock : undefined}
        // useMock={useMock}
      />
    </div>
  );
};

const useMock = (payload: Record<string, any>) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(getMock(payload));
  }, 100);
});

const getMock = (payload?: Record<string, any>) => {
  console.clear();
  console.log('request', payload);
  const temp = cloneDeep(mock);
  return temp;
};

const mock: CONFIG_PAGE.RenderConfig = {
  scenario: {
    scenarioKey: 'notify-config',
    scenarioType: 'notify-config',
  },
  protocol: {
    hierarchy: {
      root: 'notifyConfig',
      structure: {
        notifyConfig: ['notifyHead', 'notifyTable', 'notifyFormModal'],
        notifyHead: { left: 'notifyTitle', right: 'notifyAddButton' },
      },
    },
    components: {
      notifyConfig: { type: 'Container' },
      notifyHead: { type: 'LRContainer' },
      notifyTitle: {
        type: 'Title',
        props: {
          title: '帮助您更好地组织通知项',
        },
      },
      notifyTable: {
        type: 'Table',
        props: {
          rowKey: 'id',
          columns: [
            { title: '通知名称', dataIndex: 'name' },
            { title: '通知对象', dataIndex: 'targets', width: 200 },
            { title: '创建时间', dataIndex: 'createdAt' },
            { title: '操作', dataIndex: 'operate', width: 150 },
          ],
          pagination: false,
        },
        data: {
          list: [{
            id: 1,
            name: '通知测试1',
            targets: {
              value: [
                {
                  type: 'external_user',
                  values: [
                    {
                      receiver: '{"username":"李四","email":"123451@163.com","mobile":"17777777778"}',
                      secret: '',
                    },
                    {
                      receiver: '{"username":"张三","email":"12345@163.com","mobile":"17777777777"}',
                      secret: '',
                    },
                  ],
                },
              ],
              roleMap: {
                Owner: '应用所有者',
                Lead: '应用主管',
                Ops: '运维',
                Dev: '开发工程师',
                QA: '测试工程师',
              },
              renderType: 'listTargets',
            },
            createdAt: '2021-02-02 13:48:30',
            operate: {
              renderType: 'tableOperation',
              value: '',
              operations: {
                edit: {
                  key: 'edit',
                  text: '编辑',
                  reload: true,
                  meta: { id: 1 },
                },
                delete: {
                  key: 'delete',
                  text: '删除',
                  confirm: '确认删除该条通知？',
                  meta: { id: 1 },
                  reload: true,
                },
                switch: {
                  key: 'switch',
                  text: '开启',
                  meta: { id: 1 },
                  reload: true,
                },
              },
            },
          }, {
            id: 3,
            name: '通知测试3',
            targets: {
              value: [
                {
                  type: 'external_user',
                  values: [
                    {
                      receiver: '{"username":"王五","email":"123451@163.com","mobile":"17777777778"}',
                      secret: '',
                    },
                    {
                      receiver: '{"username":"赵六","email":"123456@163.com","mobile":"17788877777"}',
                      secret: '',
                    },
                    {
                      receiver: '{"username":"林七","email":"123896@163.com","mobile":"177334444777"}',
                      secret: '',
                    },
                    {
                      receiver: '{"username":"林七","email":"123896@163.com","mobile":"177334444777"}',
                      secret: '',
                    },
                  ],
                },
              ],
              roleMap: {
                Owner: '应用所有者',
                Lead: '应用主管',
                Ops: '运维',
                Dev: '开发工程师',
                QA: '测试工程师',
              },
              renderType: 'listTargets',
            },
            createdAt: '2021-02-02 13:48:30',
            operate: {
              renderType: 'tableOperation',
              value: '',
              operations: {
                edit: {
                  key: 'edit',
                  text: '编辑',
                  reload: true,
                  meta: { id: 3 },
                },
                delete: {
                  key: 'delete',
                  text: '删除',
                  confirm: '确认删除该条通知？',
                  meta: { id: 3 },
                  reload: true,
                },
                switch: {
                  key: 'switch',
                  text: '开启',
                  meta: { id: 3 },
                  reload: true,
                },
              },
            },
          }],
        },
      },
      notifyFormModal: {
        type: 'FormModal',
        operations: {
          submit: {
            key: 'submit',
            reload: true,
          },
        },
        props: {
          name: '通知',
          fields: [
            {
              key: 'name',
              label: '通知名称',
              component: 'input',
              required: true,
              componentProps: {
                maxLength: 50,
              },
              // 判断为编辑时，传入 diasabled: true, 新建时可不传
              // disabled: true,
            },
            {
              key: 'items',
              label: '触发时机',
              component: 'select',
              required: true,
              componentProps: {
                mode: 'multiple',
                placeholder: '请选择触发时机',
                // 所有选项
                options: [
                  { name: '合并请求', value: '1' },
                  { name: '评论', value: '2' },
                ],
              },
            },
            {
              key: 'target',
              label: '选择群组',
              component: 'select',
              required: true,
              componentProps: {
                placeholder: '请选择群组',
                options: [
                  { name: 'Dice 前端小组', value: 'group1' },
                  { name: '测试', value: 'group2' },
                  { name: '管理员sasa', value: 'group3' }],
              },
            },
            {
              key: 'channels-group1',
              label: '通知方式',
              component: 'select',
              required: true,
              componentProps: {
                mode: 'multiple',
                placeholder: '请选择通知方式',
                // 所有选项
                options: [
                  { name: '钉钉', value: 'dindin' },
                  { name: 'email', value: 'email' },
                ],
              },
              removeWhen: [
                [
                  {
                    field: 'target',
                    operator: '!=',
                    value: 'group1',
                  },
                ],
              ],
            },
            {
              key: 'channels-group2',
              label: '通知方式',
              component: 'select',
              required: true,
              componentProps: {
                mode: 'multiple',
                placeholder: '请选择通知方式',
                // 所有选项
                options: [
                  { name: '钉钉', value: 'dindin' },
                  { name: 'webhook', value: 'webhook' },
                ],
              },
              removeWhen: [
                [
                  {
                    field: 'target',
                    operator: '!=',
                    value: 'group2',
                  },
                ],
              ],
            },
            {
              key: 'channels-group3',
              label: '通知方式',
              component: 'select',
              required: true,
              componentProps: {
                mode: 'multiple',
                placeholder: '请选择通知方式',
                // 所有选项
                options: [
                  { name: '钉钉', value: 'dindin' },
                  { name: 'webhook', value: 'webhook' },
                ],
              },
              removeWhen: [
                [
                  {
                    field: 'target',
                    operator: '!=',
                    value: 'group3',
                  },
                ],
              ],
            },
          ],
        },
        state: {
          visible: false,
          formData: undefined,
        },
      },
      notifyAddButton: {
        type: 'Button',
        operations: {
          click: {
            key: '',
            reload: false,
            command: {
              key: 'set',
              state:
              {
                visible: true,
                formData: undefined,
              },
              target: 'notifyFormModal',
            },
          },
        },
        props: {
          text: '新建通知',
          type: 'primary',
        },
      },
    },
  },
};

export default NotifyConfigProtocol;
