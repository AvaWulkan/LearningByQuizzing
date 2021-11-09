import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import AdminPage from '../views/AdminPage.vue'
import QuizPage from '../views/QuizPage.vue'
import CreateQuizPage from '../views/CreateQuizPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    redirect:{
      name: 'Login'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizPage
  },
  {
    path: '/createquiz',
    name: 'CreateQuiz',
    component: CreateQuizPage
  }
]

const router = new VueRouter({
  routes
})

export default router
