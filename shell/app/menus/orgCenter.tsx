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

import i18n from 'i18n';
import { filterMenu, MENU_SCOPE } from './util';
import { goTo } from 'common/utils';
import permStore from 'user/stores/permission';
import React from 'react';
import ErdaIcon from 'common/components/erda-icon';
import { filter } from 'lodash';

// 应用中心菜单
export const getOrgCenterMenu = () => {
  const orgPerm = permStore.getState((s) => s.org);
  return filterMenu(
    filter(
      [
        {
          key: 'orgProjects',
          href: goTo.resolve.orgCenterRoot(), // '/orgCenter/projects',
          icon: <ErdaIcon type="xiangmuguanli" />,
          text: i18n.t('projects'),
          subtitle: i18n.t('Project'),
          show: orgPerm.orgCenter.viewProjects.pass,
        },
        {
          key: 'orgMarket',
          href: goTo.resolve.orgCenterPublisherSetting(),
          icon: <ErdaIcon type="yidongkaifa" />,
          text: i18n.t('layout:mobile development management'),
          subtitle: i18n.t('Mobile'),
          prefix: goTo.resolve.orgCenterMarket(),
          show: orgPerm.orgCenter.viewMarket.pass,
        },
        {
          key: 'orgApproval',
          href: goTo.resolve.orgCenterApproval(),
          icon: <ErdaIcon type="shenpi" />,
          text: i18n.t('layout:Approval'),
          subtitle: i18n.t('Approve'),
          show: orgPerm.orgCenter.viewApproval.pass,
        },
        {
          key: 'orgSafety',
          href: goTo.resolve.orgCenterSafety(), // '/orgCenter/safety',
          icon: <ErdaIcon type="shenjirizhi" />,
          text: i18n.t('cmp:Audit Log'),
          subtitle: i18n.t('Audit'),
          show: orgPerm.orgCenter.viewAuditLog.pass,
        },
        {
          key: 'orgSetting',
          href: goTo.resolve.cmpSetting(), // '/orgCenter/setting/detail',
          icon: <ErdaIcon type="zuzhi" />,
          text: i18n.t('Settings-org'),
          subtitle: i18n.t('Org'),
          show: orgPerm.orgCenter.viewSetting.pass,
        },
      ],
      (item) => item.show !== false,
    ),
    MENU_SCOPE.orgCenter,
  );
};
