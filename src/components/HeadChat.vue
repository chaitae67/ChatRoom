<template>
  <div class="container">
    <img src="../assets/buybye.png" alt="바이바이" class="bblogo">
    <button @click="leaveChat">나가기</button>
  </div>
</template>

<script>
export default {
  name: 'HeadChat',
  methods: {
    leaveChat() {
      // 채팅에서 나가는 기능을 구현할 수 있습니다.
      console.log('채팅에서 나갑니다.');
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 0px 8px;
  border-bottom: 1px solid #dee2e6;
  height: 60px;
  -webkit-locale: auto;
}

.bblogo {
  height: 60px;
  padding: 40px;
}
</style>
