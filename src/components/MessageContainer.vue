<template>
    <div class="message-container" ref="messageContainer">
      <div v-for="(message, index) in messages" :key="index"
          :class="message.fromMe ? 'my-message' : 'other-message'">
        <template v-if="message.type === 'text'">{{ message.text }}</template>
        <template v-else>
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
      this.$nextTick(this.scrollToBottom);
    }
  },
  methods: {
    scrollToBottom() {
      const container = this.$el;
      container.scrollTop = container.scrollHeight;
    }
  }
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
      margin-left: auto;
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
  