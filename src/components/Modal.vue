<template>
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  }
  </script>
 
 <style scoped>
 /* 모달 스타일링 */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  max-width: 800px; /* 최대 너비 설정 */
   max-height: 600px; /* 최대 높이 설정 */
   overflow-y: auto; /* 내용이 넘칠 경우 스크롤 가능하도록 설정 */

}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.close:hover {
  transform: rotate(45deg);
}

.button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #45a049;
}
</style>