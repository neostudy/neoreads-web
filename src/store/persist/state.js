import { DefaultLocalStore} from './local';

const state = DefaultLocalStore.get() || {
    userfont: 12,
    isRuby: false,
    activeMenuIndex: '/home',
    user: {
      token: '',
      expire: '',
      username: '',
      lastRefresh: 0
    }
}

export default state