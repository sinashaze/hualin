import Main from '@/components/main'

const systemManagement = [
    {
        path: '/systemManagement',
        name: 'systemManagement',
        meta: {
          icon: 'system_icon',
          showAlways:true,
          iconShow:'system_show_icon',
          title: '系统管理',
          access:[13,14,'dyadmin']
        },
        component: Main,
        children: [
          {
            path: 'systemManagement_userManagement',
            name: 'systemManagement_userManagement',
            meta: {
              icon: 'ios-document',
              title: '用户管理',
              crumb:'systemManagement_userManagement',
              access: [13]
            },
            component: () => import('@/view/SysteManagement/UserManagement')
          },
          {
            path: 'systemManagement_addUser',
            name: 'sys_addUser',
            meta: {
              icon: 'ios-document',
              title: '新增/编辑用户',
              hideInMenu:true,
              parentAccess:[13],
              crumb:'systemManagement_userManagement'
            },
            component: () => import('@/view/SysteManagement/UserManagement/addUserList.vue')
          },
          {
            path: 'systemManagement_roleManagement',
            name: 'systemManagement_roleManagement',
            meta: {
              icon: 'md-clipboard',
              title: '角色管理',
              crumb:'systemManagement_roleManagement',
              access: [14]
            },
            component: () => import('@/view/SysteManagement/RoleManagement')
          },
          {
            path: 'systemManagement_addRole',
            name: 'sys_addRole',
            meta: {
              icon: 'ios-document',
              title: '新增/编辑用户',
              hideInMenu:true,
              parentAccess:[14],
              crumb:'systemManagement_roleManagement'
            },
            component: () => import('@/view/SysteManagement/RoleManagement/roleDEMO.vue')
          },
          {
            path: 'systemManagement_delRole',
            name: 'sys_delRole',
            meta: {
              icon: 'ios-document',
              title: '绑定账户',
              hideInMenu:true,
              parentAccess:[14],
              crumb:'systemManagement_roleManagement'
            },
            component: () => import('@/view/SysteManagement/RoleManagement/delRole.vue')
          },
          {
            path: 'systemManagement_ParameterSetting',
            name: 'systemManagement_ParameterSetting',
            meta: {
              icon: 'md-clipboard',
              title: '参数设置',
              crumb:'systemManagement_ParameterSetting',
              access: ['dyadmin']
            },
            component: () => import('@/view/SysteManagement/paramsSetting')
          },
          {
            path: 'projectPhase',
            name: 'projectPhase',
            meta: {
              icon: 'md-clipboard',
              title: '项目阶段管理',
              crumb:'systemManagement_projectPhaseSetting',
              access: ['dyadmin']
            },
            component: () => import('@/view/SysteManagement/projectPhaseSetting')
          }
        ]
      },
]
export default systemManagement