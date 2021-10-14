import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Quiz from './views/Quiz.vue'
import Leaderboard from './views/Leaderboard.vue'
import TakeQuiz from './views/TakeQuiz.vue'
import Admin from './views/Admin.vue'
import Protected from './views/Protected.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard
    },
    {
      path: '/quiz/:id',
      name: 'take_quiz',
      component: TakeQuiz,
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin/protected',
      name: 'protected',
      component: Protected,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
