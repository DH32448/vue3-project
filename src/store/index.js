import { createStore } from 'vuex';

const store = createStore({
    state: {
        token: '',
        name: '',
        pic: '',
        roleName: '',
        err: '',
        errTime: 0,
        pagenum: 1,
        goods: {}
    },
    mutations: {
        show(state, msg) {
            state.err = msg;
            state.errTime = Date.now();
        }
    }
});

export default store;
