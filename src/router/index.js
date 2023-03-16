import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        index: 1,
        requireAuth:true
      }
    },
    {
      path: '/type',
      name: 'type',
      component: () => import('@/views/typeSelect.vue'),
      meta: {
        index: 1,
        requireAuth:true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register.vue'),
      meta: {
        index: 1,
        requireAuth:false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue'),
      meta: {
        index: 1,
        requireAuth:false
      }
    },

  ]
})

export default router

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (to.meta.requireAuth && !token) {
    next('/login') 
  }
  next()
})
