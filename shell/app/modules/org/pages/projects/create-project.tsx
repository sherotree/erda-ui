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

import { Badge, Button, Checkbox, Input, message, FormInstance } from 'antd';
import i18n from 'i18n';
import React from 'react';
import { ErdaIcon, ImageUpload, RenderForm } from 'common';
import projectStore from 'app/modules/project/stores/project';
import clusterStore from 'cmp/stores/cluster';
import { createTenantProject } from 'msp/services';
import { goTo, insertWhen, convertToFormData, firstCharToUpper } from 'common/utils';
import orgStore from 'app/org-home/stores/org';
import classnames from 'classnames';
import pinyin from 'tiny-pinyin';
import ClusterQuota, { IData } from 'org/common/cluster-quota';
import './create-project.scss';
import { ImportProjectTemplate } from './import-project-template';
import { importProjectTemplate } from 'org/services/project-list';

interface ICardProps {
  name: string;
  val: PROJECT.ProjectType;
  icon: string;
  description: string;
  disabled?: boolean;
}

export const useQuotaFields = (
  canEdit: boolean,
  showTip: boolean,
  canGetClusterListAndResources = true,
  data: PROJECT.Detail,
) => {
  const { getLeftResources } = projectStore.effects;
  const { clearLeftResources } = projectStore.reducers;

  React.useEffect(() => {
    if (canGetClusterListAndResources) {
      clusterStore.effects.getClusterList();
      getLeftResources();
    }
    return () => {
      clearLeftResources();
    };
  }, [canGetClusterListAndResources, clearLeftResources, getLeftResources]);

  const { resourceConfig = {} } = data || {};

  const fields = [
    {
      label: workSpaceMap.DEV,
      name: ['resourceConfig', 'DEV'],
      itemProps: {
        allowClear: true,
      },
      required: false,
      getComp: ({ form }: { form: FormInstance }) => (
        <ClusterQuota form={form} showTip={showTip} canEdit={canEdit} workSpace="DEV" quota={resourceConfig.DEV} />
      ),
      customRender: (value: IData) => <ClusterQuota readOnly data={value} workSpace="DEV" />,
    },
    {
      label: workSpaceMap.TEST,
      name: ['resourceConfig', 'TEST'],
      itemProps: {
        allowClear: true,
      },
      required: false,
      getComp: ({ form }: { form: FormInstance }) => (
        <ClusterQuota form={form} showTip={showTip} canEdit={canEdit} workSpace="TEST" quota={resourceConfig.TEST} />
      ),
      customRender: (value: IData) => <ClusterQuota readOnly data={value} workSpace="DEV" />,
    },
    {
      label: workSpaceMap.STAGING,
      name: ['resourceConfig', 'STAGING'],
      itemProps: {
        allowClear: true,
      },
      required: false,
      getComp: ({ form }: { form: FormInstance }) => (
        <ClusterQuota
          form={form}
          showTip={showTip}
          canEdit={canEdit}
          workSpace="STAGING"
          quota={resourceConfig.STAGING}
        />
      ),
      customRender: (value: IData) => <ClusterQuota readOnly data={value} workSpace="DEV" />,
    },
    {
      label: workSpaceMap.PROD,
      name: ['resourceConfig', 'PROD'],
      itemProps: {
        allowClear: true,
      },
      required: false,
      getComp: ({ form }: { form: FormInstance }) => (
        <ClusterQuota form={form} showTip={showTip} canEdit={canEdit} workSpace="PROD" quota={resourceConfig.PROD} />
      ),
      customRender: (value: IData) => <ClusterQuota readOnly data={value} workSpace="DEV" />,
    },
  ] as any[];

  return fields;
};

interface IProjectType {
  list: ICardProps[];
  value?: string;
  onChange?: (type: PROJECT.ProjectType, typeItem: ICardProps) => void;
}

