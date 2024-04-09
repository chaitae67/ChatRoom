<template>

  <router-view></router-view>

  <!--<Chat :userName="userName" :profilePicture="profilePicture" />-->
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
      
    };
  },
  mounted() {
    
  },
  methods: {
    
  }
};
</script>

<style>
body{
  margin: 0;
}  
* {
  font-family: 'Pretendard Variable';
}
 
</style>
