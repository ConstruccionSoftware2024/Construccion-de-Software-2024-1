import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListaAlumnos from '@/components/ListaAlumnos.vue'
import HistorialAlumno from '../views/HistorialAlumno.vue'
import InicioSesion from '@/components/InicioSesion.vue'
import ComponenteModulos from '@/components/ComponenteModulos.vue'
import ComponenteOpciones from '@/components/ComponenteOpciones.vue'
import CrearEvaluacion from '@/components/CrearEvaluacion.vue'
import HistorialEvaluaciones from '@/components/HistorialEvaluaciones.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'InicioSesion',
      component: InicioSesion
    },

    {
      path: '/modulos',
      name: 'modulos',
      component: ComponenteModulos
    },
    {
      path: '/opciones',
      name: 'opciones',
      component: ComponenteOpciones
    },
    {
      path: '/historialevaluaciones',
      name: 'historialevaluaciones',
      component: HistorialEvaluaciones
    },
    {
      path: '/crearevaluacion',
      name: 'crearevaluacion',
      component: CrearEvaluacion
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
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
