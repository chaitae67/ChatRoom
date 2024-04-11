<template>
  <div class="message-container" ref="messageContainer">
    <!-- messages 대신 receive를 사용합니다. -->
    <div v-for="(message, index) in receive" :key="index"
        :class="{'my-message': false, 'other-message': true}">
      <template v-if="message.type === 'text'">{{ message.chat }}</template>
      <template v-else-if="message.type === 'image'">
        <img :src="message.image" alt="Received Image" class="sent-image">
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageContainerRecieve',
  props: {
    // props 이름을 messages에서 receive로 변경합니다.
    receive: {
      type: Array,
      required: true
    }
  },
  methods: {
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      container.scrollTop = container.scrollHeight;
    }
  },
  watch: {
    receive() {
      this.$nextTick(this.scrollToBottom);
    }
  },
};
</script>
