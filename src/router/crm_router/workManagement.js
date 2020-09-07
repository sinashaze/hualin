import Main from '@/components/main'

const workManagement = [
    {
        path: '/workManagement',
        name: 'workManagement',
        meta: {
          icon: 'working_icon',
          iconShow:'working_show_icon',
          showAlways:true,
          title: '工作管理',
          titleRole:["工作管理","工作中心",""],
          access:[11,12]
        },
        component: Main,
        children: [
          {
            path: 'workManagement_planManagement',
            name: 'workManagement_planManagement',
            meta: {
              icon: 'index_icon',
              title: '计划管理',
              titleRole:["计划管理","我的计划",""],
              access:[11],
              crumb:'workManagement_planManagement'
            },
            component: () => import('@/view/workManagement/planMan/index.vue')
          },
          {
            path: 'workManagement_addPlan',
            name: 'plan_addPlan',
            meta: {
              icon: 'index_icon',
              title: '新增/编辑计划',
              crumb:'workManagement_planManagement',
              parentAccess:[11],
              hideInMenu:true
            },
            component: () => import('@/view/workManagement/planMan/lockPlan.vue')
          },
          {
            path: 'workManagement_lockPlan',
            name: 'work_locjPlan',
            meta: {
              icon: 'index_icon',
              title: '查看计划详情',
              hideInMenu:true,
              parentAccess:[11],
              crumb:'workManagement_planManagement'
            },
            component: () => import('@/view/workManagement/planMan/updateDetailplan.vue')
          },
          {
            path: 'workManagement_Specific',
            name: 'work_Specific',
            meta: {
              icon: 'index_icon',
              title: '具体成员详情',
              hideInMenu:true,
              parentAccess:[11],
              crumb:'workManagement_planManagement'
            },
            component: () => import('@/view/workManagement/planMan/updateCom/detailFenXi.vue')
          },
          {
            path: 'workManagement_projectReport',
            name: 'workManagement_projectReport',
            meta: {
              icon: 'index_icon',
              title: '奖励机制',
              access:[12],
              crumb:'workManagement_projectReport'
            },
            component: () => import('@/view/workManagement/awardRules')
          },
          {
            path: 'workManagement_editOrAdd',
            name: 'workManagement_editOrAdd',
            meta: {
              icon: 'ios-document',
              title: '新增/编辑规则',
              hideInMenu:true,
              parentAccess:[12],
              crumb:'workManagement_projectReport'
            },
            component: () => import('@/view/workManagement/awardRules/editOrAdd.vue')
          },
          {
            path: 'workManagement_ruleTest',
            name: 'workManagement_ruleTest',
            meta: {
              icon: 'ios-document',
              title: '规则测试',
              hideInMenu:true,
              parentAccess:[12],
              crumb:'workManagement_projectReport'
            },
            component: () => import('@/view/workManagement/awardRules/ruleTest')
          },
        ]
      },
]
export default workManagement