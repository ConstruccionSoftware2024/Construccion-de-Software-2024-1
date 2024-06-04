import { createRouter, createWebHistory } from 'vue-router'
import 'material-icons/iconfont/material-icons.css'
import HomeView from '../views/HomeView.vue'
import ListaAlumnos from '@/components/ListaAlumnos.vue'
import HistorialAlumno from '../views/HistorialAlumno.vue'
import InicioSesion from '@/components/InicioSesion.vue'
import ComponenteModulos from '@/components/ComponenteModulos.vue'
import ComponenteOpciones from '@/components/ComponenteOpciones.vue'
import CrearEvaluacion from '@/components/CrearEvaluacion.vue'
import HistorialEvaluaciones from '@/components/HistorialEvaluaciones.vue'
import VistaAlumno from '../views/VistaAlumno.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Home.vue')
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
    },
    {
      path: '/alumnovista',
      name: 'vista-alumno',
      component: VistaAlumno
      path: '/PagesHistory',
      name: 'History',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PagesHistory.vue')
    },
    {
      path: '/Perfil',
      name: 'Perfil de Usuario',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Perfil.vue')
    },
    {
      path: '/Desconectados',
      name: 'Lista de Usuarios Desconectados',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Desconectados.vue')
    },
    {
      path: '/Conectados',
      name: 'Lista de Usuarios Conectados',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Conectados.vue')
    },
    {
      path: '/Aviso',
      name: 'Aviso alumno',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Aviso.vue')
    }
  ]
})

export default router
