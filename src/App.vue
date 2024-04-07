<template>
  <div id="app">
    <HeadChat/>
    <ChatApp/>
  </div>

</template>

<script>
import HeadChat from './components/HeadChat.vue';
import ChatApp from './components/ChatApp.vue';

export default {
  name: 'App',
  components: {
    HeadChat,
    ChatApp,
  },
  data(){
    return{};
  },
};
</script>

<style scoped>
.chat-app {
  font-family: Arial, sans-serif;
  text-align: center;
}

/* 화면 너비가 768px 이하일 때 */
@media (max-width: 768px) {
  .chat-app {
    /* 반응형 스타일 */
  }
}

/* 화면 너비가 768px보다 큰 경우 */
@media (min-width: 769px) {
  .chat-app {
    /* 반응형 스타일 */
  }
}
</style>
