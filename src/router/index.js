import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import healthyTest from '../views/HealthyTest/HealthyView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/healthyTest',
      name: '/healthyTest',
      component: healthyTest
    }
  ]
})

export default router
