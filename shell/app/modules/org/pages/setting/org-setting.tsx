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
import { ConfigLayout, MembersTable, SettingTabs } from 'common';
import { firstCharToUpper, goTo, insertWhen } from 'common/utils';
import orgStore from 'app/org-home/stores/org';
import NotifyGroup from 'application/pages/settings/components/app-notify/common-notify-group';
import memberStore from 'common/stores/org-member';
import BlockNetwork from 'org/pages/setting/block-network';
import { OrgInfo } from './org-info';
import NotifyChannel from './notice-channel';
import { OperationLogSetting } from './operation-log-setting';
import { MemberScope } from 'common/stores/member-scope';
import { MemberLabels } from './member-label';
import IssueFieldManage from '../projects/issue-field-manage';
import IssueTypeManage from '../projects/issue-type-manage';
import Announcement from 'org/pages/announcement';
import permStore from 'user/stores/permission';

import './org-setting.scss';
import { replaceWithLink } from 'app/common/utils';

export const OrgSetting = () => {
  const orgId = orgStore.getState((s) => s.currentOrg.id);
  const orgPerm = permStore.getState((s) => s.org);

  const dataSource = [
    {
      groupTitle: i18n.t('dop:General Settings'),
      groupKey: 'common',
      tabGroup: [
        {
          tabTitle: i18n.t('cmp:Organization Information'),
          tabKey: 'orgInfo',
          content: <OrgInfo />,
        },
        {
          tabTitle: i18n.t('cmp:Organization Member'),
          tabKey: 'orgMember',
          content: (
            <ConfigLayout
              sectionList={[
                {
                  title: firstCharToUpper(i18n.t('{name} member management', { name: i18n.t('organization') })),
                  desc: (
                    <div>
                      {replaceWithLink(
                        i18n.t('Edit members and set member roles. See Role Permission Description for details.'),
                        goTo.resolve.perm({ scope: 'app' }),
                      )}
                    </div>
                  ),
                  children: <MembersTable scopeKey={MemberScope.ORG} />,
                },
              ]}
            />
          ),
        },
        {
          tabTitle: i18n.t('member label'),
          tabKey: 'memberLabel',
          content: (
            <ConfigLayout
              sectionList={[
                {
                  title: i18n.t('cmp:Organization member label'),
                  children: <MemberLabels />,
                },
              ]}
            />
          ),
        },
        ...insertWhen(orgPerm.orgCenter.viewAnnouncement.pass, [
          {
            tabTitle: i18n.t('cmp:Announcement Management'),
            tabKey: 'announcement',
            content: <Announcement />,
          },
        ]),
      ],
    },
    {
      groupTitle: i18n.t('project'),
      groupKey: 'project',
      tabGroup: [
        {
          tabTitle: i18n.t('dop:Issue Type'),
          tabKey: 'issueType',
          content: <IssueTypeManage />,
        },
        {
          tabTitle: i18n.t('dop:Custom Issue Field'),
          tabKey: 'issueField',
          content: <IssueFieldManage />,
        },
      ],
    },
    {
      groupTitle: i18n.t('Deployment'),
      groupKey: 'deploy',
      tabGroup: [
        {
          tabTitle: i18n.t('cmp:Network Bolcking'),
          tabKey: 'block-network',
          content: (
            <ConfigLayout
              sectionList={[
                {
                  title: i18n.t('cmp:Network Bolcking'),
                  desc: i18n.t(
                    'cmp:Once the network blocking is enabled for an environment, all apps in this environment require the approval of the organization admin for deployment and release.',
                  ),
                  children: <BlockNetwork />,
                },
              ]}
            />
          ),
        },
      ],
    },
    {
      groupTitle: i18n.t('log'),
      groupKey: 'log',
      tabGroup: [
        {
          tabTitle: i18n.t('cmp:Audit Log'),
          tabKey: 'operation log',
          content: (
            <ConfigLayout
              sectionList={[
                {
                  title: i18n.t('cmp:Audit Log'),
                  desc: i18n.t('cmp:Clean up at 3am every day'),
                  children: <OperationLogSetting />,
                },
              ]}
            />
          ),
        },
      ],
    },
    {
      groupTitle: i18n.t('dop:Notification Management'),
      groupKey: 'notification',
      tabGroup: [
        {
          tabTitle: i18n.t('dop:Notification Group'),
          tabKey: 'notifyGroup',
          content: (
            <ConfigLayout
              sectionList={[
                {
                  title: i18n.t('dop:Set notification groups for notifications'),
                  children: (
                    <NotifyGroup memberStore={memberStore} commonPayload={{ scopeType: 'org', scopeId: `${orgId}` }} />
                  ),
                },
              ]}
            />
          ),
        },
        {
          tabTitle: i18n.t('notification channel'),
          tabKey: 'notifyChannel',
          content: (
            <ConfigLayout
              sectionList={[
                {
                  title: i18n.t('Add a notification channel to set notifications'),
                  desc: (
                    <div className="w-2/3 h-10">
                      {i18n.t(
                        'Only one channel of the same type can be enabled. Enabled channels will be used to send notification messages of the corresponding type.',
                      )}
                    </div>
                  ),
                  children: <NotifyChannel />,
                },
              ]}
            />
          ),
        },
      ],
    },
  ];

  return <SettingTabs className="org-settings-main" dataSource={dataSource} />;
};
