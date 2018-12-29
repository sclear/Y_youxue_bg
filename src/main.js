// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import './assets/public.css'
import './assets/iconf.css'
import 'element-ui/lib/theme-chalk/index.css';

import Element from 'element-ui'
Vue.use(Element)
import _globalComponts from './components/global/globalcom'
Vue.use(_globalComponts)
import plugin from './plugin/plugin'
Vue.use(plugin)
/* eslint-disable no-new */
import store from './store/index'
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
