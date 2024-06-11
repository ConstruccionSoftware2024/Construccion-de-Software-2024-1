import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/VistasGrupoJoaquin/HomeView.vue'
import ListaAlumnos from '@/components/ComponentesGrupoClaudio/ListaAlumnos.vue'
import HistorialAlumno from '../views/VistasGrupoFelipe/HistorialAlumno.vue'
import InicioSesion from '@/components/ComponentesGrupoFelipe/InicioSesion.vue'
import ComponenteModulos from '../components/ComponentesGrupoFelipe/ComponenteModulos.vue'
import ComponenteOpciones from '@/components/ComponentesGrupoFelipe/ComponenteOpciones.vue'
import CrearEvaluacion from '@/components/ComponentesGrupoFelipe/CrearEvaluacion.vue'
import HistorialEvaluaciones from '@/components/ComponentesGrupoFelipe/HistorialEvaluaciones.vue'
import VistaAlumno from '../views/VistasGrupoFelipe/VistaAlumno.vue'
import RevisionesView from '../views/VistasGrupoClaudio/RevisionesView.vue'
import InvitarAlumnos from '@/components/ComponentesGrupoClaudio/InvitarAlumnos.vue'
import FaltaAlumnos from '@/views/VistasGrupoClaudio/FaltaAlumnos.vue'
import EstadoAlumnos from '@/views/VistasGrupoClaudio/EstadoAlumnos.vue'
import VistaProfesor from '@/views/VistasGrupoJoaquin/VistaProfesor.vue'
import AboutView from '@/views/VistasGrupoClaudio/AboutView.vue'
import SesionesAlumnos from '../components/ComponentesGrupoJoaquin/ComponenteSesionesAlum.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },

    {
      path: '/vistaProfesor',
      name: 'VistaProfesor',
      component: VistaProfesor
    },

    {
      path: '/about',
      name: 'AboutView',
      component: AboutView
    },

    {
      path: '/modulos',
      name: 'modulos',
      component: ComponenteModulos
    },
    {
      path: '/sesionesAlum',
      name: 'sesionesAlum',
      component: SesionesAlumnos
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
      path: '/revisiones',
      name: 'revisiones',
      component: RevisionesView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/ComponentesGrupoJoaquin/loginView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../components/ComponentesGrupoJoaquin/SettingsPerfil.vue')
    },
    {
      path: '/invitar-alumnos',
      name: 'invitar-alumnos',
      component: InvitarAlumnos
    },
    {
      path: '/newsession',
      name: 'create',
      component: () => import('../views/VistasGrupoClaudio/CrearSesion.vue')
    },
    {
      path: '/session',
      name: 'sesion',
      component: () => import('../views/VistasGrupoClaudio/Sesion.vue')
    },
    {
      path: '/session/:id',
      name: 'sesionid',
      component: () => import('../views/VistasGrupoClaudio/Sesion.vue'),
      props: true
    },
    {
      path: '/faltaAlumnos',
      name: 'FaltasAlumnos',
      component: FaltaAlumnos
    },
    {
      path: '/estadoAlumnos',
      name: 'EstadoAlumnos',
      component: EstadoAlumnos
    },
    { path: '/lista-alumnos', name: 'lista-alumnos', component: ListaAlumnos },
    {
      path: '/lista-alumnos',
      name: 'lista-alumnos',
      component: () => import('../views/VistasGrupoClaudio/EstadoAlumnos.vue')
    },
    {
      path: '/historial',
      name: 'historial',
      component: () => import('../views/VistasGrupoFelipe/HistorialAlumno.vue')
    },
    {
      path: '/alumnovista',
      name: 'vista-alumno',
      component: VistaAlumno
    },
    {
      path: '/historial',
      name: 'historial',
      component: () => import('../views/VistasGrupoFelipe/HistorialAlumno.vue')
    }
  ]
})

export default router;