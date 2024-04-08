// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state() {
    return {
      userId: '',
      nickname: '',
      isLoggedIn: false,
    };
  },
  mutations: {
    userinfo(state, userData){
      state.userId = userData.userId;
      state.nickname = userData.nickname;
      state.isLoggedIn = true;
    },
    LOGOUT(state){
      state.userId = '';
      state.nickname = '';
      state.isLoggedIn = false;
    }
  },
  actions: {
    login({commit}, {userId,nickname}) {
      axios.post('https://bffff47d-e1e7-4df4-b2b7-a2e0f871fe53.mock.pstmn.io', {
        userId,
        nickname,
      })
      .then(response => {
        console.log('로그인 성공:', response);
        const userData = {
          userId: response.data.userId,
          nickname: response.data.nickname,
        };
        commit('userinfo', userData);
      })
      .catch(error => {
        console.error('로그인 실패:', error);
        throw error;
      });
    },

    logout({commit}){
      commit('LOGOUT');
      console.log('로그아웃 되었습니다')
    }
  }
});
