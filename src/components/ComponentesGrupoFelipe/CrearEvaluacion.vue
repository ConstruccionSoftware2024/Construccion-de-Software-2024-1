<template>
  <h1>Crear Evaluación</h1>
  <div class="subject-list">
    <form @submit.prevent="crearEvaluacion">
      <div class="form-group">
        <label for="nombre">Nombre Evaluación</label>
        <input id="nombre" v-model="nombre" type="text" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="fecha">Fecha</label>
        <input id="fecha" v-model="fecha" type="date" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="horaInicio">Hora Inicio</label>
        <input id="horaInicio" v-model="horaInicio" type="time" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="horaCierre">Hora Cierre</label>
        <input id="horaCierre" v-model="horaCierre" type="time" required class="input-field" />
      </div>

      <div class="form-group">
        <router-link to="/modulos">
          <button type="submit" class="subject-button">Crear</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 60px;
}

.subject-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.input-field {
  background-color: #fff5e1;
  border: 1px solid #c58940;
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  width: 100%;
}

.subject-button {
  background-color: #FFE0B5;
  border: none;
  color: #775225;
  padding: 12px 32px;
  text-align: center;
  margin-top: 40px;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  width: 100%;
}
</style>