
export default {
  token(state) {
    return state.user ? state.user.token : '';
  },
  expire(state) {
    return state.user ? state.user.expire : '';
  },
  username(state) {
    return state.user ? state.user.username : '';
  },
  isAuth(state) {
    return state.user && state.user.token && state.user.token != '';
  },
  activeMenuIndex(state) {
    let idx = state.activeMenuIndex;
    if (!idx) return '/home';
    else return state.activeMenuIndex;
  },
}