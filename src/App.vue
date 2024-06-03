<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/navBar.vue'
</script>

<template>
  <Navbar />
  <header></header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
