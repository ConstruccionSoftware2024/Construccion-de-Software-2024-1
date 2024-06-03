<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/navBar.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <div class="main-content">
      <RouterView />
    </div>
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
  height: 90vh;
}
</style>