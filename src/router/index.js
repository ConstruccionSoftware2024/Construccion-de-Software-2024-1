import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RevisionesView from '../views/RevisionesView.vue'
import InvitarAlumnos from '@/components/InvitarAlumnos.vue'

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
      path: '/revisiones',
      name: 'revisiones',
      component: RevisionesView
    },
    {
      path: '/invitar-alumnos',
      name: 'invitar-alumnos',
      component: InvitarAlumnos
    },
    {
      path:'/newsession',
      name: 'create',
      component: () => import('../views/CrearSesion.vue')
    },
    {
      path:'/session',
      name: 'sesion',
      component: () => import('../views/Sesion.vue')
    }
  ]
})

export default router
