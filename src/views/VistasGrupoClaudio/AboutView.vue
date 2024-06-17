<template>
  <div class="about">
    <h1>Pagina temporal de pruebas</h1>
    <div v-if="user">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Nombre de Usuario:</strong> {{ user.username }}</p>
      <p><strong>Nombre:</strong> {{ user.firstName }}</p>
      <p><strong>Apellido:</strong> {{ user.lastName }}</p>
      <p><strong>Segundo Apellido:</strong> {{ user.secondLastName }}</p>
      <p><strong>Campus:</strong> {{ user.campus }}</p>
      <p><strong>Carrera:</strong> {{ user.major }}</p>
    </div>
    <div v-else>
      <p>No user data available.</p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../../../back-end/src/store.js'
import { computed } from 'vue'

export default {
  setup() {
    const userStore = useUserStore();
    const user = computed(() => userStore.user);
    return {
      user
    }
  }
}
</script>

<style scoped>
body {
  height: 90vh;
}
</style>
