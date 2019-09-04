import { LOG_IN, LOG_OUT, SET_ACTIVE_MENU_INDEX, REFRESH_TOKEN } from './types';
import { DefaultLocalStore } from './local';


export default {
  [LOG_IN](state, param) {
    state.user = param;
    state.user.lastRefresh = Date.now();
    DefaultLocalStore.save(state)
  },
  [LOG_OUT](state) {
    state.user = {}
    DefaultLocalStore.save(state)
  },
  [REFRESH_TOKEN](state, param) {
    state.user.token = param.token;
    state.user.expire = param.expire;
    state.user.lastRefresh = Date.now();
    DefaultLocalStore.save(state)
  },
  [SET_ACTIVE_MENU_INDEX](state, param) { 
    state.activeMenuIndex = param
    DefaultLocalStore.save(state)
  }
}