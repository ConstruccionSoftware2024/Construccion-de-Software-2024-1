import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListaAlumnos from '@/components/ListaAlumnos.vue'
import HistorialAlumno from '../views/HistorialAlumno.vue'

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
      path: '/lista-alumnos',
      name: 'lista-alumnos',
      component: ListaAlumnos 
    },
    {
      path: '/historial',
      name: 'historial',
      component: () => import('../views/HistorialAlumno.vue')
    }
  ]
})

export default router
