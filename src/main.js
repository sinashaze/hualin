import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'view-design'
import config from '@/config'
import 'lib-flexible'
import './index.less'

Vue.use(iView)
/**
 * @description 注册admin内置插件
 */

Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
