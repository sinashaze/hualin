import Main from '@/components/main'

const userCenter = [
    {
        path: '/',
        name: 'userCenter',
        redirect: '/userCenterLink',
        component: Main,
        meta: {
            showAlways: false,
            access: ['admin'],
            icon: 'index_icon',
            iconShow: 'index_show_icon',
            hideInMenu: true,
        },
        children: [
            {
                path: '/userCenterLink',
                name: 'userCenter',
                meta: {
                    title: '个人中心',
                    access: ['admin'],
                    crumb:'userCenter'
                },
                component: () => import('@/view/UserCenter/index.vue')
            }
        ]
    },
    {
        path: '/',
        name: 'userCenter',
        redirect: '/userCenterLink',
        component: Main,
        meta: {
            showAlways: false,
            access: ['customer'],
            icon: 'index_icon',
            iconShow: 'index_show_icon',
            hideInMenu: true,
        },
        children: [
            {
                path: '/userCenterLink',
                name: 'userCenter',
                meta: {
                    title: '个人中心',
                    access: ['customer'],
                    crumb:'userCenter'
                },
                component: () => import('@/view/UserCenter/index.vue')
            }
        ]
    }
    // {
    //     path: '/userCenter',
    //     name: 'userCenter',
    //     meta: {
    //       hideInMenu: true,
    //       title: '个人中心',
    //       parentAccess: [1],
    //       crumb: 'sales_customer'
    //     },
    //     component: () => import('@/view/UserCenter/index.vue')
    //   }
]

export default userCenter