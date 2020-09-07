import Main from '@/components/main'

const recordManagement = [
    {
        path: '/record',
        name: 'record',
        meta: {
          icon: 'record_icon',
          iconShow:'record_show_icon',
          title: '记录管理',
          showAlways:true,
          titleRole:['记录管理','记录中心','市场支持中心'],
          access:[3,4,15,18]//18
        },
        component: Main,
        children: [
          {
            path: '/record_forward',
            name: 'record_forward',
            meta: {
              icon: 'ios-document',
              title: '日常跟进记录',
              titleRole:['日常跟进记录','日常跟进记录',''],
              access:[3],
              crumb:'record_forward'
            },
            component: () => import('@/view/RecordManagement/recordForward/index.vue')
          },
          {
            path: '/forWardAdminDetails',
            name: 'forWardAdminDetails',
            meta: {
              hideInMenu:true,
              title: '日常跟进记录-详情',
              parentAccess:[3],
              crumb:'record_forward'
            },
            component: () => import('@/view/RecordManagement/recordForward/details/admin/index.vue')
          },
          // 前期跟进记录-详情
          {
            path: '/recordForwardDetails',
            name: 'recordForwardDetails',
            meta: {
              hideInMenu:true,
              title: '日常跟进记录-详情',
              parentAccess:[3],
              crumb:'record_forward'
            },
            component: () => import('@/view/RecordManagement/recordForward/details/index.vue')
          },
          {
            path: '/record_follow_up',
            name: 'record_follow_up',
            meta: {
              icon: 'md-clipboard',
              title: '项目跟进记录',
              titleRole:['项目跟进记录','项目跟进记录',''],
              access:[4],
              crumb:'record_follow_up'
            },
            component: () => import('@/view/RecordManagement/recordFollowUp/index.vue')
          },
          
          // 项目跟进记录-详情
          {
            path: '/recordFollowUpDetails',
            name: 'recordFollowUpDetails',
            meta: {
              hideInMenu:true,
              title: '项目跟进记录-详情',
              parentAccess:[4],
              crumb:'record_follow_up'
            },
            component: () => import('@/view/RecordManagement/recordFollowUp/details/index.vue')
          },
          {
            path: '/FollowUpAdminDetails',
            name: 'FollowUpAdminDetails',
            meta: {
              hideInMenu:true,
              title: '项目跟进记录-详情',
              parentAccess:[4],
              crumb:'record_follow_up'
            },
            component: () => import('@/view/RecordManagement/recordFollowUp/details/admin/index.vue')
          },
          {
            path: '/record_market_support',
            name: 'record_market_support',
            meta: {
              icon: 'md-clipboard',
              title: '市场支持记录',
              titleRole:['市场支持记录','市场支持记录','市场支持记录'],
              access:[15],
              crumb:'record_market_support'
            },
            component: () => import('@/view/RecordManagement/recordMarketSupport/index.vue')
          },
          {
            path: '/marketingDetails',
            name: 'marketingDetails',
            meta: {
              hideInMenu:true,
              title: '市场支持记录-详情',
              parentAccess:[15],
              crumb:'record_market_support'
            },
            component: () => import('@/view/RecordManagement/recordMarketSupport/details/index.vue')
          },
          {
            path: '/publishedDetails',
            name: 'publishedDetails',
            meta: {
              hideInMenu:true,
              title: '支持记录',
              parentAccess:[15],
              crumb:'record_market_support'
            },
            component: () => import('@/view/RecordManagement/recordMarketSupport/details/published.vue')
          },
          {
            path: '/executiveCondition',
            name: 'executiveCondition',
            meta: {
              hideInMenu:true,
              title: '执行情况',
              parentAccess:[15],
              crumb:'record_market_support'
            },
            component: () => import('@/view/RecordManagement/recordMarketSupport/details/executor/index.vue')
          },
          {
            path: '/executeDetails',
            name: 'executeDetails',
            meta: {
              hideInMenu:true,
              title: '执行情况',
              parentAccess:[15],
              crumb:'record_market_support'
            },
            component: () => import('@/view/RecordManagement/recordMarketSupport/details/executeDetails/index.vue')
          },
          // 成分费用记录
          {
            path: '/costRecord',
            name: 'costRecord',
            meta: {
              icon: 'ios-document',
              title: '成本费用记录',
              titleRole:['成本费用记录','成本费用记录',''],
              access:[18],
              crumb:'costRecord'
            },
            component: () => import('@/view/RecordManagement/costRecord/index.vue')
          },
          {
            path: '/addRecord',
            name: 'addRecord',
            meta: {
              hideInMenu:true,
              title: '添加费用记录',
              parentAccess:[15],
              crumb:'costRecord'
            },
            component: () => import('@/view/RecordManagement/costRecord/addRecord/index.vue')
          },
          {
            path: '/costDetails',
            name: 'costDetails',
            meta: {
              hideInMenu:true,
              title: '查看费用记录',
              parentAccess:[15],
              crumb:'costRecord'
            },
            component: () => import('@/view/RecordManagement/costRecord/details/index.vue')
          }
        ]
      },
]
export default recordManagement