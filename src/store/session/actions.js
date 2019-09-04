import { SELECT_CONTEXT, SET_CHAPID, SET_CHAPTER, ADD_FAV, REMOVE_FAV, ADD_NOTE, REMOVE_NOTE, SET_ACTIVE_WORKS_MENU } from './types'

export default {
  select: ({ commit }, param) => commit(SELECT_CONTEXT, param),
  setChapid: ({ commit }, param) => commit(SET_CHAPID, param),
  setChapter: ({ commit }, param) => commit(SET_CHAPTER, param),
  addFav: ({ commit }, param) => commit(ADD_FAV, param),
  removeFav: ({ commit }, param) => commit(REMOVE_FAV, param),
  addNote: ({ commit }, note) => commit(ADD_NOTE, note),
  removeNote: ({ commit }, param) => commit(REMOVE_NOTE, param),

  // works
  setActiveWorksMenu: ({ commit }, param) => commit(SET_ACTIVE_WORKS_MENU, param),
}