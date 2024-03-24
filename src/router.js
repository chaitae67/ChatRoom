import { createRouter, createWebHistory } from 'vue-router';
import Header from './components/Header.vue';
import Chat from './components/ChatRoom.vue';
import Main from './components/MainPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/header',
      name: 'header',
      component: Header,
    },

    {
        path: '/chat',
        name: 'chat',
        component: Chat,
      },

    {
        path: '/',
        name: 'main',
        component: Main,
    },
  ],
});

export default router;
