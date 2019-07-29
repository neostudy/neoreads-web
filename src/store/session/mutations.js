import { SELECT_CONTEXT, SET_CHAPID, ADD_FAV, REMOVE_FAV } from './types';


export default {
  [SELECT_CONTEXT](state, param) {
    state.selectContext = param;
  },
  [SET_CHAPID](state, param) {
    console.log("param:", param)
    state.selectContext.pos.bookid = param.bookid;
    state.selectContext.pos.chapid = param.chapid;
    console.log("state:", state.selectContext)
  },
  [ADD_FAV](state, param) {
    state.selectContext.isFav = true;
  },
  [REMOVE_FAV](state, param) {
    state.selectContext.isFav = false;
  }
}