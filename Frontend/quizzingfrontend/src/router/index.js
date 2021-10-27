import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/loginpage',
    name: 'LoginPage',
    component: LoginPage
  }
]

const router = new VueRouter({
  routes
})

export default router
