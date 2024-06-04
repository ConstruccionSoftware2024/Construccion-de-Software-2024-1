<template>
  <div class="center-screen">
    <router-link to="/">
      <button class="modern-button">Iniciar Sesión</button>
    </router-link>
  </div>
</template>

<style scoped>
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.modern-button {
  padding: 20px 40px;
  margin: 30px;
  border-radius: 5px;
  border: none;
  background-color: #FFE0B5;
  color: #92642c;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.modern-button:hover {
  background-color: #b46300;
}
</style>