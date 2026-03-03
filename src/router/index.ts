import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BattleView from '../views/BattleView.vue'
import ErrorPage from '../views/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/battle',
      name: 'battle',
      component: BattleView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: ErrorPage,
    },
  ],
})

export default router
