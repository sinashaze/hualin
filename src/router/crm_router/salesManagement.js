import Main from '@/components/main'

const salesManagement = [
  {
    path: '/salesManagement',
    name: 'salesManagement',
    meta: {
      icon: 'sales_icon',
      showAlways: true,
      iconShow: 'sales_show_icon',
      title: '销售管理',
      titleRole: ['销售管理', '销售中心', '客户中心'],
      access: [1, 2, 5, 6, 7]
    },
    component: Main,
    children: [
      {
        path: '/sales_customer',
        name: 'sales_customer',
        meta: {
          icon: 'ios-document',
          title: '客户管理',
          titleRole: ['客户管理', '客户一览', '客户一览'],
          access: [1],
          crumb: 'sales_customer'
        },
        component: () => import('@/view/SalesManagement/salesCustomer/index.vue')
      },
      // 客户管理-查看详情-用户信息
      {
        path: '/user_Details',
        name: 'user_Details',
        meta: {
          title: '用户信息',
          hideInMenu: true,
          parentAccess: [1],
          crumb: 'sales_customer'
        },
        component: () => import('@/view/SalesManagement/salesCustomer/userDetails.vue')
      },
      // 客户管理-查看详情-师资信息编辑
      {
        path: '/teachersPanelDetails',
        name: 'teachersPanelDetails',
        meta: {
          title: '联系人编辑',
          hideInMenu: true,
          parentAccess: [6],
          crumb: 'sales_Agent'
        },
        component: () => import('@/view/SalesManagement/salesCustomer/inforMation/teachersPanel/details/index.vue')
      },
      // 客户管理-查看详情-代理商更多信息
      {
        path: '/agentDetails',
        name: 'agentDetails',
        meta: {
          title: '代理商详情',
          hideInMenu: true,
          parentAccess: [6],
          crumb: 'sales_Agent'
        },
        component: () => import('@/view/SalesManagement/salesAgent/details/index.vue')
      },
      // 客户管理-查看详情-代理商更多信息-编辑基本信息
      {
        path: '/editContact',
        name: 'editContact',
        meta: {
          title: '基本信息修改',
          hideInMenu: true,
          parentAccess: [1],
          crumb: 'sales_customer'
        },
        component: () => import('@/view/SalesManagement/salesAgent/details/editContact/index.vue')
      },
      // 客户管理-查看详情-用户信息-添加专业
      {
        path: '/addColleg',
        name: 'addColleg',
        meta: {
          title: '添加专业',
          hideInMenu: true,
          parentAccess: [1],
          crumb: 'sales_customer'
        },
        component: () => import('@/view/SalesManagement/salesCustomer/inforMation/addColleg/index.vue')
      },
      // 客户管理-新增项目
      {
        path: '/addProject',
        name: 'addProject',
        meta: {
          title: '项目记录',
          hideInMenu: true,
          parentAccess: [1],
          crumb: 'sales_customer'
        },
        component: () => import('@/view/SalesManagement/salesProject/addProject/index.vue')
      },
      // 项目管理
      {
        path: '/sales_project',
        name: 'sales_project',
        meta: {
          icon: 'md-clipboard',
          title: '项目管理',
          titleRole: ['项目管理', '项目一览', '项目一览'],
          access: [2],
          crumb: 'sales_project'
        },
        component: () => import('@/view/SalesManagement/salesProject/index.vue')
      },
      // 项目管理-查看报表
      {
        path: '/reportForm',
        name: 'reportForm',
        meta: {
          title: '查看报表',
          hideInMenu: true,
          parentAccess: [2],
          crumb: 'sales_project'
        },
        component: () => import('@/view/SalesManagement/salesProject/reportForm/index.vue')
      },
      // 项目第一步修改
      {
        path: '/editProject',
        name: 'editProject',
        meta: {
          title: '意向跟进修改',
          hideInMenu: true,
          parentAccess: [1],
          crumb: 'sales_customer'
        },
        component: () => import('@/view/SalesManagement/salesProject/projectFollowUp/edit/index.vue')
      },
      // 项目第二步修改
      {
        path: '/editDeclare',
        name: 'editDeclare',
        meta: {
          title: '项目申报修改',
          hideInMenu: true,
          parentAccess: [1],
          crumb: 'sales_customer'
        },
        component: () => import('@/view/SalesManagement/salesProject/projectDeclare/edit/index.vue')
      },
      // 项目第三步修改
      {
        path: '/businessFollowUp',
        name: 'businessFollowUp',
        meta: {
          title: '商务跟进修改',
          hideInMenu: true,
          parentAccess: [1],
          crumb: 'sales_customer'
        },
        component: () => import('@/view/SalesManagement/salesProject/projectThreeStep/edit/index.vue')
      },
      // 项目第四步修改
      {
        path: '/editTender',
        name: 'editTender',
        meta: {
          title: '招投标修改',
          hideInMenu: true,
          parentAccess: [1],
          crumb: 'sales_customer'
        },
        component: () => import('@/view/SalesManagement/salesProject/projectFourStep/edit/index.vue')
      },
      //  项目第五步修改
      {
        path: '/editPact',
        name: 'editPact',
        meta: {
          title: '签合同修改',
          hideInMenu: true,
          parentAccess: [1],
          crumb: 'sales_customer'
        },
        component: () => import('@/view/SalesManagement/salesProject/projectFiveStep/edit/index.vue')
      },
      {
        path: '/sales_contract',
        name: 'sales_contract',
        meta: {
          icon: 'md-clipboard',
          title: '合同管理',
          titleRole: ['合同管理', '合同一览', ''],
          access: [5],
          crumb: 'sales_contract'
        },
        component: () => import('@/view/SalesManagement/salesContract/index.vue')
      },
      {
        path: '/sales_Agent',
        name: 'sales_Agent',
        meta: {
          icon: 'md-clipboard',
          title: '代理商管理',
          titleRole: ['代理商管理', '代理商一览', '代理商一览'],
          access: [6],
          crumb: 'sales_Agent'
        },
        component: () => import('@/view/SalesManagement/salesAgent/index.vue')
      },
      {
        path: '/sales_phone',
        name: 'sales_phone',
        meta: {
          icon: 'md-clipboard',
          title: '通讯录',
          titleRole: ['通讯录', '通讯录', '通讯录'],
          access: [7],
          crumb: 'sales_phone'
        },
        component: () => import('@/view/SalesManagement/salesPhone/index.vue')
      },
      // 管理进入通讯录详情
      {
        path: '/phoneDetailsIndex',
        name: 'phoneDetailsIndex',
        meta: {
          hideInMenu: true,
          title: '通讯录详情',
          parentAccess: [7],
          crumb: 'sales_phone'
        },
        component: () => import('@/view/SalesManagement/salesPhone/agentUser/index.vue')
      },
      {
        path: '/phoneDetails',
        name: 'phoneDetails',
        meta: {
          hideInMenu: true,
          title: '合同详情',
          parentAccess: [7],
          crumb: 'sales_phone'
        },
        component: () => import('@/view/SalesManagement/contractDetails.vue')
      },
      // 合同信息
      {
        path: '/contract_Details',
        name: 'contract_Details',
        meta: {
          hideInMenu: true,
          title: '合同详情',
          parentAccess: [5],
          crumb: 'sales_contract'
        },
        component: () => import('@/view/SalesManagement/contractDetails.vue')
      },
      // 代理商详情
      {
        path: '/agent_Details',
        name: 'agent_Details',
        meta: {
          hideInMenu: true,
          title: '代理商详情',
          parentAccess: [6],
          crumb: 'sales_Agent'
        },
        component: () => import('@/view/SalesManagement/salesAgent/AgentDetails.vue')
      },
      // 代理商-联系人详情
      {
        path: '/agent_user',
        name: 'agent_user',
        meta: {
          hideInMenu: true,
          title: '代理商-联系人详情',
          parentAccess: [5],
          crumb: 'sales_Agent'
        },
        component: () => import('@/view/SalesManagement/salesPhone/agentUser/index.vue')
      },
      // 代理商-编辑联系人
      {
        path: '/agentUser_edit',
        name: 'agentUser_edit',
        meta: {
          hideInMenu: true,
          title: '联系人详情',
          parentAccess: [7],
          crumb: 'sales_phone'
        },
        component: () => import('@/view/SalesManagement/salesPhone/agentUser/agentUserEdit.vue')
      },
      // 个人中心
      
    ]
  },
]
export default salesManagement