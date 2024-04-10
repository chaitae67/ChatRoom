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


</style>
