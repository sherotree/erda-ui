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

import * as React from 'react';
import userStore from 'app/user/stores';
import DiceConfigPage from 'config-page/index';
import './personal-home.scss';

export const PersonalHome = () => {
  const loginUser = userStore.useStore(s => s.loginUser);
  const { orgName } = loginUser;
  const inParams = { orgName };

  return (
    <div className='home-page'>
      <div className='home-page-sidebar'>
        <DiceConfigPage
          scenarioType='home-page-sidebar'
          scenarioKey='home-page-sidebar'
          useMock={location.search.includes('useMock') ? useMockLeft : undefined}
          inParams={inParams}
        />
      </div>
      <div className='home-page-content'>
        <DiceConfigPage
          scenarioType='home-page-content'
          scenarioKey='home-page-content'
          useMock={location.search.includes('useMock') ? useMockRight : undefined}
          inParams={inParams}
        />
      </div>
    </div>
  )
};

const mockSidebar: CONFIG_PAGE.RenderConfig = {
  scenario: {
    scenarioKey: 'home-page-sidebar',
    scenarioType: 'home-page-sidebar', // 后端定义
  },
  protocol: {
    hierarchy: {
      root: 'page',
      structure: {
        page: ['sidebar'],
        sidebar: ['myOrganization', 'myProject', 'myApplication'],
        myOrganization: ['orgImage', 'orgSwitch', 'joinedBrief', 'emptyOrganization'],
        emptyOrganization: ['emptyOrgText'],
        myProject: ['myProjectTitle', 'myProjectFilter', 'myProjectList', 'emptyProject'],
        emptyProject: ['projectTipWithoutOrg', 'projectTipWithOrg'],
        projectTipWithOrg: ['createProjectLink', 'createProjectTip'],
        myApplication: ['myApplicationTitle', 'myApplicationFilter', 'myApplicationList', 'emptyApplication'],
      },
    },
    components: {
      page: { type: 'Container' },
      sidebar: {
        type: 'Container',
        props: {
          whiteBg: true,
          className: 'pa16',
        }
      },
      myOrganization: {
        type: 'Container',
        props: {
          spaceSize: 'big',
        }
      },
      emptyOrganization: {
        type: 'Container',
      },
      emptyOrgText: {
        type: 'TextGroup',
        props: {
          visible: true,
          value: [
            {
              props: {
                renderType: 'text',
                visible: true,
                value: '未加入任何组织',
              },
            },
            {
              props: {
                renderType: 'linkText',
                visible: true,
                value: {
                  text: [{ text: '了解如何受邀加入到组织', operationKey: "toJoinOrgDoc" }]
                },
              },
            },
            {
              props: {
                renderType: 'linkText',
                visible: true,
                value: {
                  text: [{ text: '浏览公开组织信息', operationKey: 'toPublicOrgPage' }]
                },
              },
            },
          ],

        },
        operations: {
          toJoinOrgDoc: {
            command: {
              key: "goto",
              target: "https://docs.erda.cloud/",
              jumpOut: true,
              visible: false,
            },
            key: "click",
            reload: false,
            show: false,
          },
          toPublicOrgPage: {
            command: {
              key: "goto",
              target: "orgHome",
              jumpOut: true,
              visible: false,
            },
            key: "click",
            reload: false,
            show: false,
          },
        },
      },
      orgImage: {
        type: 'Image',
        props: {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3355464299,584008140&fm=26&gp=0.jpg',
          visible: true,
          styleNames: {
            normal: true,
            'mt8': true,
          }
        },
      },
      orgSwitch: {
        type: 'DropdownSelect',
        props: {
          menuList:
            [
              { name: '组织B', key: 'organizeB' },
              { name: '组织A', key: 'organizeA' },
            ],
          buttonText: '组织A',
          jumpToOtherPage: [{ target: 'orgHome', label: '浏览公开组织' }],
        },
      },
      joinedBrief: {
        type: 'Table',
        props: {
          rowKey: 'key',
          columns: [
            { title: '', dataIndex: 'category' },
            { title: '', dataIndex: 'number', width: 42 },
          ],
          showHeader: false,
          pagination: false,
          styleNames: {
            'no-border': true,
            'light-card': true,
          },
        },
        data: {
          list: [
            {
              id: 1,
              category: { renderType: 'textWithIcon', prefixIcon: 'project-icon', value: '参与项目数：', colorClassName: 'color-primary' },
              number: 5,
            },
            {
              id: 1,
              category: { renderType: 'textWithIcon', prefixIcon: 'app-icon', value: '参与应用数：', colorClassName: 'color-primary' },
              number: 45,
            },
          ],
        },
      },
      emptyProject: {
        // type: 'EmptyHolder',
        // props: {
        //   tip: '暂无数据，请先加入组织~',
        //   visible: true,
        //   relative: true,
        // }
        type: 'Container',
      },
      projectTipWithoutOrg: {
        type: 'Text',
        props: {
          visible: true,
          renderType: 'linkText',
          value: {
            text: ['请先加入组织或者', { text: '了解更多内容', operationKey: "toJoinOrgDoc" }]
          }
        },
        operations: {
          toJoinOrgDoc: {
            command: {
              key: "goto",
              target: "https://docs.erda.cloud/",
              jumpOut: true,
              visible: false,
            },
            key: "click",
            reload: false,
            show: false,
          },
        }
      },
      projectTipWithOrg: {
        type: 'Container',
      },
      createProjectLink: {
        type: 'Text',
        props: {
          visible: true,
          renderType: 'linkText',
          value: {
            text: [{ text: '创建', operationKey: "createProject" }]
          }
        },
        operations: {
          createProject: {
            command: {
              key: "goto",
              target: "createProject",
              jumpOut: true,
              visible: false,
            },
            key: "click",
            reload: false,
            show: false,
          },
        }
      },
      createProjectTip: {
        type: 'Text',
        props: {
          visible: true,
          renderType: 'linkText',
          value: {
            text: [{ text: '如何创建项目', operationKey: "createProjectDoc" }, ' 或 ', { text: '通过公开组织浏览公开项目信息', operationKey: "toPublicOrgPage" }]
          }
        },
        operations: {
          createProjectDoc: {
            command: {
              key: "goto",
              target: "https://docs.erda.cloud/",
              jumpOut: true,
              visible: false,
            },
            key: "click",
            reload: false,
            show: false,
          },
          toPublicOrgPage: {
            command: {
              key: "goto",
              target: "orgHome",
              jumpOut: true,
              visible: false,
            },
            key: "click",
            reload: false,
            show: false,
          },
        }
      },
      myProject: {
        type: 'Container',
      },
      myProjectTitle: {
        type: 'Title',
        props: {
          title: '项目',
          level: 1,
        }
      },
      myProjectFilter: {
        type: 'ContractiveFilter',
        props: {
          visible: true,
          delay: 1000,
        },
        state: {
          conditions: [
            {
              key: 'title',
              label: '标题',
              emptyText: '全部',
              fixed: true,
              showIndex: 2,
              placeholder: '搜索项目',
              type: 'input' as const,
            },
          ],
          values: {
          },
        },
        operations: {
          filter: {
            key: 'filter',
            reload: true,
          },
        },
      },
      myProjectList: {
        type: 'List',
        props: {
          visible: true,
          showLoadMore: true,
        },
        data: {
          list: [
            {
              id: '1',
              porjectId: '13',
              title: '测试1测试1测试1测试1',
              description: '',
              prefixImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              operations: {
                click: {
                  key: 'click',
                  show: false,
                  reload: false,
                  command: {
                    key: 'goto',
                    target: 'issueAll',
                    state: {
                      params: {
                        projectId: '13',
                      },
                    }
                  },
                },
              },
            },
            {
              id: '2',
              porjectId: '13',
              title: '测试2',
              description: '',
              prefixImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              operations: {
                click: {
                  key: 'click',
                  show: false,
                  reload: false,
                  command: {
                    key: 'goto',
                    target: 'issueAll',
                    state: {
                      params: {
                        projectId: '13',
                      },
                    }
                  },
                },
              },
            },
          ],
        },
        operations: {
          changePageNo: {
            key: 'changePageNo',
            reload: true,
            fillMeta: 'pageNo'
          },
        },
        state: {
          pageNo: 1,
          pageSize: 5,
          total: 5,
        },
      },
      myApplication: {
        type: 'Container',
      },
      myApplicationTitle: {
        type: 'Title',
        props: {
          title: '应用',
          level: 1,
        }
      },
      myApplicationFilter: {
        type: 'ContractiveFilter',
        props: {
          delay: 1000,
          visible: true,
        },
        state: {
          conditions: [
            {
              key: 'title',
              label: '标题',
              emptyText: '全部',
              fixed: true,
              showIndex: 2,
              placeholder: '搜索应用',
              type: 'input' as const,
            },
          ],
          values: {
          },
        },
        operations: {
          filter: {
            key: 'filter',
            reload: true,
          },
        },
      },
      myApplicationList: {
        type: 'List',
        props: {
          visible: true,
          showLoadMore: true,
        },
        data: {
          list: [
            {
              id: '1',
              title: '测试1测试1测试1测试1',
              description: '',
              prefixImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              operations: {
                click: {
                  key: 'click',
                  show: false,
                  reload: false,
                  command: {
                    key: 'goto',
                    target: 'app',
                    state: {
                      params: {
                        projectId: '9',
                        appId: '8',
                      },
                    }
                  },
                },
              },
            },
            {
              id: '2',
              title: '测试2',
              description: '',
              prefixImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              operations: {
                click: {
                  key: 'click',
                  show: false,
                  reload: false,
                  command: {
                    key: 'goto',
                    target: 'app',
                    state: {
                      params: {
                        projectId: '9',
                        appId: '8',
                      },
                    }
                  },
                },
              },
            },
          ],
        },
        operations: {
          changePageNo: {
            key: 'changePageNo',
            reload: true,
            fillMeta: 'pageNo'
          },
        },
        state: {
          pageNo: 1,
          pageSize: 5,
          total: 5,
        },
      },
    },
  },
};

