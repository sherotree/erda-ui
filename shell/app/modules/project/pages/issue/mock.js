export const mock = {
  protocol: {
    components: {
      content: {
        data: {},
        name: 'content',
        operations: {},
        props: null,
        state: {},
        type: 'Container',
      },
      head: {
        data: {},
        name: 'head',
        operations: {},
        props: {
          whiteBg: true,
        },
        state: {},
        type: 'LRContainer',
      },
      issueAddButton: {
        data: {},
        name: 'issueAddButton',
        operations: {
          click: {
            disabled: false,
            key: 'createTask',
            reload: false,
          },
        },
        props: {
          disabled: false,
          menu: null,
          operations: {
            click: {
              key: '',
              reload: false,
            },
          },
          suffixIcon: '',
          text: '新建任务',
          type: 'primary',
        },
        state: {},
        type: 'Button',
      },
      issueExport: {
        data: {},
        name: 'issueExport',
        operations: {
          click: {
            confirm: '是否确认导出',
            reload: false,
          },
        },
        props: {
          prefixIcon: 'export',
          size: 'small',
          tooltip: '导出',
        },
        state: {},
        type: 'Button',
      },
      issueFilter: {
        data: {},
        name: 'issueFilter',
        operations: {
          assigneeSelectMe: {
            key: 'assigneeSelectMe',
            reload: true,
          },
          creatorSelectMe: {
            key: 'creatorSelectMe',
            reload: true,
          },
          deleteFilter: {
            fillMeta: 'id',
            key: 'deleteFilter',
            reload: true,
          },
          filter: {
            key: 'filter',
            reload: true,
          },
          ownerSelectMe: {
            key: 'ownerSelectMe',
            reload: true,
          },
          saveFilter: {
            fillMeta: 'name',
            key: 'saveFilter',
            reload: true,
          },
        },
        props: {
          delay: 2000,
        },
        state: {
          conditions: [
            {
              customProps: {
                mode: 'single',
              },
              emptyText: '未选择',
              fixed: true,
              haveFilter: true,
              key: 'filterID',
              label: '我的筛选器',
              placeholder: '选择筛选器',
              quickAdd: {
                operationKey: 'saveFilter',
                placeholder: '请输入名称保存当前筛选',
                show: true,
              },
              quickDelete: {
                operationKey: 'deleteFilter',
              },
              quickSelect: {},
              showIndex: 1,
              split: true,
              type: 'select',
            },
            {
              emptyText: '全部',
              fixed: true,
              haveFilter: true,
              key: 'iterationIDs',
              label: '迭代',
              options: [
                {
                  label: 'V1.3.1',
                  value: 706,
                },
                {
                  label: '1.1',
                  value: 699,
                },
                {
                  label: '123',
                  value: 682,
                },
              ],
              placeholder: '选择迭代',
              quickAdd: {
                show: false,
              },
              quickDelete: {},
              quickSelect: {},
              showIndex: 2,
              type: 'select',
            },
            {
              emptyText: '全部',
              fixed: true,
              key: 'states',
              label: '状态',
              options: [
                {
                  label: '待处理',
                  value: 307,
                },
                {
                  label: '进行中',
                  value: 308,
                },
                {
                  label: '已完成',
                  value: 309,
                },
              ],
              quickAdd: {
                show: false,
              },
              quickDelete: {},
              quickSelect: {},
              showIndex: 3,
              type: 'select',
            },
            {
              emptyText: '全部',
              fixed: true,
              key: 'title',
              label: '标题',
              placeholder: '请输入标题或ID',
              quickAdd: {
                show: false,
              },
              quickDelete: {},
              quickSelect: {},
              showIndex: 3,
              type: 'input',
            },
            {
              emptyText: '全部',
              haveFilter: true,
              key: 'labelIDs',
              label: '标签',
              options: [
                {
                  label: 'qwe ',
                  value: 46,
                },
                {
                  label: '2312',
                  value: 45,
                },
                {
                  label: 'assasasa',
                  value: 2,
                },
              ],
              placeholder: '请选择标签',
              quickAdd: {
                show: false,
              },
              quickDelete: {},
              quickSelect: {},
              type: 'select',
            },
            {
              emptyText: '全部',
              key: 'priorities',
              label: '优先级',
              options: [
                {
                  label: '紧急',
                  value: 'URGENT',
                },
                {
                  label: '高',
                  value: 'HIGH',
                },
                {
                  label: '中',
                  value: 'NORMAL',
                },
                {
                  label: '低',
                  value: 'LOW',
                },
              ],
              placeholder: '选择优先级',
              quickAdd: {
                show: false,
              },
              quickDelete: {},
              quickSelect: {},
              type: 'select',
            },
            {
              emptyText: '全部',
              key: 'severities',
              label: '严重程度',
              options: [
                {
                  label: '致命',
                  value: 'FATAL',
                },
                {
                  label: '严重',
                  value: 'SERIOUS',
                },
                {
                  label: '一般',
                  value: 'NORMAL',
                },
                {
                  label: '轻微',
                  value: 'SLIGHT',
                },
                {
                  label: '建议',
                  value: 'SUGGEST',
                },
              ],
              placeholder: '选择严重程度',
              quickAdd: {
                show: false,
              },
              quickDelete: {},
              quickSelect: {},
              type: 'select',
            },
            {
              emptyText: '全部',
              haveFilter: true,
              key: 'creatorIDs',
              label: '创建人',
              options: [
                {
                  label: 'test',
                  value: '12022',
                },
                {
                  label: 'sfwn',
                  value: '12028',
                },
                {
                  label: 'dice',
                  value: '2',
                },
              ],
              quickAdd: {
                show: false,
              },
              quickDelete: {},
              quickSelect: {
                label: '选择自己',
                operationKey: 'creatorSelectMe',
              },
              type: 'select',
            },
            {
              emptyText: '全部',
              haveFilter: true,
              key: 'assigneeIDs',
              label: '处理人',
              options: [
                {
                  label: 'test',
                  value: '12022',
                },
                {
                  label: 'sfwn',
                  value: '12028',
                },
                {
                  label: 'dice',
                  value: '2',
                },
              ],
              quickAdd: {
                show: false,
              },
              quickDelete: {},
              quickSelect: {
                label: '选择自己',
                operationKey: 'assigneeSelectMe',
              },
              type: 'select',
            },
            {
              emptyText: '全部',
              key: 'bugStages',
              label: '任务类型',
              options: [
                {
                  label: '设计',
                  value: 'design',
                },
                {
                  label: '开发',
                  value: 'dev',
                },
                {
                  label: '测试',
                  value: 'test',
                },
                {
                  label: '实施',
                  value: 'implement',
                },
                {
                  label: '部署',
                  value: 'deploy',
                },
                {
                  label: '运维',
                  value: 'operator',
                },
              ],
              quickAdd: {
                show: false,
              },
              quickDelete: {},
              quickSelect: {},
              type: 'select',
            },
            {
              customProps: {
                borderTime: true,
              },
              emptyText: '全部',
              key: 'createdAtStartEnd',
              label: '创建日期',
              quickAdd: {
                show: false,
              },
              quickDelete: {},
              quickSelect: {},
              type: 'dateRange',
            },
            {
              customProps: {
                borderTime: true,
              },
              key: 'finishedAtStartEnd',
              label: '截止日期',
              quickAdd: {
                show: false,
              },
              quickDelete: {},
              quickSelect: {},
              type: 'dateRange',
            },
          ],
          issueFilter__urlQuery: 'eyJzdGF0ZXMiOlszMDcsMzA4XX0=',
          issuePagingRequest: {
            IDs: null,
            WithProcessSummary: false,
            appID: null,
            asc: false,
            assignee: null,
            bugStage: null,
            complexity: null,
            creator: null,
            customPanelID: 0,
            endClosedAt: 0,
            endCreatedAt: 0,
            endFinishedAt: 0,
            exceptIDs: null,
            isEmptyPlanFinishedAt: false,
            iterationID: 0,
            iterationIDs: null,
            label: null,
            notIncluded: false,
            onlyIdResult: false,
            orderBy: '',
            orgID: 1,
            owner: null,
            pageNo: 1,
            pageSize: 0,
            priority: null,
            projectID: 1,
            projectIDs: null,
            relatedIssueId: null,
            requirementID: null,
            severity: null,
            source: '',
            startClosedAt: 0,
            startCreatedAt: 0,
            startFinishedAt: 0,
            state: [307, 308],
            stateBelongs: null,
            taskType: null,
            title: '',
            type: ['TASK'],
            userID: '2',
          },
          issueViewGroupChildrenValue: {
            kanban: 'priority',
          },
          issueViewGroupValue: 'kanban',
          values: {
            states: [307, 308],
          },
        },
        type: 'ContractiveFilter',
      },
      issueGantt: {
        data: {},
        name: 'issueGantt',
        operations: {},
        props: {
          visible: false,
        },
        state: {
          filterConditions: {
            IDs: null,
            WithProcessSummary: false,
            appID: null,
            asc: false,
            assignee: null,
            bugStage: null,
            complexity: null,
            creator: null,
            customPanelID: 0,
            endClosedAt: 0,
            endCreatedAt: 0,
            endFinishedAt: 0,
            exceptIDs: null,
            isEmptyPlanFinishedAt: false,
            iterationID: 0,
            iterationIDs: null,
            label: null,
            notIncluded: false,
            onlyIdResult: false,
            orderBy: '',
            orgID: 1,
            owner: null,
            pageNo: 1,
            pageSize: 0,
            priority: null,
            projectID: 1,
            projectIDs: null,
            relatedIssueId: null,
            requirementID: null,
            severity: null,
            source: '',
            startClosedAt: 0,
            startCreatedAt: 0,
            startFinishedAt: 0,
            state: [307, 308],
            stateBelongs: null,
            taskType: null,
            title: '',
            type: ['TASK'],
            userID: '2',
          },
          issueViewGroupValue: 'kanban',
        },
        type: 'Table',
      },
      issueImport: {
        data: {},
        name: 'issueImport',
        operations: {
          click: {
            disabled: false,
            reload: false,
          },
        },
        props: {
          prefixIcon: 'import',
          size: 'small',
          tooltip: '导入',
          visible: true,
        },
        state: {},
        type: 'Button',
      },
      issueKanban: {
        data: {
          boards: [
            {
              title: '紧急',
              id: 'URGENT',
              cards: [
                {
                  userID: '2',
                  id: 131,
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                  extra: {
                    iterationID: -1,
                    priority: 'URGENT',
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233246,
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'URGENT',
                    type: 'TASK',
                  },
                },
              ],
              operations: {
                changePageNo: {
                  fillMeta: 'pageData',
                  key: 'changePageNo',
                  meta: {
                    kanbanKey: 'URGENT',
                  },
                  reload: true,
                },
              },
              pageNo: 1,
              pageSize: 50,
              total: 2,
            },
            {
              title: '高',
              id: 'HIGH',
              cards: [
                {
                  userID: '2',
                  id: 233247,
                  title: '可以顺利一点吗啊啊啊啊啊啊a',
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233247,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                },
                {
                  userID: '2',
                  id: 233252,
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233252,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233253,
                  title: '建一个需求给你，你记得要先打开任务窗',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233253,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233254,
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233254,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    type: 'TASK',
                    planFinishedAt: null,
                    priority: 'HIGH',
                  },
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                },
                {
                  userID: '2',
                  id: 233256,
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233256,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  assignee: '2',
                  id: 233257,
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233257,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
              ],
              operations: {
                changePageNo: {
                  fillMeta: 'pageData',
                  key: 'changePageNo',
                  meta: {
                    kanbanKey: 'HIGH',
                  },
                  reload: true,
                },
              },
              pageNo: 1,
              pageSize: 50,
              total: 6,
            },
            {
              title: '中',
              id: 'NORMAL',
              cards: [
                {
                  userID: '2',
                  id: 233247,
                  title: '可以顺利一点吗啊啊啊啊啊啊a',
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233247,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                },
                {
                  userID: '2',
                  id: 233252,
                  title: '雄厚的多家但我我好多发货未付速度和妻儿是大佛是',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233252,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233253,
                  title: 'ISO河口区活动的杀戮的精品店将改名为配合技术得问问婆家分奇偶的发过来金额无人',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233253,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233254,
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233254,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    type: 'TASK',
                    planFinishedAt: null,
                    priority: 'HIGH',
                  },
                  title: 'saas',
                },
                {
                  userID: '2',
                  id: 233256,
                  title: 'sad',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233256,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  assignee: '2',
                  id: 233257,
                  title: 'sda',

                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233257,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233247,
                  title: '可以顺利一点吗啊啊啊啊啊啊a',
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233247,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                },
                {
                  userID: '2',
                  id: 233252,
                  title: 'bas',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233252,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233253,
                  title: 'sa',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233253,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233254,
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233254,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    type: 'TASK',
                    planFinishedAt: null,
                    priority: 'HIGH',
                  },
                  title: 'saas',
                },
                {
                  userID: '2',
                  id: 233256,
                  title: 'sad',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233256,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  assignee: '2',
                  id: 233257,
                  title: 'sda',

                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233257,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233247,
                  title: '可以顺利一点吗啊啊啊啊啊啊a',
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233247,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                },
                {
                  userID: '2',
                  id: 233252,
                  title: 'bas',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233252,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233253,
                  title: 'sa',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233253,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233254,
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233254,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    type: 'TASK',
                    planFinishedAt: null,
                    priority: 'HIGH',
                  },
                  title: 'saas',
                },
                {
                  userID: '2',
                  id: 233256,
                  title: 'sad',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233256,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  assignee: '2',
                  id: 233257,
                  title: 'sda',

                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233257,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233247,
                  title: '可以顺利一点吗啊啊啊啊啊啊a',
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233247,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                },
                {
                  userID: '2',
                  id: 233252,
                  title: 'bas',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233252,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233253,
                  title: 'sa',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233253,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233254,
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233254,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    type: 'TASK',
                    planFinishedAt: null,
                    priority: 'HIGH',
                  },
                  title: 'saas',
                },
                {
                  userID: '2',
                  id: 233256,
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233256,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  assignee: '2',
                  id: 233257,
                  title: 'sda',

                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233257,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233247,
                  title: '可以顺利一点吗啊啊啊啊啊啊a',
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233247,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                },
                {
                  userID: '2',
                  id: 233252,
                  title: 'bas',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233252,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233253,
                  title: 'sa',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233253,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233254,
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233254,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    type: 'TASK',
                    planFinishedAt: null,
                    priority: 'HIGH',
                  },
                  title: 'saas',
                },
                {
                  userID: '2',
                  id: 233256,
                  title: 'sad',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233256,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  assignee: '2',
                  id: 233257,
                  title: 'sda',

                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233257,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233247,
                  title: '可以顺利一点吗啊啊啊啊啊啊a',
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233247,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                },
                {
                  userID: '2',
                  id: 233252,
                  title: 'bas',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233252,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233253,
                  title: 'sa',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233253,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233254,
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233254,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    type: 'TASK',
                    planFinishedAt: null,
                    priority: 'HIGH',
                  },
                  title: 'saas',
                },
                {
                  userID: '2',
                  id: 233256,
                  title: 'sad',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233256,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  assignee: '2',
                  id: 233257,
                  title: 'sda',

                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233257,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
              ],
              operations: {
                changePageNo: {
                  fillMeta: 'pageData',
                  key: 'changePageNo',
                  meta: {
                    kanbanKey: 'NORMAL',
                  },
                  reload: true,
                },
              },
              pageNo: 1,
              pageSize: 50,
              total: 64,
            },
            {
              title: '低',
              id: 'LOW',
              cards: [
                {
                  userID: '2',
                  id: 233247,
                  title: '可以顺利一点吗啊啊啊啊啊啊a',
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233247,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                },
                {
                  userID: '2',
                  id: 233252,
                  title: '阿尔艾uagwefeilghawei',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233252,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233253,
                  title: 'sa都会如何给的沙发巾哦阿斯顿我我娃儿滑窗',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233253,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233254,
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233254,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    type: 'TASK',
                    planFinishedAt: null,
                    priority: 'HIGH',
                  },
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                },
                {
                  userID: '2',
                  id: 233256,
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233256,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  assignee: '2',
                  id: 233257,
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233257,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233247,
                  title: '可以顺利一点吗啊啊啊啊啊啊a',
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233247,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                },
                {
                  userID: '2',
                  id: 233252,
                  title: 'bas',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233252,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233253,
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233253,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233254,
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233254,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    type: 'TASK',
                    planFinishedAt: null,
                    priority: 'HIGH',
                  },
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                },
                {
                  userID: '2',
                  id: 233256,
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233256,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  assignee: '2',
                  id: 233257,
                  title: '建一个任务给你，你记得要先打开任务窗，再仔细看看，然后啥啥哈哈哈哈哈，好笑吗',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233257,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233247,
                  title: '可以顺利一点吗啊啊啊啊啊啊a',
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233247,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                },
                {
                  userID: '2',
                  id: 233252,
                  title: 'bas',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233252,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233253,
                  title: 'sa',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233253,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    planFinishedAt: null,
                    priority: 'HIGH',
                    iterationID: -1,
                    type: 'TASK',
                  },
                },
                {
                  userID: '2',
                  id: 233254,
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233254,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    type: 'TASK',
                    planFinishedAt: null,
                    priority: 'HIGH',
                  },
                  title: 'saas',
                },
                {
                  userID: '2',
                  id: 233256,
                  title: 'sad',
                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233256,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
                {
                  assignee: '2',
                  id: 233257,
                  title: 'sda',

                  operations: {
                    drag: {
                      async: true,
                      disabled: false,
                      meta: {
                        ID: 233257,
                        issueAssignee: '',
                        issuePriority: '',
                        panelID: 0,
                        panelName: '',
                        stateID: 0,
                      },
                      reload: true,
                      targetKeys: {
                        LOW: true,
                        NORMAL: true,
                        URGENT: true,
                      },
                    },
                  },
                  extra: {
                    iterationID: -1,
                    planFinishedAt: null,
                    priority: 'HIGH',
                    type: 'TASK',
                  },
                },
              ],
              operations: {
                changePageNo: {
                  fillMeta: 'pageData',
                  key: 'changePageNo',
                  meta: {
                    kanbanKey: 'LOW',
                  },
                  reload: true,
                },
              },
              pageNo: 1,
              pageSize: 50,
              total: 0,
            },
          ],
          refreshBoard: true,
        },
        name: 'issueKanban',
        operations: {},
        props: {
          isLoadMore: true,
          visible: true,
        },
        state: {
          filterConditions: {
            IDs: null,
            WithProcessSummary: false,
            appID: null,
            asc: false,
            assignee: null,
            bugStage: null,
            complexity: null,
            creator: null,
            customPanelID: 0,
            endClosedAt: 0,
            endCreatedAt: 0,
            endFinishedAt: 0,
            exceptIDs: null,
            isEmptyPlanFinishedAt: false,
            iterationID: 0,
            iterationIDs: null,
            label: null,
            notIncluded: false,
            onlyIdResult: false,
            orderBy: '',
            orgID: 1,
            owner: null,
            pageNo: 1,
            pageSize: 0,
            priority: null,
            projectID: 1,
            projectIDs: null,
            relatedIssueId: null,
            requirementID: null,
            severity: null,
            source: '',
            startClosedAt: 0,
            startCreatedAt: 0,
            startFinishedAt: 0,
            state: [307, 308],
            stateBelongs: null,
            taskType: null,
            title: '',
            type: ['TASK'],
            userID: '2',
          },
          issueViewGroupChildrenValue: {
            kanban: 'priority',
          },
          issueViewGroupValue: 'kanban',
        },
        type: 'IssueKanban',
      },
      issueManage: {
        data: {},
        name: 'issueManage',
        operations: {},
        props: null,
        state: {},
        type: 'Container',
      },
      issueOperations: {
        data: {},
        name: 'issueOperations',
        operations: {},
        props: null,
        state: {},
        type: 'RowContainer',
      },
      issueTable: {
        data: {},
        name: 'issueTable',
        operations: {},
        props: {
          visible: false,
        },
        state: {
          filterConditions: {
            IDs: null,
            WithProcessSummary: false,
            appID: null,
            asc: false,
            assignee: null,
            bugStage: null,
            complexity: null,
            creator: null,
            customPanelID: 0,
            endClosedAt: 0,
            endCreatedAt: 0,
            endFinishedAt: 0,
            exceptIDs: null,
            isEmptyPlanFinishedAt: false,
            iterationID: 0,
            iterationIDs: null,
            label: null,
            notIncluded: false,
            onlyIdResult: false,
            orderBy: '',
            orgID: 1,
            owner: null,
            pageNo: 1,
            pageSize: 0,
            priority: null,
            projectID: 1,
            projectIDs: null,
            relatedIssueId: null,
            requirementID: null,
            severity: null,
            source: '',
            startClosedAt: 0,
            startCreatedAt: 0,
            startFinishedAt: 0,
            state: [307, 308],
            stateBelongs: null,
            taskType: null,
            title: '',
            type: ['TASK'],
            userID: '2',
          },
          issueViewGroupValue: 'kanban',
        },
        type: 'Table',
      },
      issueViewGroup: {
        data: {},
        name: 'issueViewGroup',
        operations: {
          onChange: {
            key: 'changeViewType',
            reload: true,
          },
        },
        props: {
          buttonStyle: 'solid',
          options: [
            {
              key: 'table',
              prefixIcon: 'default-list',
              text: '列表',
              tooltip: '',
            },
            {
              children: [
                {
                  key: 'priority',
                  text: '优先级',
                },
                {
                  key: 'deadline',
                  text: '截止日期',
                },
                {
                  key: 'custom',
                  text: '自定义',
                },
                {
                  key: 'status',
                  text: '状态',
                },
              ],
              key: 'kanban',
              prefixIcon: 'data-matrix',
              suffixIcon: 'di',
              text: '看板',
              tooltip: '看板视图',
            },
          ],
          radioType: 'button',
          size: 'small',
        },
        state: {
          childrenValue: {
            kanban: 'priority',
          },
          issueViewGroup__urlQuery: 'eyJ2YWx1ZSI6ImthbmJhbiIsImNoaWxkcmVuVmFsdWUiOnsia2FuYmFuIjoicHJpb3JpdHkifX0=',
          value: 'kanban',
        },
        type: 'Radio',
      },
      topHead: {
        data: {},
        name: 'topHead',
        operations: {},
        props: {
          isTopHead: true,
        },
        state: {},
        type: 'RowContainer',
      },
    },
    hierarchy: {
      root: 'issueManage',
      structure: {
        content: ['issueTable', 'issueKanban', 'issueGantt'],
        head: {
          left: 'issueFilter',
          right: 'issueOperations',
        },
        issueManage: ['topHead', 'head', 'content'],
        issueOperations: ['issueViewGroup', 'issueExport', 'issueImport'],
        topHead: ['issueAddButton'],
      },
    },
    options: {
      syncIntervalSecond: 30,
    },
    rendering: {
      __DefaultRendering__: [
        {
          name: 'issueManage',
          state: null,
        },
        {
          name: 'topHead',
          state: null,
        },
        {
          name: 'issueAddButton',
          state: null,
        },
        {
          name: 'head',
          state: null,
        },
        {
          name: 'issueOperations',
          state: null,
        },
        {
          name: 'issueViewGroup',
          state: null,
        },
        {
          name: 'issueFilter',
          state: [
            {
              name: 'issueViewGroupValue',
              value: '{{ issueViewGroup.value }}',
            },
            {
              name: 'issueViewGroupChildrenValue',
              value: '{{ issueViewGroup.childrenValue }}',
            },
          ],
        },
        {
          name: 'issueExport',
          state: null,
        },
        {
          name: 'issueImport',
          state: null,
        },
        {
          name: 'content',
          state: null,
        },
        {
          name: 'issueTable',
          state: [
            {
              name: 'issueViewGroupValue',
              value: '{{ issueViewGroup.value }}',
            },
            {
              name: 'filterConditions',
              value: '{{ issueFilter.issuePagingRequest }}',
            },
          ],
        },
        {
          name: 'issueKanban',
          state: [
            {
              name: 'issueViewGroupValue',
              value: '{{ issueViewGroup.value }}',
            },
            {
              name: 'issueViewGroupChildrenValue',
              value: '{{ issueViewGroup.childrenValue }}',
            },
            {
              name: 'filterConditions',
              value: '{{ issueFilter.issuePagingRequest }}',
            },
          ],
        },
        {
          name: 'issueGantt',
          state: [
            {
              name: 'issueViewGroupValue',
              value: '{{ issueViewGroup.value }}',
            },
            {
              name: 'filterConditions',
              value: '{{ issueFilter.issuePagingRequest }}',
            },
          ],
        },
      ],
      issueFilter: [
        {
          name: 'issueViewGroup',
          state: null,
        },
        {
          name: 'issueTable',
          state: [
            {
              name: 'issueViewGroupValue',
              value: '{{ issueViewGroup.value }}',
            },
            {
              name: 'filterConditions',
              value: '{{ issueFilter.issuePagingRequest }}',
            },
          ],
        },
        {
          name: 'issueKanban',
          state: [
            {
              name: 'issueViewGroupValue',
              value: '{{ issueViewGroup.value }}',
            },
            {
              name: 'issueViewGroupChildrenValue',
              value: '{{ issueViewGroup.childrenValue }}',
            },
            {
              name: 'filterConditions',
              value: '{{ issueFilter.issuePagingRequest }}',
            },
          ],
        },
        {
          name: 'issueGantt',
          state: [
            {
              name: 'issueViewGroupValue',
              value: '{{ issueViewGroup.value }}',
            },
            {
              name: 'filterConditions',
              value: '{{ issueFilter.issuePagingRequest }}',
            },
          ],
        },
      ],
      issueViewGroup: [
        {
          name: 'issueFilter',
          state: [
            {
              name: 'issueViewGroupValue',
              value: '{{ issueViewGroup.value }}',
            },
            {
              name: 'issueViewGroupChildrenValue',
              value: '{{ issueViewGroup.childrenValue }}',
            },
          ],
        },
        {
          name: 'issueTable',
          state: [
            {
              name: 'issueViewGroupValue',
              value: '{{ issueViewGroup.value }}',
            },
            {
              name: 'filterConditions',
              value: '{{ issueFilter.issuePagingRequest }}',
            },
          ],
        },
        {
          name: 'issueKanban',
          state: [
            {
              name: 'issueViewGroupValue',
              value: '{{ issueViewGroup.value }}',
            },
            {
              name: 'issueViewGroupChildrenValue',
              value: '{{ issueViewGroup.childrenValue }}',
            },
            {
              name: 'filterConditions',
              value: '{{ issueFilter.issuePagingRequest }}',
            },
          ],
        },
        {
          name: 'issueGantt',
          state: [
            {
              name: 'issueViewGroupValue',
              value: '{{ issueViewGroup.value }}',
            },
            {
              name: 'filterConditions',
              value: '{{ issueFilter.issuePagingRequest }}',
            },
          ],
        },
      ],
    },
    scenario: 'issue-manage',
    state: {
      _error_: null,
      _userIDs_: ['2'],
    },
    version: '',
  },
  scenario: {
    scenarioKey: 'issue-manage',
    scenarioType: 'issue-manage',
  },
};
