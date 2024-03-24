// main.js

import { createApp } from 'vue'
import App from './App.vue'
import socket from "../server.js";
import router from './router'

const app = createApp(App);

app.use(router); 

app.config.globalProperties.$socket = socket;

// 새로운 메시지가 수신되면 화면에 출력
socket.on('message', (message) => {
  console.log('Received message:', message);
  // 이 부분에서 받은 메시지를 화면에 출력하거나 처리할 수 있습니다.
});

app.mount('#app');
