import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/VistasGrupoJoaquin/HomeView.vue'
import ListaAlumnos from '@/components/ComponentesGrupoClaudio/ListaAlumnos.vue'
import HistorialAlumno from '../views/VistasGrupoFelipe/HistorialAlumno.vue'
import InicioSesion from '@/components/ComponentesGrupoFelipe/InicioSesion.vue'
import ComponenteModulos from '../components/ComponentesGrupoFelipe/ComponenteModulos.vue'
import ComponenteOpciones from '@/components/ComponentesGrupoFelipe/ComponenteOpciones.vue'
import CrearEvaluacion from '@/components/ComponentesGrupoFelipe/CrearEvaluacion.vue'
import HistorialEvaluaciones from '@/components/ComponentesGrupoFelipe/HistorialEvaluaciones.vue'
import VistaAlumno from '../views/VistasGrupoJoaquin/VistaAlumno.vue'
import VistaEvaluacion from '../views/VistasGrupoFelipe/VistaEvaluacion.vue'
import RevisionesView from '../views/VistasGrupoClaudio/RevisionesView.vue'
import InvitarAlumnos from '@/components/ComponentesGrupoClaudio/InvitarAlumnos.vue'
import FaltaAlumnos from '@/views/VistasGrupoClaudio/FaltaAlumnos.vue'
import ProfileView from '@/views/VistasGrupoClaudio/ProfileView.vue'
import VistaProfesor from '@/views/VistasGrupoJoaquin/VistaProfesor.vue'
import VisualizarUrl from '@/views/VistasGrupoJoaquin/VisualizarUrl.vue'
import AboutView from '@/views/VistasGrupoClaudio/AboutView.vue'
import SesionesAlumnos from '../components/ComponentesGrupoJoaquin/ComponenteSesionesAlum.vue'
import navegacion from '../components/ComponentesGrupoFelipe/navegacion.vue'
import asignaturas from '../components/ComponentesGrupoFelipe/ListaAsignaturas.vue'
import AsignaturaAlumno from '../components/ComponentesGrupoFelipe/AsignaturaAlumno.vue'
import notFound from '../components/ComponentesGrupoFelipe/notFound.vue'
import VistaAlumno1 from '../views/VistasGrupoJoaquin/VistaAlumno1.vue'
import { useThemeStore, useUserStore } from '/back-end/src/store.js';
import Mensajes from '../views/VistasGrupoClaudio/Mensajes.vue'
import Configuracion from '@/views/VistasGrupoClaudio/Configuracion.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/listaAsignaturas',
      name: 'asignaturas',
      component: asignaturas,
      meta: { requiresAuth: true }
    },
    {
      path: '/visualizarUrl',
      name: 'VisualizarUrl',
      component: VisualizarUrl
    },
    {
      path: '/modulos',
      name: 'modulos',
      component: ComponenteModulos,
      meta: { requiresAuth: true }
    },
    {
      path: '/sesionesAlum',
      name: 'sesionesAlum',
      component: SesionesAlumnos,
      meta: { requiresAuth: true }
    },
    {
      path: '/opciones',
      name: 'opciones',
      component: ComponenteOpciones,
      meta: { requiresAuth: true }
    },
    {
      path: '/historialevaluaciones',
      name: 'historialevaluaciones',
      component: HistorialEvaluaciones,
      meta: { requiresAuth: true }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/revisiones',
      name: 'revisiones',
      component: RevisionesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/ComponentesGrupoJoaquin/loginView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../components/ComponentesGrupoJoaquin/SettingsPerfil.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/invitar-alumnos',
      name: 'invitar-alumnos',
      component: InvitarAlumnos,
      meta: { requiresAuth: true }
    },
    {
      path: '/session',
      name: 'sesion',
      component: () => import('../views/VistasGrupoClaudio/Sesion.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/crear-evaluacion/:sesionId',
      name: 'CrearEvaluacion',
      component: CrearEvaluacion,
      meta: { requiresAuth: true }
    },
    {
      path: '/vistaProfesor/:id',
      name: 'VistaProfesor',
      component: VistaProfesor,
      meta: { requiresAuth: true }
    },
    {
      path: '/vistaAlumno/:id',
      name: 'VistaAlumno',
      component: VistaAlumno,
      meta: { requiresAuth: true }
    },
    {
      path: '/vistaEvaluacion/:id',
      name: 'VistaEvaluacion',
      component: VistaEvaluacion,
      meta: { requiresAuth: true }
    },
    {
      path: '/faltaAlumnos/:id',
      name: 'FaltasAlumnos',
      component: FaltaAlumnos,
      meta: { requiresAuth: true }
    },
    {
      path: '/lista-alumnos',
      name: 'lista-alumnos',
      component: ListaAlumnos,
      meta: { requiresAuth: true }
    },
    {
      path: '/historial',
      name: 'historial',
      component: () => import('../views/VistasGrupoFelipe/HistorialAlumno.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/vistaalumno',
      name: 'vista-alumno',
      component: VistaAlumno,
      meta: { requiresAuth: true }
    },
    {
      path: '/vistaalumno1',
      name: 'vista-alumno1',
      component: VistaAlumno1,
      meta: { requiresAuth: true }
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/navegacion',
      name: 'navegacion',
      component: () => import('../components/ComponentesGrupoFelipe/navegacion.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/HistorialSesiones',
      name: 'HistorialSesiones',
      component: () => import('../components/ComponentesGrupoFelipe/HistorialSesiones.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/VistasGrupoFelipe/about.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/VistasGrupoFelipe/contact.vue')
    },
    {
      path: '/asignaturaProfesor/:id',
      name: 'asignatura',
      component: () => import('../views/VistasGrupoClaudio/AsignaturaProfesor.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/asignaturaAlumno/:id',
      name: 'asignaturaAlumno',
      component: AsignaturaAlumno,
      meta: { requiresAuth: true }
    },
    {
      path: '/:catchAll(.*)/',
      name: 'not-found',
      component: notFound
    },
    {
      path: '/ContactoAlumno',
      name: 'contactoalumno',
      component: () => import('../views/VistasGrupoFelipe/ContactoAlumno.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/VerForo',
      name: 'VerForo',
      component: () => import('../views/VistasGrupoFelipe/VerForo.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mensajes',
      name: 'mensajes',
      component: Mensajes,
      meta: { requiresAuth: true }
    },
    {
      path: '/configuracion',
      name: 'configuracion',
      component: Configuracion,
      meta: { requiresAuth: true }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const userStore = useUserStore()

  if (requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
