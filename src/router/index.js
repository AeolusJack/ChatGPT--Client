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
  let islogin = localStorage.getItem("islogin");
  islogin = Boolean(Number(islogin));
  if(to.path == "/login"){
    if(islogin){
      next("/home");
    }else{
      next();
    }
  }else{
    // requireAuth:可以在路由元信息指定哪些页面需要登录权限
    if(to.meta.requireAuth && islogin) {
      next();
    }else{
      next("/login");
    }
  }
})
