<template>
  <div class="message-container" ref="messageContainer">
    <div v-for="(message, index) in messages" :key="index"
        :class="message.fromMe ? 'my-message' : 'other-message'">
      <template v-if="message.type === 'text'">{{ message.text }}</template>
      <template v-else-if="message.type === 'image'">
        <img :src="message.image" alt="Sent Image" class="sent-image" @load="scrollToBottom">
      </template>
    </div>
  </div>
</template>

  
<script>
export default {
  name: 'MessageContainer',
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  watch: {
    messages() {
      // 메시지 배열이 변경될 때마다 화면의 스크롤을 아래로 내립니다.
      this.$nextTick(this.scrollToBottom);
    }
  },
  methods: {
    scrollToBottom() {
      // 스크롤을 가장 아래로 내리는 메서드입니다.
      const container = this.$refs.messageContainer;
      container.scrollTop = container.scrollHeight;
    }
  },
};
</script>


  
  <style scoped>
  .message-container {
      flex-grow: 1;
      overflow-y: auto;
      padding: 0 10px;
  }
  
  .my-message {
      background-color: #dcf8c6;
      padding: 10px;
      border-radius: 10px;
      max-width: 70%;
      word-wrap: break-word;
      align-self: flex-end;
      margin-right: auto;
      margin-top: 10px;
  }
  
  .other-message {
      background-color: #e6e6e6;
      padding: 10px;
      border-radius: 10px;
      max-width: 70%;
      word-wrap: break-word;
  }
  
  .sent-image {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 0 auto;
  }
  </style>
  