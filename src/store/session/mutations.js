import { SELECT_CONTEXT, SET_CHAPID } from './types';


export default {
  [SELECT_CONTEXT](state, param) {
    state.selectContext = param;
  },
  [SET_CHAPID](state, param) {
    state.selectContext.pos.bookid = param.bookid;
    state.selectContext.pos.chapid = param.chapid;
  },
}