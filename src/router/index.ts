import { createRouter, createWebHistory } from 'vue-router'
import aboutMe from '@/views/aboutMe.vue'
export default createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/me',
      component: aboutMe,
    },
  ]
})
