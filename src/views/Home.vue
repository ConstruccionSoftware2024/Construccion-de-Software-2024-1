<template>
  <div class="home-container">
    <h1>Bienvenido</h1>
    <RouterLink to="/login">Ir al LogIn</RouterLink>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-container {
  height: 92vh;
  width: 92vw;
  background-image: url('@/assets/Ingenieria.jpg');
  /* Asegúrate de que la ruta sea correcta */
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
}

h1 {
  margin-bottom: 20px;
  font-size: 40px;
}

a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}
</style>