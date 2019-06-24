import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUser, faSearch)
Vue.component('faicon', FontAwesomeIcon)

// axios
import axios from 'axios'

import i18n from './i18n'
axios.defaults.headers.post['Countent-Type'] = 'application/json'
Vue.prototype.$axios = axios

// Initialization
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
