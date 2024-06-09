<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '../back-end/src/store.js';
import Navbar from './components/ComponentesGrupoJoaquin/navBar.vue';
import { RouterView } from 'vue-router';

const themeStore = useThemeStore();
const router = useRouter();

// Cambiar tema
const toggleTheme = () => {
  themeStore.toggleDarkMode();
  localStorage.setItem('theme', themeStore.isDarkMode ? 'dark' : 'light');
};

// Observar cambios en el tema y aplicarlos al cuerpo del documento
onMounted(() => {
  const themeClass = () => (themeStore.isDarkMode ? 'dark-mode' : 'light-mode');
  const applyThemeClass = (newClass) => {
    document.body.className = newClass;
  };

  // Aplicar el tema actual al cargar la aplicación
  applyThemeClass(themeClass());

  // Observar cambios en el tema y aplicarlos
  themeStore.$watch('isDarkMode', (newVal) => {
    applyThemeClass(themeClass());
  });
});

// Registro de URLs visitadas internas
router.beforeEach((to, from, next) => {
  const currentUrl = to.fullPath;
  console.log('URL interna actual:', currentUrl);
  next();
});

// Registro de URLs visitadas externas
window.addEventListener('beforeunload', function (event) {
  const currentUrl = window.location.href;
  console.log('URL externa actual:', currentUrl);
});
</script>

<template>
  <div id="app">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex: 1 0 auto;
  min-height: 90vh;
}
</style>