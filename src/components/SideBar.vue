<template>
  <div>
    <nav class="sidebar">
        <img src="../assets/profile.png" class="profile">
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  padding: 20px 13px;
  width: 72px;
  height: calc(100vh - 140px); /* 화면 높이에서 하단 헤더의 높이를 뺍니다 */
  background-color: rgb(45, 168, 55);
  overflow-y: auto; /* 스크롤이 필요한 경우에만 스크롤 표시 */
}

.profile {
  box-shadow: 0px 0px 0 2px var(--seed-scale-color-gray-200), 0px 0px 0 4px rgba(52, 175, 83, 0.712);
  border: 1px solid var(--profile-image-border);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  margin-left: auto;
  margin-right: auto;
}
</style>