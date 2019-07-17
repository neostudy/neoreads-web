import {LOG_IN, LOG_OUT, SET_ACTIVE_MENU_INDEX} from './types'

export default {
  login: ({commit}, param) => commit(LOG_IN, param),
  logout: ({commit}) => commit(LOG_OUT),
  setActiveMenuIndex: ({commit}, param) => commit(SET_ACTIVE_MENU_INDEX, param)
}