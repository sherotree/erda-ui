export const mockTriggerConditions = {
  success: true,
  data: [
    {
      key: 'cluster',
      display: '集群',
      operators: [
        {
          key: 'eq',
          display: '等于',
        },
        {
          key: 'gte',
          display: '大于等于',
        },
        {
          key: 'lte',
          display: '小于等于',
        },
        {
          key: 'neq',
          display: '不等于',
        },
        {
          key: 'all',
          display: '全部',
        },
        {
          key: 'contains',
          display: '包含',
        },
        {
          key: 'gt',
          display: '大于',
        },
        {
          key: 'lt',
          display: '小于',
        },
        {
          key: 'like',
          display: '字符串包含',
        },
      ],
      options: [
        { key: 'terminus-dev', display: 'terminus-dev' },
        { key: 'erda-op', display: 'erda-op' },
      ],
    },
    {
      key: 'ip',
      display: '机器IP',
      operators: [
        {
          key: 'eq',
          display: '等于',
        },
        {
          key: 'neq',
          display: '不等于',
        },
        {
          key: 'all',
          display: '全部',
        },
        {
          key: 'contains',
          display: '包含',
        },
        {
          key: 'like',
          display: '字符串包含',
        },
      ],
      options: [
        { key: '10.0.6.216', display: '10.0.6.216' },
        { key: '10.0.6.218', display: '10.0.6.218' },
        { key: '10.0.6.219', display: '10.0.6.219' },
        { key: '10.0.6.220', display: '10.0.6.220' },
      ],
    },
  ],
};

export const mockTriggerConditionKeys = [
  { key: 'cluster', display: '集群' },
  { key: 'ip', display: '机器IP' },
];

export const mockTriggerConditionOperators = [
  {
    key: 'eq',
    display: '等于',
  },
  {
    key: 'neq',
    display: '不等于',
  },
  {
    key: 'all',
    display: '全部',
  },
  {
    key: 'contains',
    display: '包含',
  },
  {
    key: 'like',
    display: '字符串包含',
  },
];

export const mockTriggerConditionValues = [
  { key: '10.0.6.216', display: '10.0.6.216' },
  { key: '10.0.6.218', display: '10.0.6.218' },
  { key: '10.0.6.219', display: '10.0.6.219' },
  { key: '10.0.6.220', display: '10.0.6.220' },
];

export const mockNotifyStrategy = {
  success: true,
  data: {
    groups: [
      {
        key: 'notifyGroup',
        display: '联系人群组',
        notifyMethods: [
          { key: 'terminus-dev', display: 'terminus-dev' },
          { key: 'erda-op', display: 'erda-op' },
        ],
      },
    ],
    levels: [
      { key: 'error', display: '故障' },
      { key: 'TODO', display: 'XX' },
    ],
  },
};
