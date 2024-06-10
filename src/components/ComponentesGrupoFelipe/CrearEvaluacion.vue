<template>
  <div class="subject-list">
    <div class="crearForm">
      <h1>Crear Evaluación</h1>
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
          <router-link to="/home">
            <button type="submit" class="subject-button">Crear</button>
          </router-link>
          <li>
            <router-link to="/opciones">
              <button class="subject-button">Volver atrás</button>
            </router-link>
          </li>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

.crearForm {
  margin-top: 60px;
  background-color: var(--container-background-color);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: all 0.3s ease;
}

h1 {
  text-align: center;
  margin-bottom: 35px;
  font-weight: bold;
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
  background-color: var(--input-background-color);
  border: 0.1px solid rgb(191, 191, 191);
  border-radius: 5px;
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  width: 100%;
}

.input-field:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--button-background-color);
  border-color: transparent;
}

.subject-button {
  background-color: #08cccc;
  border: none;
  border-radius: 5px;
  color: black;
  padding: 12px 32px;
  text-align: center;
  margin-top: 40px;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
}

.subject-button:hover {
  background-color: var(--button-hover-background-color);
}
</style>