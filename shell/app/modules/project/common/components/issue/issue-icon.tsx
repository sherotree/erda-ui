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
import { Select } from 'antd';
import { map } from 'lodash';
import { ISSUE_OPTION, ISSUE_PRIORITY_MAP, ISSUE_TYPE_MAP } from 'project/common/components/issue/issue-config';
import i18n from 'i18n';
import './issue-icon.scss';

export enum ISSUE_TYPE {
  ALL = 'ALL',
  EPIC = 'EPIC',
  REQUIREMENT = 'REQUIREMENT',
  TASK = 'TASK',
  BUG = 'BUG',
  TICKET = 'TICKET',
}

export enum ISSUE_PRIORITY {
  URGENT = 'URGENT',
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
  LOW = 'LOW',
}
interface IProps {
  type: ISSUE_TYPE | ISSUE_PRIORITY | ISSUE.Issue['type'];
  iconMap?: 'TYPE' | 'PRIORITY';
  withName?: boolean;
  size?: string | number;
  className?: string;
}

const { Option } = Select;

export const ISSUE_TYPE_ICON_MAP = {
  EPIC: {
    icon: 'bb1',
    color: 'primary',
    value: 'EPIC',
    name: i18n.t('dop:Milestone'),
  },
  ITERATION: {
    icon: 'bb1',
    color: 'primary',
    value: 'ITERATION',
    name: i18n.t('dop:iteration'),
  },
  REQUIREMENT: {
    icon: ISSUE_TYPE_MAP.REQUIREMENT.icon,
    color: 'palegreen',
    name: i18n.t('Requirement'),
    value: 'REQUIREMENT',
  },
  TASK: {
    icon: ISSUE_TYPE_MAP.TASK.icon,
    color: 'darkcyan',
    name: i18n.t('Task'),
    value: 'TASK',
  },
  BUG: {
    icon: ISSUE_TYPE_MAP.BUG.icon,
    color: 'red',
    name: i18n.t('Bug'),
    value: 'BUG',
  },
};

export const ISSUE_PRIORITY_ICON_MAP = {
  URGENT: {
    icon: ISSUE_PRIORITY_MAP.URGENT.icon,
    color: 'red',
    value: 'URGENT',
    name: i18n.t('dop:Urgent'),
  },
  HIGH: {
    icon: ISSUE_PRIORITY_MAP.HIGH.icon,
    color: 'yellow',
    value: 'HIGH',
    name: i18n.t('dop:High'),
  },
  NORMAL: {
    icon: ISSUE_PRIORITY_MAP.NORMAL.icon,
    color: 'blue',
    name: i18n.t('Medium'),
    value: 'NORMAL',
  },
  LOW: {
    icon: ISSUE_PRIORITY_MAP.LOW.icon,
    color: 'palegreen',
    name: i18n.t('Low'),
    value: 'LOW',
  },
};

const ICON_MAP = {
  TYPE: ISSUE_TYPE_MAP,
  PRIORITY: ISSUE_PRIORITY_MAP,
};

export const IssueIcon = ({ type, iconMap = 'TYPE', withName = false, ...rest }: IProps) => {
  const iconObj = type && ICON_MAP[iconMap][type.toLocaleUpperCase()];
  if (!iconObj) return null;
  const { iconLabel, icon } = iconObj || {};
  return withName ? iconLabel : React.cloneElement(icon || <></>, rest);
};

export const getIssueTypeOption = () =>
  map(ISSUE_OPTION, (item) => {
    const iconObj = ISSUE_TYPE_MAP[item];
    const { value } = iconObj;
    return (
      <Option key={value} value={value} data-icon={<div className="flex items-center h-full">{iconObj.iconLabel}</div>}>
        <IssueIcon type={item} withName />
      </Option>
    );
  });
