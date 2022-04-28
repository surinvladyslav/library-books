import {createRouter, createWebHistory} from 'vue-router'
import Books from "@/views/Books";
import Login from "@/views/Login";
import AboutBook from "@/components/AboutBook";
import Admin from "@/views/Admin";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    // meta: {auth: true},
    component: Admin
  },
  {
    name: 'books',
    path: '/',
    component: Books,
  },
  {
    path: '/books/:id',
    name: 'book',
    component: AboutBook
  },
  {
    path: '/:NotFound(.*)*',
    component: Books
  }
]

const router = createRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('accessToken');
  if (to.fullPath === '/admin') {
    if (user) {
      return next();
    }
    return next('/login');
  }
  return next()
})


router.afterEach((to, from, next) => {
})


export default router
