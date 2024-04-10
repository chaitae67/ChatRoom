<template>
  <div class="empty-room">
    <div class="empty-container">
      <img class="chat-logo" src="../assets/pngwing.com.png">
      <p>채팅할 상대를 선택해주세요.</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>


<style scoped>
.empty-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  margin: 0 auto;
  /* 중앙 정렬 */
  height: 100%;
  /* 변경 */
}
.empty-container{
  display: flex;
  flex-direction: column;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  background-color: white;
  padding: 20px; /* 내부 여백 */
}

.chat-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
</style>