const ProjectType = (props: IProjectType) => {
  const { list, value, onChange } = props;
  const [selectType, setType] = React.useState<string | undefined>();

  React.useEffect(() => {
    setType(value);
  }, [value]);
  const handleSelect = React.useCallback(
    (typeItem: ICardProps) => {
      if (typeItem.disabled || typeItem.val === selectType) {
        return;
      }
      setType(typeItem.val);
      onChange?.(typeItem.val, typeItem);
    },
    [onChange, selectType],
  );

  return (
    <div className="template-card-row flex justify-between items-center items-stretch">
      {list.map((item) => {
        const isChecked = selectType === item.val;
        const cln = classnames([
          'template-card',
          'rounded',
          'px-2',
          'py-3',
          'cursor-pointer',
          'flex',
          'flex-col',
          'items-center',
          'justify-start',
          'relative',
          item.disabled ? 'not-allowed' : '',
          isChecked ? 'checked' : '',
        ]);
        return (
          <div
            key={item.val}
            className={cln}
            onClick={() => {
              handleSelect(item);
            }}
          >
            {item.val === 'MSP' ? <Badge className="absolute top-2 right-2" count="beta" /> : null}
            <div className="relative template-icon center-flex-box">
              <ErdaIcon type={item.icon} color={isChecked ? 'primary' : 'light-gray'} size="40px" />
            </div>
            <div className="template-name text-sm color-text pt-2 pb-1 text-center">{item.name}</div>
            <div className="template-description text-xs color-text-sub text-left">{item.description}</div>
          </div>
        );
      })}
    </div>
  );
};

const templateArr: ICardProps[] = [
  {
    name: i18n.t('msp:DevOps Project'),
    val: 'DevOps',
    icon: 'CombinedShape',
    description: i18n.t(
      'cmp:Provides features such as project management, code hosting, CI/CD and artifact repository with a complete R&D process.',
    ),
    disabled: false,
  },
  {
    name: i18n.t('cmp:Monitoring Project'),
    val: 'MSP',
    icon: 'fuwujiankong',
    description: i18n.t(
      'cmp:Provides one-stop service system observation, including service monitoring, tracing analysis, dashboards, and alerts.',
    ),
    disabled: false,
  },
  {
    name: i18n.t('cmp:Code Hosting Project'),
    val: 'codeHostingProject',
    icon: 'code',
    description: i18n.t(
      'cmp:Used to host code repositories, supports multiple repositories, with the option to enable CI/CD and artifacts.',
    ),
    disabled: true,
  },
  {
    name: i18n.t('cmp:Agile Project'),
    val: 'agileProject',
    icon: 'scrum',
    description: i18n.t(
      'cmp:Supports agile management of Scrum and traditional project management, including requirements, tasks and bugs.',
    ),
    disabled: true,
  },
];

const workSpaceMap = {
  DEV: firstCharToUpper(i18n.t('development environment')),
  TEST: i18n.t('Testing environment'),
  STAGING: firstCharToUpper(i18n.t('staging environment')),
  PROD: firstCharToUpper(i18n.t('cmp:production environment')),
};

