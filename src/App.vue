<template>
  <div class="d-flex flex-column min-vh-100">
    <BarraNavegacion /> 
    <div class="main-content">
      <RouterView class="flex-grow-1" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BarraNavegacion from './components/BarraNavegacion.vue';
import Footer from './components/Footer.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.min-vh-100 {
  min-height: 100vh;
}

.flex-grow-1 {
  flex-grow: 1;
}

.main-content {
  min-height: 70vh;
  padding: 20px;
}
</style>