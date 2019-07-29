import {SELECT_CONTEXT, SET_CHAPID, ADD_FAV, REMOVE_FAV} from './types'

export default {
  select: ({commit}, param) => commit(SELECT_CONTEXT, param),
  setChapid: ({commit}, param) => commit(SET_CHAPID, param),
  addFav: ({commit}, param) => commit(ADD_FAV, param),
  removeFav: ({commit}, param) => commit(REMOVE_FAV, param),
}