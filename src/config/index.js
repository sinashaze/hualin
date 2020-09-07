export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: window.location.host === 'dycrmds.occupationedu.com' ?'电商DS_CRM_Bate1.0':'金融JR_CRM_Bate1.0',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
 ADMINCRM_URL: `${window.location.href.split(':')[0]}://${window.location.host}`,
  // baseUrl: {
  //   dev: 'http://192.168.5.216:8080/',//'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
  //   pro: 'http://192.168.5.216:8012/'
  // },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName(v){
    let s = [0,'__home1','__home2','__home3']
    return s[v]
  },
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
