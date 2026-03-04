import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BattleView from '../views/BattleView.vue'
import ErrorPage from '../views/ErrorPage.vue'
import BestHero from '@/views/BestHero.vue'

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
      path: '/best-heroes',
      name: 'best-heroes',
      component: BestHero,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: ErrorPage,
    },
  ],
})

export default router
