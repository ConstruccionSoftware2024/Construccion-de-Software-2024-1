<script setup>
import { computed, watch, onMounted } from 'vue'
import { useThemeStore } from '../back-end/src/store.js'
import Navbar from './components/navBar.vue'
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
