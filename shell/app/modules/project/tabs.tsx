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
import permStore from 'user/stores/permission';
import { firstCharToUpper } from 'app/common/utils';
import { HIDDEN_MILESTONE } from 'common/constants';
import IterationSelector from 'project/common/components/iteration-selector';
import RuntimeSelector from 'project/common/components/runtime-selector';

export const ITERATION_DETAIL_TABS = (params: Obj) => {
  const { breadcrumbInfoMap } = params;
  const iterationName = breadcrumbInfoMap?.iterationName;
  const projectPerm = permStore.useStore((s) => s.project);
  return [
    {
      key: '_',
      name: <IterationSelector iterationName={iterationName} />,
      readonly: true,
      className: 'cursor-default',
    },
    {
      key: 'all',
      name: i18n.t('dop:Issue-list'),
      split: true,
      show: [projectPerm.requirement.read.pass, projectPerm.task.read.pass, projectPerm.bug.read.pass].some((k) => k),
    },
    {
      key: 'gantt',
      name: i18n.t('dop:Gantt Chart'),
    },
    {
      key: 'board',
      name: i18n.t('dop:Board'),
    },
    {
      key: 'statistics',
      name: i18n.t('dop:Statistics'),
    },
  ];
};

export const DEPLOY_TABS = (params: Obj) => {
  return [
    {
      key: 'list/dev',
      name: firstCharToUpper(i18n.t('Deployment')),
      isActive: (activeKey: string) => activeKey.split('/')[0] === 'list',
    },
    {
      key: 'config/default',
      name: firstCharToUpper(i18n.t('Configuration')),
      isActive: (activeKey: string) => activeKey.split('/')[0] === 'config',
    },
    {
      key: 'addon',
      name: 'Addons',
      isActive: (activeKey: string) => activeKey === 'addon',
    },
  ];
};

export const DEPLOY_RUNTIME_TABS = (params: Obj) => {
  const { breadcrumbInfoMap } = params;
  const { appName, runtimeName } = breadcrumbInfoMap;
  return [
    {
      key: '_',
      readonly: true,
      name: <RuntimeSelector runtimeName={appName === runtimeName ? runtimeName : `${appName}/${runtimeName}`} />,
      isLetterUpper: false,
    },
  ];
};

export const COLLABORATE_TABS = () => {
  const projectPerm = permStore.useStore((s) => s.project);

  return [
    ...(HIDDEN_MILESTONE
      ? []
      : [
          {
            key: 'milestone',
            name: i18n.t('dop:Milestone'),
            show: projectPerm.epic.read.pass,
          },
        ]),
    {
      key: 'backlog',
      name: i18n.t('dop:Backlog'),
      show: projectPerm.backLog.viewBackLog.pass,
    },

    {
      key: 'iteration',
      name: i18n.t('dop:Iteration'),
      show: projectPerm.iteration.read.pass,
    },
    {
      key: 'all',
      name: i18n.t('dop:Issue-list'),
      show: [projectPerm.requirement.read.pass, projectPerm.task.read.pass, projectPerm.bug.read.pass].some((k) => k),
    },
    {
      key: 'gantt',
      name: i18n.t('dop:Gantt Chart'),
      show: projectPerm.requirement.read.pass,
    },
    {
      key: 'board',
      name: i18n.t('dop:Board'),
      show: projectPerm.requirement.read.pass,
    },
    {
      key: 'measure',
      name: i18n.t('dop:Statistics'),
      show: projectPerm.requirement.read.pass,
    },
  ];
};

export const MEASURE_TABS = [
  {
    key: 'task',
    name: i18n.t('Requirement & Task'),
  },
  {
    key: 'bug',
    name: i18n.t('Bug'),
  },
];

export const MANUAL_TEST_TABS = [
  {
    key: 'testCase',
    name: i18n.t('dop:Test Case'),
  },
  {
    key: 'testPlan',
    name: i18n.t('dop:Plan'),
  },
  {
    key: 'testEnv',
    name: i18n.t('dop:Parameter Configuration'),
  },
];

export const TEST_STATISTICS_TABS = [
  {
    key: 'test-dashboard',
    name: i18n.t('dop:Test Statistics'),
  },
  {
    key: 'code-coverage',
    name: i18n.t('dop:Code Coverage Statistics'),
  },
];

export const AUTO_TEST_TABS = [
  {
    key: 'testCase',
    name: i18n.t('dop:Test Case'),
  },
  {
    key: 'config-sheet',
    name: i18n.t('Configuration Sheet'),
  },
  {
    key: 'testPlan',
    name: i18n.t('dop:Plan'),
  },
  {
    key: 'data-source',
    name: i18n.t('dop:Data Source'),
  },

  {
    key: 'testEnv',
    name: i18n.t('dop:Parameter Configuration'),
  },
];

export const RELEASE_TABS = [
  {
    key: 'application',
    name: i18n.t('dop:App Artifacts'),
  },
  {
    key: 'project',
    name: i18n.t('dop:Project Artifacts'),
  },
];

export const PIPELINE_TABS = [
  {
    key: 'list',
    name: i18n.t('Pipelines'),
  },
  {
    key: 'records',
    name: i18n.t('dop:Execution Records'),
  },
  {
    key: 'config/default',
    name: firstCharToUpper(i18n.t('Configuration')),
    isActive: (activeKey: string) => activeKey.split('/')[0] === 'config',
  },
];
