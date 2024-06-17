<template>
  <section class="options">
    <div class="title">
      <h1>Opciones Módulo X</h1>
    </div>
  </section>
  <ul class="opciones-list">
    <li><router-link to="/crearevaluacion"><button class="subject-button">Crear sesión de
          evaluación</button></router-link></li>
    <li><router-link to="/historialevaluaciones"><button class="subject-button">Ver evaluaciones
          anteriores</button></router-link></li>
    <li><router-link to="/modulos"><button class="subject-button">Volver atrás</button></router-link></li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      options: ['Crear sesión de evaluación', 'Ver evaluaciones anteriores', 'Volver atrás'],
    }
  },
}
</script>

<style scoped>
.title {
  align-self: flex-start;
}

h1 {
  font-weight: bold;
  font-size: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left !important;
}

.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.opciones-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  list-style-type: none;
  padding: 0;
}

.subject-button {
  background-color: #08cccc;
  border: none;
  color: white;
  padding: 30px 62px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.subject-button:hover {
  background-color: white;
  color: black;
  border: 2px solid var(--button-background-color);
}
</style>