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
    login({ commit }, { userId, userPassword }) {
      axios.post('http://220.69.241.101:3001/login', {
        userId,
        userPassword,
      })
      .then(response => {
        console.log('로그인 성공:', response);
        const userData = {
          userId: response.data.response.userId,
          nickname: response.data.response.nickname,
        };
        console.log('userData:', userData);
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