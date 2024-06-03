<template>
  <div class="datos">
    <h1>Evaluación</h1>
    <h3>Nombre del módulo</h3>
  </div>
  <div class="center-screen">
    <router-link to="/lista-alumnos">
      <button class="modern-button">Ver lista de alumnos</button>
    </router-link>
  </div>
</template>

<style scoped>
h3 {
  font-size: medium;
}
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modern-button {
  padding: 20px 40px;
  margin: 30px;
  border-radius: 5px;
  border: none;
  background-color: #c58940;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.modern-button:hover {
  background-color: #b46300;
}
</style>
