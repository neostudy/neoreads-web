import { SAVE_TOKEN, SAVE_EXPIRE, LOG_OUT } from './types';
import { DefaultLocalStore } from './local';


export default {
  [SAVE_TOKEN](state, obj) {
    state.token = obj;
    DefaultLocalStore.save(state)
  },
  [SAVE_EXPIRE](state, obj) {
    state.expire = obj;
    DefaultLocalStore.save(state)
  },
  [LOG_OUT](state) {
    console.log("logging out in mutations:")
    state.token = ''
    state.expire = ''
    DefaultLocalStore.save(state)
  }
}