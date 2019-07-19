import { DefaultLocalStore} from './local';

const state = DefaultLocalStore.get() || {
    userfont: 12,
    isRuby: false,
    activeMenuIndex: '/home',
    user: {}
}

export default state