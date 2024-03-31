import { createRouter, createWebHistory } from 'vue-router';
import Header from './components/Header.vue';
import Chat from './components/ChatRoom.vue';
import Main from './components/MainPage.vue';
import LogIn from './components/LogIn.vue';
import SignUp from './components/SignUp.vue';

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
    {
      path: '/LogIn',
      name: 'login',
      component: LogIn,
  },
  {
    path: '/SignUp',
    name: 'signup',
    component: SignUp,
  }
  ],
});

export default router;
