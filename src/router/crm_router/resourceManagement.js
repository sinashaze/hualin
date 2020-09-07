import Main from '@/components/main'

const resourceManagement = [
    {
        path: '/resource',
        name: 'resource',
        meta: {
          icon: 'resource_icon',
          iconShow:'resource_show_icon',
          title: '资源管理',
          showAlways:true,
          titleRole:['资源管理','资源中心',''],
          access:[8,9,10,17] //17
        },
        component: Main,
        children: [
          {
            path: 'resource_company',
            name: 'resource_company',
            meta: {
              icon: 'ios-document',
              title: '公司资料',
              titleRole:['公司资料','公司资料',''],
              crumb:'resource_company',
              access:[8]
            },
            component: () => import('@/view/ResourceManagement/company/index.vue')
          },
          {
            path: 'resource_companyDateil',
            name: 'res_companyDateil',
            meta: {
              icon: 'ios-document',
              title: '新增/编辑资料包',
              hideInMenu:true,
              parentAccess:[8],
              crumb:'resource_company'
            },
            component: () => import('@/view/ResourceManagement/company/companyDetails.vue')
          },
          {
            path: 'resource_product',
            name: 'resource_product',
            meta: {
              icon: 'md-clipboard',
              title: '产品资料',
              titleRole:['产品资料','产品资料',''],
              crumb:'resource_product',
              access:[9]
            },
            component: () => import('@/view/ResourceManagement/product/index.vue')
          },
          {
            path: 'resource_productDateil',
            name: 'res_productDateil',
            meta: {
              icon: 'ios-document',
              title: '新增/编辑产品包',
              hideInMenu:true,
              parentAccess:[9],
              crumb:'resource_product'
            },
            component: () => import('@/view/ResourceManagement/product/productDetails.vue')
          },
          {
            path: 'resource_curriculum',
            name: 'resource_curriculum',
            meta: {
              icon: 'md-clipboard',
              title: '课程资源',
              titleRole:["课程资料","课程资料",""],
              crumb:'resource_curriculum',
              access:[10]
            },
            component: () => import('@/view/ResourceManagement/curriculum')
          },
          {
            path: 'resource_curriculumDetails',
            name: 'res_culunDetails',
            meta: {
              icon: 'ios-document',
              title: '新增/编辑资料包',
              hideInMenu:true,
              parentAccess:[10],
              crumb:'resource_curriculum'
            },
            component: () => import('@/view/ResourceManagement/curriculum/CurriculumDetails.vue')
          },
          {
            path: 'resource_teachers',
            name: 'resource_teachers',
            meta: {
              icon: 'md-clipboard',
              title: '师资管理',
              titleRole:["师资资料","师资库",""],
              access:[777] //15
            },
            component: () => import('@/view/update/update-paste.vue')
          },
          // 代理商-联系人详情
          {
            path: '/companyDetails',
            name: 'companyDetails',
            meta: {
              hideInMenu:true,
              title: '公司资料-编辑',
            },
            component: () => import('@/view/ResourceManagement/company/companyDetails.vue')
          },
          {
            path: 'resource_OfficialFacultyPool',
            name: 'OfficialFacultyPool',
            meta: {
              icon: 'md-clipboard',
              title: '官方师资库',
              titleRole:["官方师资库","官方师资库",""],
              crumb:'OfficialFacultyPool',
              access:[17]
            },
            component: () => import('@/view/ResourceManagement/OfficialFacultyPool')
          },
          {
            path: 'resource_OfficialFacultyPoolDetails',
            name: 'OfficialFacultyPoolDetails',
            meta: {
              icon: 'ios-document',
              title: '官方师资库/查看详情',
              hideInMenu:true,
              parentAccess:[17],
              crumb:'OfficialFacultyPool'
            },
            component: () => import('@/view/ResourceManagement/OfficialFacultyPool/detailsOffice.vue')
          },
        ]
      },
]
export default resourceManagement