// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      user: {
        id: '',
        nickname: ''
      }
    };
  },
  mutations: {
    userinfo(state, userData) {
      state.user.id = userData.id;
      state.user.nickname = userData.nickname;
    }
  },
  actions: {
  }
});
