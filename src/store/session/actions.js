import {SELECT_CONTEXT, SET_CHAPID} from './types'

export default {
  select: ({commit}, param) => commit(SELECT_CONTEXT, param),
  setChapid: ({commit}, param) => commit(SET_CHAPID, param)
}