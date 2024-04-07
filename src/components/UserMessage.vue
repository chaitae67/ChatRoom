<template>
    <div class="user-message message">
      <!-- 조건부 렌더링으로 텍스트와 이미지 표시 -->
      <div v-if="message.text">{{ message.text }}</div>
      <img v-if="message.file" :src="message.file" class="message-image" />
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
  .message {
    display: flex; flex-direction: column;
    margin-bottom: 10px; /* 메시지 간격 조절 */
    word-wrap: break-word;
    max-width: 50%;
    width: auto; /* 내용에 따라 너비 조절 */
    background-color: #f1f0f0;
    padding: 10px;
    border-radius: 12px; 
    min-width: 20%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 선택적: 그림자 효과 추가 */
  }
  
  .user-message {
    background-color: #4B8A08;
    color: white;
    margin-left: auto; /* 사용자 메시지 오른쪽 정렬 */
  }
  
  .message-time {
    font-size: 0.75rem;
    text-align: right;
    opacity: 0.6;
  }
  
  .message-image {
    max-width: 100%; /* 이미지가 메시지 박스를 넘어가지 않도록 */
    border-radius: 8px; /* 이미지의 모서리를 둥글게 */
    margin-top: 8px; /* 이미지와 텍스트 사이의 간격 조정 */
  }
  </style>
  