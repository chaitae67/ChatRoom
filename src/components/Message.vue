<template>
    <div class="user-message message">
      {{ message.text }}
      <div class="message-time">{{ formattedTimestamp }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['message'],
    computed: {
      formattedTimestamp() {
        return new Date(this.message.timestamp).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .user-message {
    background-color: #d1eaff;
    margin-left: auto;
    margin-right: 20px; /* 메시지 간격 조절 */
    text-align: left;
    border-radius: 12px;
    padding: 10px;
    word-wrap: break-word;
    max-width: 60%;
  }
  
  .message-time {
    font-size: 0.75rem;
    text-align: right;
    opacity: 0.6;
  }
  </style>
  