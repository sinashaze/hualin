// import recordManagement from './crm_router/recordManagement'
// import resourceManagement from './crm_router/resourceManagement'
// import salesManagement from './crm_router/salesManagement'
// import systemManagement from './crm_router/systemManagement'
// import workingPanel from './crm_router/workingPanel'
// import workManagement from './crm_router/workManagement'
// import userCenter from './crm_router/userCenter'
import Main from '@/components/main'
/**import Administrators from './crm_router/Administrators'
import MarketSupport from './crm_router/Administrators'*/

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

/***
 * 基础的登录，报错路由
 * 
 */
const router = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: Main,
  }
]
/***
 * 添加 管理员 客户经理 市场支持
 * 
 */
let addRouters = () => router.concat([]) //workingPanel,salesManagement,recordManagement,resourceManagement, workManagement,systemManagement,userCenter
let addRouters_m = addRouters()
export default addRouters_m
