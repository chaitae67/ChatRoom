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
      return new Promise((resolve, reject) => { // Promise 생성
        axios.post('http://220.69.241.101:3001/login', {
          userId,
          userPassword,
        })
        .then(response => {
          // 로그인 성공 처리
          console.log('로그인 성공:', response);
          const userData = {
            userId: response.data.response.userId,
            nickname: response.data.response.nickname,
          };
          commit('userinfo', userData);
          resolve(response); // 성공적으로 완료
        })
        .catch(error => {
          console.error('로그인 실패:', error);
          reject(error); // 실패 처리
        });
      });
    },

    logout({commit}){
      commit('LOGOUT');
      console.log('로그아웃 되었습니다')
    }
  }
});