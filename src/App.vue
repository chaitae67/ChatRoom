// App.vue

<template>

  <router-view></router-view>

  <Chat :userName="userName" :profilePicture="profilePicture" />
</template>

<script>
import Chat from './components/ChatRoom.vue';
import socket from '../server.js';

export default {
  components: {
    Chat: Chat,
  },
  data() {
    return {
      userName: null,
      profilePicture: 'profile.jpg', // 프로필 이미지 경로 설정
      newMessage: ''
    };
  },
  mounted() {
    this.askUserName();
  },
  methods: {
    /*askUserName() {
      this.userName = prompt('당신의 이름을 입력하세요');
      console.log('User name:', this.userName);
      // 로그인 이벤트 발생 및 사용자 정보 전달
      socket.emit("login", this.userName, (res) => {
        if (res?.ok) {
          console.log('User logged in:', res.data);
        }
      });
    },*/
  }
};
</script>

<style scoped>  
* {
  font-family: 'Pretendard Variable';
}
 
</style>
