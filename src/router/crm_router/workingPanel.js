import Main from '@/components/main'

const workingPanel = [
    {
        path: '/',
        name: '_home1',
        redirect: '/home',
        component: Main,
        meta: {
            showAlways: false,//hideInBread: true,
            access: ['admin'],
            icon: 'index_icon',
            iconShow: 'index_show_icon',
        },
        children: [
            {
                path: '/home', //管理员的
                name: '__home1',
                meta: {
                    title: '工作面板',
                    access: ['admin'],
                    crumb:'__home1'
                },
                component: () => import('@/view/home/adminIndex.vue')
            }
        ]
    },
    {
        path: '/',
        name: '_home2',
        redirect: '/home_sales', //销售
        component: Main,
        meta: {
            hideInBread: true,
            access: ["customer"],
            icon: 'index_icon',
            iconShow: 'index_show_icon',
        },
        children: [
            {
                path: '/home_sales',
                name: '__home2',
                meta: {
                    title: '工作面板',
                    access: ['customer'],
                    crumb:'__home2'
                },
                component: () => import('@/view/home/index.vue')
            }
        ]
    },
    {
        path: '/',
        name: '_home3',
        redirect: '/home_zhici', //市场支持
        component: Main,
        meta: {
            hideInBread: true,
            access: ["marke"],
            icon: 'index_icon',
            iconShow: 'index_show_icon',
        },
        children: [
            {
                path: '/home_zhici',
                name: '__home3',
                meta: {
                    title: '工作面板',
                    icon: 'md-home',
                    access: ['marke'],
                    crumb:'__home3'
                },
                component: () => import('@/view/home/marketIndex.vue')
            }
        ]
    }
]

export default workingPanel