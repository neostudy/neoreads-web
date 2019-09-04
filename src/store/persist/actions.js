import {LOG_IN, LOG_OUT, REFRESH_TOKEN, SET_ACTIVE_MENU_INDEX} from './types'

export default {
  login: ({commit}, param) => commit(LOG_IN, param),
  logout: ({commit}) => commit(LOG_OUT),
  refreshToken: ({commit}, param) => commit(REFRESH_TOKEN, param),
  setActiveMenuIndex: ({commit}, param) => commit(SET_ACTIVE_MENU_INDEX, param)
}