const CreationForm = ({ createType }: { createType: string }) => {
  const { createProject } = projectStore.effects;
  const orgId = orgStore.getState((s) => s.currentOrg.id);
  const quotaFields = useQuotaFields(true, true);
  const [ifConfigCluster, setIfConfigCluster] = React.useState(true);
  const [template, setTemplate] = React.useState(templateArr[0].val);

  const handleSubmit = (form: FormInstance) => {
    form
      .validateFields()
      .then((values: any) => {
        const { resourceConfig } = values;
        if (resourceConfig) {
          Object.keys(values.resourceConfig)
            .filter((key) => resourceConfig[key])
            .forEach((key) => {
              resourceConfig[key].cpuQuota = +resourceConfig[key].cpuQuota;
              resourceConfig[key].memQuota = +resourceConfig[key].memQuota;
            });
        }
        const { projectTemplate, ...rest } = values;

        createProject({ template: 'DevOps', ...rest, orgId }).then((res: any) => {
          if (res.success) {
            if (createType === 'createProject') {
              createTenantProject({
                id: `${res.data}`,
                name: values.name,
                displayName: values.displayName,
                type: values.template === 'MSP' ? 'MSP' : 'DOP',
              }).then(() => {
                goTo('../');
              });
              return;
            }

            if (createType === 'importProject') {
              createTenantProject({
                id: `${res.data}`,
                name: values.name,
                displayName: values.displayName,
                // Importing a project creates a dop project by default
                type: 'DOP',
              })
                .then(() => {
                  importProjectTemplate.fetch({
                    projectID: res.data,
                    file: convertToFormData({ file: projectTemplate.originFileObj }),
                    orgID: orgId,
                    $options: { uploadFileKey: 'file' },
                  });
                })
                .then(() => {
                  message.success(`${values.displayName} ${i18n.t('The project was initialized successfully!')}`, 4);
                  goTo('../');
                });
            }
          }
        });
      })
      .catch(({ errorFields }) => {
        form.scrollToField(errorFields[0].name);
      });
  };

  const fieldsList = [
    ...insertWhen(createType === 'createProject', [
      {
        label: i18n.t('select the template'),
        name: 'template',
        initialValue: templateArr[0].val,
        getComp: ({ form }: { form: FormInstance }) => (
          <ProjectType
            list={templateArr}
            onChange={(type) => {
              setTemplate(type);
              form.resetFields(['resourceConfig']);
            }}
          />
        ),
      },
    ]),
    {
      label: i18n.t('Project name'),
      name: 'displayName',
      getComp: ({ form }: { form: FormInstance }) => (
        <Input
          onInput={(e: any) => {
            let v = e.target.value.trim();
            if (pinyin.isSupported()) {
              v = pinyin.convertToPinyin(v, '', true);
            }
            form.setFieldsValue({
              name: v.split(' ').join('-').toLowerCase(),
            });
            form.validateFields(['name']);
          }}
        />
      ),
      itemProps: {
        placeholder: i18n.t('dop:the project name displayed on the Erda platform, supports Chinese characters'),
        maxLength: 30,
      },
    },
    {
      label: i18n.t('Project identifier'),
      name: 'name',
      rules: [
        { max: 30, message: i18n.t('cannot exceed {max} characters', { max: 30 }) },
        {
          pattern: /^[a-z0-9]+([-][a-z0-9]+)*$/,
          message: i18n.t('project-app-name-tip'),
        },
        {
          validator: (_rule: any, value: any, callback: (message?: string) => void) => {
            if (value && value.toLowerCase().endsWith('_ability')) {
              return callback(i18n.t('The name is reserved internally. Please change the name.'));
            }
            callback();
          },
        },
      ],
      itemProps: {
        placeholder: i18n.t('project-app-name-tip'),
        maxLength: 30,
      },
    },
    ...insertWhen(createType === 'importProject', [
      {
        label: i18n.t('Project template'),
        name: 'projectTemplate',
        labelTip: i18n.t('please upload the zip file'),
        getComp: ({ form }: { form: FormInstance }) => <ImportProjectTemplate form={form} />,
      },
    ]),
    ...insertWhen(template !== 'MSP', [
      {
        getComp: () => (
          <Checkbox defaultChecked={ifConfigCluster} onChange={() => setIfConfigCluster(!ifConfigCluster)}>
            {i18n.t('cmp:Need to configure project cluster resources')}
          </Checkbox>
        ),
      },
    ]),
    ...insertWhen(template !== 'MSP' && ifConfigCluster, quotaFields),
    {
      label: i18n.t('Project logo'),
      name: 'logo',
      required: false,
      getComp: ({ form }: { form: FormInstance }) => <ImageUpload id="logo" form={form} showHint />,
    },
    {
      label: i18n.t('Project description'),
      name: 'desc',
      type: 'textArea',
      required: false,
      itemProps: { rows: 4, maxLength: 200, style: { resize: 'none' } },
    },
    {
      label: '',
      getComp: ({ form }: { form: FormInstance }) => (
        <React.Fragment>
          <Button className="btn-save" type="primary" onClick={() => handleSubmit(form)}>
            {i18n.t('Save')}
          </Button>
          <Button className="ml-3" onClick={() => window.history.back()}>
            {i18n.t('Cancel')}
          </Button>
        </React.Fragment>
      ),
    },
  ];

  return <RenderForm layout="vertical" list={fieldsList} />;
};

export default CreationForm;
