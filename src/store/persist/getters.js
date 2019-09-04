
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
  tokenSince(state) {
    return Date.now() - state.user.lastRefresh;
  },
  expireIn(state) {
    let exp = state.user.expire;
    if (exp) {
      return new Date(exp).getTime() - Date.now()
    }
  },
  user(state) {
    return JSON.stringify(state.user, null, '  ');
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