import {SELECT_CONTEXT} from './types'

export default {
  selectContext: ({commit}, param) => commit(SELECT_CONTEXT, param),
}