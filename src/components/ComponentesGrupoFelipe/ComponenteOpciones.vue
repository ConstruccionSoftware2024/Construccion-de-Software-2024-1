<template>
  <div>
    <h2>Opciones</h2>
    <ul class="subject-list">
      <li><router-link to="/crearevaluacion"><button class="subject-button">Crear sesión de
            evaluación</button></router-link></li>
      <li><router-link to="/historialevaluaciones"><button class="subject-button">Ver evaluaciones
            anteriores</button></router-link></li>
      <li><router-link to="/modulos"><button class="subject-button">Volver atrás</button></router-link></li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.subject-list {
  list-style-type: none;
  padding: 0;
}

.subject-list li {
  margin-bottom: 10px;
}

.subject-button {
  background-color: #08cccc;
  border: none;
  color: white;
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>