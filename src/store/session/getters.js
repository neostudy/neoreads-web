
export default {
  select(state) {
    return state.selectContext;
  },
  chapter(state) {
    console.log("state: ", state)
    console.log("gettting: ", state.chapter)
    return state.chapter;
  },
  activeWorksMenu(state) {
    return state.works.activeMenu;
  }
}