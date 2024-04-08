<template>
  <div class="other-message ">
    <!-- 텍스트 메시지 표시 -->
    <div v-if="message.text">{{ message.text }}</div>
    <!-- 이미지가 있는 경우 이미지 표시 -->
    <img v-if="message.file" :src="message.file" class="message-image" alt="Message Image" />
    <span class="timestamp">{{ formattedTimestamp }}</span>
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
  display: flex;
  flex-direction: column;
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

.other-message {
  background-color: #f1f0f0;
  margin-right: auto; /* 상대방 메시지 왼쪽 정렬 */
  text-align: left;
  border: 1px solid #4B8A08;
}

.timestamp {
  display: block;
  font-size: 0.75rem;
  margin-top: 5px;
}

.message-image {
  max-width: 100%; /* 이미지가 메시지 박스를 넘어가지 않도록 조절 */
  border-radius: 8px; /* 이미지 모서리 둥글게 */
  margin-top: 8px; /* 이미지와 텍스트 사이 간격 */
}
</style>
