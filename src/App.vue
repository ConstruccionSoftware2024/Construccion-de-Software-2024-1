<template>
  <div id="app">
    <Header />
    <Navbar />
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Header,
    Navbar
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 20px;
}

.content > * {
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
}
</style>
