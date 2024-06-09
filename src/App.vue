<template>
  <div id="app">
    <Navbar />
    <div class="main-content">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useThemeStore } from '../back-end/src/store.js'
import Navbar from './components/ComponentesGrupoJoaquin/navBar.vue'
import Footer from './components/ComponentesGrupoJoaquin/Footer.vue'
import { RouterView } from 'vue-router'

const themeStore = useThemeStore()

const themeClass = computed(() => (themeStore.isDarkMode ? 'dark-mode' : 'light-mode'))

watch(themeClass, (newClass) => {
  document.body.className = newClass
})

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    themeStore.isDarkMode = savedTheme === 'dark'
  }
  document.body.className = themeClass.value
})

const toggleTheme = () => {
  themeStore.toggleDarkMode()
  localStorage.setItem('theme', themeStore.isDarkMode ? 'dark' : 'light')
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

footer {
  flex-shrink: 0;
}
</style>
