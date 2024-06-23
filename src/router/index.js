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
import { useThemeStore, useUserStore } from '/back-end/src/store.js';

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
      component: asignaturas
    },
    {
      path: '/visualizarUrl',
      name: 'VisualizarUrl',
      component: VisualizarUrl
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
      path: '/session',
      name: 'sesion',
      component: () => import('../views/VistasGrupoClaudio/Sesion.vue')
    },
    {
      path: '/crear-evaluacion/:id',
      name: 'CrearEvaluacion',
      component: CrearEvaluacion
    },
    {
      path: '/vistaProfesor/:id',
      name: 'VistaProfesor',
      component: VistaProfesor
    },
    {
      path: '/vistaAlumno/:id',
      name: 'VistaAlumno',
      component: VistaAlumno
    },
    {
      path: '/faltaAlumnos/:id',
      name: 'FaltasAlumnos',
      component: FaltaAlumnos
    },
    {
      path: '/lista-alumnos',
      name: 'lista-alumnos',
      component: ListaAlumnos
    },
    {
      path: '/historial',
      name: 'historial',
      component: () => import('../views/VistasGrupoFelipe/HistorialAlumno.vue')
    },
    {
      path: '/vistaalumno',
      name: 'vista-alumno',
      component: VistaAlumno
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: ProfileView
    },
    {
      path: '/navegacion',
      name: 'navegacion',
      component: () => import('../components/ComponentesGrupoFelipe/navegacion.vue')
    },
    {
      path: '/historial',
      name: 'historial',
      component: () => import('../views/VistasGrupoFelipe/HistorialAlumno.vue')
    },
    {
      path: '/HistorialSesiones',
      name: 'HistorialSesiones',
      component: () => import('../components/ComponentesGrupoFelipe/HistorialSesiones.vue')
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
      component: () => import('../views/VistasGrupoClaudio/AsignaturaProfesor.vue')
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
      component: () => import('../views/VistasGrupoFelipe/ContactoAlumno.vue')
    },
    {
      path: '/VerForo',
      name: 'VerForo',
      component: () => import('../views/VistasGrupoFelipe/VerForo.vue')
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



export default router;