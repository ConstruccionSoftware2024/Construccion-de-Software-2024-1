import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FaltaAlumnos from '@/views/FaltaAlumnos.vue'
import EstadoAlumnos from '@/components/EstadoAlumnos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/faltas-alumnos',
      name: 'FaltasAlumnos',
      component: FaltaAlumnos
    },
    {
      path: '/estado-alumnos',
      name: 'EstadoAlumnos',
      component: EstadoAlumnos
    }
  ]
})

export default router