const mockContent: CONFIG_PAGE.RenderConfig = {
  scenario: {
    scenarioKey: 'home-page-content',
    scenarioType: 'home-page-content', // 后端定义
  },
  protocol: {
    hierarchy: {
      root: 'page',
      structure: {
        page: ['content'],
        content: ['title', 'emptyOrgTip', 'emptyProjectTip', 'tableGroup'],
        emptyOrgTip: { left: 'erdaLogo', right: 'emptyOrgText' },
        emptyOrgText: ['emptyOrgTitle', 'emptyOrgContent'],
        emptyProjectTip: { left: 'orgLogo', right: 'emptyProjectText' },
        emptyProjectText: ['emptyProjectTitle', 'emptyProjectContent'],
      },
    },
    components: {
      page: { type: 'Container' },
      title: {
        type: 'Title',
        props: {
          title: '事件',
          level: 1,
          titleStyles: { fontSize: '24px' },
          subtitle: '您未完成的事项 560 条',
        }
      },
      emptyOrgTip: {
        type: 'LRContainer',
        props: {
          whiteBg: true,
          startAlign: true,
        },
        leftStyleNames: { 'flex-1': false }
      },
      erdaLogo: {
        type: 'Image',
        props: {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3355464299,584008140&fm=26&gp=0.jpg',
          visible: true,
          styleNames: {
            small: true,
            'mt8': true,
            'circle': true,
          }
        },
      },
      emptyOrgText: {
        type: 'Container',
      },
      emptyOrgTitle: {
        type: 'Title',
        props: {
          visible: true,
          title: '你已经是 Erda Cloud 组织的成员',
          level: 2,
        },
      },
      emptyOrgContent: {
        type: 'TextGroup',
        props: {
          visible: true,
          value: [
            {
              props: {
                renderType: 'Text',
                visible: true,
                value: '以下是作为平台新成员的一些快速入门知识：',
              },
            },
            {
              props: {
                renderType: 'Text',
                visible: true,
                value: '* 浏览公开组织',
                styleConfig: {
                  bold: true,
                }
              }
            },
            {
              props: {
                renderType: 'Text',
                visible: true,
                value: '通过左上角的浏览公开组织信息，选择公开组织可以直接进入浏览该组织公开项目的信息可（包含项目管理、应用运行信息等）',
              },
            },
            {
              props: {
                renderType: 'Text',
                visible: true,
                value: '* 加入组织 组织当前都是受邀机制，需要线下联系企业所有者进行邀请加入',
              },
            },
            {
              props: {
                renderType: 'Text',
                visible: true,
                value: '当你已经加入到任何组织后，此框将不再显示',
              },
            },
          ]
        },
        operations: {
          toSpecificProject: {
            command: {
              key: "goto",
              target: "issueAll",
              jumpOut: true,
              state: {
                query: {
                  issueViewGroup__urlQuery: "eyJ2YWx1ZSI6ImthbmJhbiIsImNoaWxkcmVuVmFsdWUiOnsia2FuYmFuIjoiZGVhZGxpbmUifX0=",
                },
                params: {
                  projectId: '13',
                },
              },
              visible: false,
            },
            key: "click",
            reload: false,
            show: false,
          },
        },
      },
      emptyProjectTip: {
        type: 'LRContainer',
        props: {
          whiteBg: true,
          startAlign: true,
        },
        leftStyleNames: { 'flex-1': false }
      },
      orgLogo: {
        type: 'Image',
        props: {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdzJaQZp56En9t1-6SYmZYtY8Y9pdpDoFscQ&usqp=CAU',
          visible: true,
          styleNames: {
            small: true,
            'mt8': true,
            'circle': true,
          }
        },
      },
      emptyProjectText: {
        type: 'Container',
      },
      emptyProjectTitle: {
        type: 'Title',
        props: {
          visible: true,
          title: '你已经是 XXX 组织的成员',
          level: 2,
        },
      },
      emptyProjectContent: {
        type: 'TextGroup',
        props: {
          visible: true,
          value: [
            {
              props: {
                renderType: 'Text',
                visible: true,
                value: '以下是作为组织新成员的一些快速入门知识：',
              },
            },
            {
              props: {
                renderType: 'Text',
                visible: true,
                value: '* 切换组织 使用此屏幕上左上角的组织切换，快速进行组织之间切换',
                styleConfig: {
                  bold: true
                },
              },
            },
            {
              props: {
                renderType: 'Text',
                visible: true,
                value: '* 切换组织 使用此屏幕上左上角的组织切换，快速进行组织之间切换',
              },
            },
            {
              props: {
                renderType: 'Text',
                visible: true,
                value: '* 公开组织浏览 可以通过切换组织下拉菜单中选择公开组织进行浏览',
              },
            },
            {
              props: {
                renderType: 'Text',
                visible: true,
                value: '* 加入项目 当前都是受邀机制，需要线下联系项目管理员进行邀请加入',
              },
            },
            {
              props: {
                renderType: 'linkText',
                visible: true,
                value: {
                  text: ['* 该组织内公开项目浏览 点击左上角菜单',
                    {
                      icon: 'appstore',
                    }, '选择 DevOps平台进入，选择我的项目可以查看该组织下公开项目的信息']
                },
              },
            },
            {
              props: {
                renderType: 'Text',
                visible: true,
                value: '当你已经加入到任何项目后，此框将不再显示',
              },
            },
          ]
        },
      },
      content: { type: 'Container' },
      tableGroup: {
        type: 'TableGroup',
        props: {
          visible: true,
        },
        operations: {
          changePageNo: {
            key: 'changePageNo',
            reload: true,
            fillMeta: 'pageNo'
          },
        },
        data: {
          list: [
            {
              title: {
                prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT',
                title: 'Erda',
                level: 2,
              },
              subtitle: {
                title: '您未完成的事项666',
                level: 3,
              },
              description: {
                value: "当前您还有 120 个事项待完成，其中 已过期: 40，本日到期: 40，7日内到期: 36，30日内到期: 44",
              },
              table: {
                props: {
                  rowKey: 'key',
                  columns: [
                    { title: '', dataIndex: 'name' },
                    { title: '', dataIndex: 'planFinishedAt', width: 100, },
                  ],
                  showHeader: false,
                  pagination: false,
                  styleNames: {
                    'no-border': true,
                  },
                },
                data: {
                  list: [
                    {
                      id: '153',
                      projectId: '13',
                      type: 'requirement',
                      name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '222运行速度没得说，完全不卡，打游戏体验极佳', hoverActive: 'hover-active' },
                      planFinishedAt: '2022-03-02',
                    },
                    {
                      id: '150',
                      projectId: '13',
                      type: 'requirement',
                      name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '111运行速度没得说，完全不卡，打游戏体验极佳', hoverActive: 'hover-active' },
                      planFinishedAt: '2022-03-02',
                    },
                    {
                      id: '153',
                      projectId: '13',
                      type: 'requirement',
                      name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '111运行速度没得说，完全不卡，打游戏体验极佳', hoverActive: 'hover-active' },
                      planFinishedAt: '2022-03-02',
                    },
                    {
                      id: '150',
                      projectId: '13',
                      type: 'requirement',
                      name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '111运行速度没得说，完全不卡，打游戏体验极佳', hoverActive: 'hover-active' },
                      planFinishedAt: '2022-03-02',
                    },
                    {
                      id: '153',
                      projectId: '13',
                      type: 'requirement',
                      name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '111运行速度没得说，完全不卡，打游戏体验极佳', hoverActive: 'hover-active' },
                      planFinishedAt: '2022-03-02',
                    },
                  ],
                },
                operations: {
                  clickRow: {
                    key: 'clickRow',
                    reload: false,
                    command: {
                      key: 'goto',
                      target: 'specificIssue',
                      jumpOut: true,
                    },
                  },
                },
              },
              extraInfo: {
                props: {
                  renderType: 'linkText',
                  value: {
                    text: [{ text: "查看剩余112条事件 >>", operationKey: "toSpecificProject" }]
                  },
                },
                operations: {
                  toSpecificProject: {
                    command: {
                      key: "goto",
                      target: "issueAll",
                      jumpOut: true,
                      state: {
                        query: {
                          issueViewGroup__urlQuery: "eyJ2YWx1ZSI6ImthbmJhbiIsImNoaWxkcmVuVmFsdWUiOnsia2FuYmFuIjoiZGVhZGxpbmUifX0=",
                        },
                        params: {
                          projectId: '13',
                        },
                      },
                      visible: false,
                    },
                    key: "click",
                    reload: false,
                    show: false,
                  },
                },

              },
            },
            {
              title: {
                prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT',
                title: 'Erda',
                level: 2,
              },
              subtitle: {
                title: '您未完成的事项666',
                level: 3,
              },
              description: {
                value: "当前您还有 120 个事项待完成，其中 已过期: 40，本日到期: 40，7日内到期: 36，30日内到期: 44",
              },
              table: {
                props: {
                  rowKey: 'key',
                  columns: [
                    { title: '', dataIndex: 'name' },
                    { title: '', dataIndex: 'planFinishedAt', width: 100, },
                  ],
                  showHeader: false,
                  pagination: false,
                  styleNames: {
                    'no-border': true,
                  },
                },
                data: {
                  list: [
                    {
                      id: '153',
                      projectId: '13',
                      type: 'requirement',
                      name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '222运行速度没得说，完全不卡，打游戏体验极佳', hoverActive: 'hover-active' },
                      planFinishedAt: '2022-03-02',
                    },
                    {
                      id: '150',
                      projectId: '13',
                      type: 'requirement',
                      name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '111运行速度没得说，完全不卡，打游戏体验极佳', hoverActive: 'hover-active' },
                      planFinishedAt: '2022-03-02',
                    },
                    {
                      id: '153',
                      projectId: '13',
                      type: 'requirement',
                      name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '111运行速度没得说，完全不卡，打游戏体验极佳', hoverActive: 'hover-active' },
                      planFinishedAt: '2022-03-02',
                    },
                    {
                      id: '150',
                      projectId: '13',
                      type: 'requirement',
                      name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '111运行速度没得说，完全不卡，打游戏体验极佳', hoverActive: 'hover-active' },
                      planFinishedAt: '2022-03-02',
                    },
                    {
                      id: '153',
                      projectId: '13',
                      type: 'requirement',
                      name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '111运行速度没得说，完全不卡，打游戏体验极佳', hoverActive: 'hover-active' },
                      planFinishedAt: '2022-03-02',
                    },
                  ],
                },
                operations: {
                  clickRow: {
                    key: 'clickRow',
                    reload: false,
                    command: {
                      key: 'goto',
                      target: 'specificIssue',
                      jumpOut: true,
                    },
                  },
                },
              },
              extraInfo: {
                props: {
                  renderType: 'linkText',
                  value: {
                    text: [{ text: "查看剩余112条事件 >>", operationKey: "toSpecificProject" }]
                  },
                },
                operations: {
                  toSpecificProject: {
                    command: {
                      key: "goto",
                      target: "issueAll",
                      jumpOut: true,
                      state: {
                        query: {
                          issueViewGroup__urlQuery: "eyJ2YWx1ZSI6ImthbmJhbiIsImNoaWxkcmVuVmFsdWUiOnsia2FuYmFuIjoiZGVhZGxpbmUifX0=",
                        },
                        params: {
                          projectId: '13',
                        },
                      },
                      visible: false,
                    },
                    key: "click",
                    reload: false,
                    show: false,
                  },
                },
              },
            },
          ],
        },
        state: {
          pageNo: 1,
          pageSize: 1,
          total: 5,
        }
      }
    },
  },
};

const useMockLeft = (payload: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSidebar);
    }, 500);
  });
};


const useMockRight = (payload: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockContent);
    }, 500);
  });
};
