import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './stylus/theme.styl'

// Element UI
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
// Vue.use(ELEMENT)


// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './js/icon'
Vue.component('faicon', FontAwesomeIcon)

import Nfaicon from 'src/components/tools/NeoFAIcon.vue'
Vue.component('nfaicon', Nfaicon)

// axios
import axios from 'axios'

import i18n from './i18n'
axios.defaults.headers.post['Countent-Type'] = 'application/json'
Vue.prototype.$axios = axios

// Initialization
Vue.config.productionTip = false

// Mixins
import mixins from 'src/js/mixins.js'
Vue.mixin(mixins)

// Mavon Editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

// Vuebar
import Vuebar from 'vuebar'
Vue.use(Vuebar)


// Initialization
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

