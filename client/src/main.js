import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSessionStorage from 'vue-sessionstorage'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueSessionStorage)

Vue.config.productionTip = false

Vue.config.warnHandler = function (msg, vm, trace) {
  return null
}

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
