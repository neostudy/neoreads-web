import { SELECT_CONTEXT } from './types';


export default {
  [SELECT_CONTEXT](state, param) {
    state.selectContext = param;
  },
}