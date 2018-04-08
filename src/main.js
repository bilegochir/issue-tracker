import Vue from 'vue'
import App from './App.vue'
import router from './router'
import feather from 'vue-icon'
import notifications from 'vue-notification'
import store from '@/store/store'
import { sync } from 'vuex-router-sync'
sync(store, router)

Vue.use(feather, 'v-icon')
Vue.use(notifications)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
