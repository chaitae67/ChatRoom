<template>
  <div class="container">
    <img src="../assets/buybye.png" alt="바이바이" class="bblogo">
    <button class="out">나가기</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 100px); /* 화면 폭에서 오른쪽 여백만큼 빼서 너비를 조정합니다. */
  border-bottom: 1px solid #dee2e6;
  height: 50px;
  -webkit-locale: auto;
  width: 100%;
}

.bblogo {
  height: 60px;
  margin-left: 300px;
  margin-bottom:10px
}

.out {
  padding: 8px 15px;
  background-color: #04B404;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size:16px;
  margin-bottom:10px;
  margin-right:300px
}
</style>
