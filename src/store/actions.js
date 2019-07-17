import {SAVE_TOKEN, LOG_OUT, SAVE_EXPIRE} from './types'

export default {
  saveToken: ({commit}, param) => commit(SAVE_TOKEN, {token: param}),
  saveExpire: ({commit}, param) => commit(SAVE_EXPIRE, {token: param}),
  logout: ({commit}) => commit(LOG_OUT)
}