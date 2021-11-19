import Vue from 'vue'
import store from '../store/store'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import QuizPage from '../views/QuizPage.vue'
import CreateQuizPage from '../views/CreateQuizPage.vue'
import SettingsPage from '../views/SettingsPage.vue'

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
    path: '/quiz',
    name: 'Quiz',
    component: QuizPage,
    beforeEnter: (to, from, next) => {
      if(store.state.loggedInStudent == false) {
          next(false);
      } else {
          next();
      }
  }
  },
  {
    path: '/createquiz',
    name: 'CreateQuiz',
    component: CreateQuizPage,
    beforeEnter: (to, from, next) => {
      if(store.state.loggedInTeacher == false) {
          next(false);
      } else {
          next();
      }
  }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,

  }
]

const router = new VueRouter({
  routes
})

export default router
