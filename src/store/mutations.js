import { LOG_IN, LOG_OUT, SET_ACTIVE_MENU_INDEX } from './types';
import { DefaultLocalStore } from './local';


export default {
  [LOG_IN](state, param) {
    state.user = param;
    DefaultLocalStore.save(state)
  },
  [LOG_OUT](state) {
    state.user = {}
    DefaultLocalStore.save(state)
  },
  [SET_ACTIVE_MENU_INDEX](state, param) { 
    state.activeMenuIndex = param
    console.log("saving menu index:", param)
    DefaultLocalStore.save(state)
  }
}