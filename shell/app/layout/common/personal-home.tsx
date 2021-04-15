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
import DiceConfigPage from 'config-page/index';
import './personal-home.scss';

export const PersonalHome = () => {

  return (
    <div className='home-page'>
      <div className='home-page-sidebar'>
        <DiceConfigPage
          scenarioType='home-page-sidebar'
          scenarioKey='home-page-sidebar'
          useMock={location.search.includes('useMock') ? useMockLeft : undefined}
        />
      </div>
      <div className='home-page-content'>
        <DiceConfigPage
          scenarioType='home-page-content'
          scenarioKey='home-page-content'
          useMock={location.search.includes('useMock') ? useMockRight : undefined}
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
        myOrganization: ['orgImage', 'orgSwitch', 'brief', 'emptyOrganization'],
        emptyOrganization: ['emptyImage', 'emptyOrgText'],
        myProject: ['myProjectTitle', 'myProjectFilter', 'myProjectList', 'moreProject', 'emptyProject'],
        myApplication: ['myApplicationTitle', 'myApplicationFilter', 'myApplicationList', 'moreApplication', 'emptyProject'],
      },
    },
    components: {
      page: { type: 'Container' },
      sidebar: {
        type: 'Container',
        props: {
          whiteBg: true,
        }
      },
      myOrganization: {
        type: 'Container',
      },
      emptyOrganization: {
        type: 'Container',
      },
      emptyImage: {
        type: 'EmptyHolder',
        props: {
          tip: '',
          visible: true,
          relative: true,
        }
      },
      emptyOrgText: {
        type: 'Text',
        props: {
          visible: true,
          renderType: 'linkText',
          styleConfig: { fontSize: 16, lineHeight: 24 },
          value: {
            text: [
              '您尚未加入任何组织，点击',
              { text: '+', operationKey: 'xxx', styleConfig: { bold: true } },
              '创建', '您也可以点击', { text: '@', operationKey: 'xxx', styleConfig: { bold: true } }, '浏览公开组织',
            ],
          },
        },
      },
      orgImage: {
        type: 'Image',
        props: {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3355464299,584008140&fm=26&gp=0.jpg',
          visible: true,
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
          jumpToOtherPage: ['浏览公开组织'],
        },
      },
      brief: {
        type: 'Table',
        props: {
          rowKey: 'key',
          columns: [
            { title: '', dataIndex: 'category' },
            { title: '', dataIndex: 'number' },
          ],
          showHeader: false,
          pagination: false,
          styleNames: {
            'without-border': true,
            'justify-align': true,
          },
        },
        data: {
          list: [
            {
              id: 1,
              category: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '参与项目数：' },
              number: 5,
            },
            {
              id: 1,
              category: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '参与应用数：' },
              number: 45,
            },
          ],
        },
      },
      emptyProject: {
        type: 'EmptyHolder',
        props: {
          tip: '暂无数据，请先加入组织~',
          visible: true,
          relative: true,
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
        },
        data: {
          list: [
            {
              id: '1',
              title: '测试1测试1测试1测试1',
              description: '',
              prefixImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            {
              id: '2',
              title: '测试2',
              description: '',
              prefixImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            },
          ],
        },
      },
      moreProject: {
        type: 'Text',
        props: {
          renderType: 'linkText',
          visible: false,
          value: {
            text: '更多',
          },
        }
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
        },
        data: {
          list: [
            {
              id: '1',
              title: '测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1',
              description: '',
              prefixImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            },
            {
              id: '2',
              title: '测试2',
              description: '',
              prefixImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            },
          ],
        },
      },
      moreApplication: {
        type: 'Text',
        props: {
          renderType: 'linkText',
          value: {
            text: '更多',
          },
        }
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
        content: ['title', 'emptyOrgTip', 'emptyProjectTip', 'projectItem'],
        projectItem: ['projectTitle', 'projectContent'],
        projectContent: ['issueTitle', 'issueBrief', 'issueTable', 'moreIssueLink'],
      },
    },
    components: {
      page: { type: 'Container' },
      title: {
        type: 'Title',
        props: {
          title: '事件',
          level: 1,
          titleStyles: { fontSize: '24px' }, showSubtitle: true,
          subtitle: '您未完成的事项 560 条',
        }
      },
      emptyOrgTip: {
        type: 'Card',
        props: {
          cardType: 'card',
          visible: true,
          data: {
            _infoData: {
              id: '1',
              titleIcon: 'ISSUE_ICON.issue.REQUIREMENT',
              title: '你已经是 组织A 的新成员',
              type: '',
              subContent: '以下是。。。。',
            }
          },
        },
      },
      emptyProjectTip: {
        type: 'Card',
        visible: true,
        props: {
          cardType: 'card',
          data: {
            _infoData: {
              id: '1',
              titleIcon: 'ISSUE_ICON.issue.REQUIREMENT',
              title: '你已经是 组织A 的成员',
              type: '',
              subContent: '以下是。。。。',
            }
          },
        },
      },
      projectItem: {
        type: 'Container',
      },
      projectTitle: {
        type: 'Title',
        props: {
          prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT',
          title: 'Erda',
          level: 2,
        },
      },
      content: { type: 'Container' },
      projectContent: {
        type: 'Container',
        props: {
          whiteBg: true,
        },
      },
      issueTitle: {
        type: 'Title',
        props: {
          title: '您未完成的事项',
          level: 3,
        },
      },
      issueBrief: {
        type: 'Text',
        props: {
          value: "当前您还有 120 个事项待完成，其中 已过期: 40，本日到期: 40，7日内到期: 36，30日内到期: 44",
        },
      },
      issueTable: {
        type: 'Table',
        props: {
          rowKey: 'key',
          columns: [
            { title: '', dataIndex: 'name' },
            { title: '', dataIndex: 'planFinishedAt' },
          ],
          showHeader: false,
          pagination: false,
          styleNames: {
            'without-border': true,
            'justify-align': true,
          },
        },
        data: {
          list: [
            {
              id: 1,
              name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '运行速度没得说，完全不卡，打游戏体验极佳' },
              planFinishedAt: '2021-03-02 10:09:12',
            },
            {
              id: 2,
              name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '运行速度没得说，完全不卡，打游戏体验极佳' },
              planFinishedAt: '2021-03-02 10:09:12',
            },
            {
              id: 3,
              name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '运行速度没得说，完全不卡，打游戏体验极佳' },
              planFinishedAt: '2021-03-02 10:09:12',
            },
            {
              id: 4,
              name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '运行速度没得说，完全不卡，打游戏体验极佳' },
              planFinishedAt: '2021-03-02 10:09:12',
            },
            {
              id: 5,
              name: { renderType: 'textWithIcon', prefixIcon: 'ISSUE_ICON.issue.REQUIREMENT', value: '运行速度没得说，完全不卡，打游戏体验极佳' },
              planFinishedAt: '2021-03-02 10:09:12',
            },
          ],
        },
      },
      moreIssueLink: {
        type: 'Text',
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
              target: "https://local-shell.terminus-org.dev.terminus.io:8081/orgHome",
            },
            key: "click",
            reload: false,
            show: false,
          },
        },
      },
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



// const data = {
//   pageEvent: {
//     redirectUrl: '',
//   },
//   structure: {
//     root: 'page',
//     page: ['form'],
//   },
//   components: {
//     form: {
//       data: {
//         operations: {
//           click: {
//             key: 'toxx',
//             reload: false,
//             command: {
//               key: 'goto',
//               target: 'all',
//               state: {
//                 query: {id:type,}
//               }
//             }
//           }
//         }
//       },
//       operations: {
//         submit: {
//           key: "ss",
//           reload: true,

//         }
//       }
//     }

//   }
// }