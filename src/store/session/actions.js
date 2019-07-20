import {SELECT_CONTEXT} from './types'

export default {
  select: ({commit}, param) => commit(SELECT_CONTEXT, param),
}