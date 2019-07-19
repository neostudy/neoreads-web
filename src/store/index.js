import Vue from 'vue'
import Vuex from 'vuex'

import persist from './persist'
import session from './session'

Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
    persist,
    session
  }
})