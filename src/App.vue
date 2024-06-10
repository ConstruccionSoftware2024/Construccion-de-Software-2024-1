<template>
  <div id="app">
    <main class="content">
      <Navbar />
      <!-- <Header/> -->
      <RouterView />
    </main>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
/* import Header from './components/Header.vue' */
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
    /* Header,*/
  }
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  background-color: #f5f5f5;
  /* DARK MODE background-color: #2F2F33; */
  display: flex;
  align-items: center;
  flex-grow: 1;
}
</style>
