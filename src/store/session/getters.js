
export default {
  select(state) {
    return state.selectContext;
  },
  chapter(state) {
    return state.chapter;
  },
  activeWorksMenu(state) {
    return state.works.activeMenu;
  },
  activeNewsMenu(state) {
    return state.news.activeMenu;
  }
}