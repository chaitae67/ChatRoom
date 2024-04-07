<template>
  <div class="container">
    <img src="../assets/buybye.png" alt="바이바이" class="bblogo">
    <button @click="leaveChat" class="out">나가기</button>
  </div>
</template>

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

.out{
    margin-top: 8px;
    padding: 6px 12px;
    background-color: #04B404;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: auto; /* 버튼을 오른쪽으로 이동시킵니다. */
}
</style>
