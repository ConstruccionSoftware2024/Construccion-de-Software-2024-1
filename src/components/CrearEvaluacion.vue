<template>
  <div>
    <form @submit.prevent="crearEvaluacion">
      <label for="nombre">Nombre Evaluación:</label>
      <input id="nombre" v-model="nombre" type="text" required />

      <label for="fecha">Fecha:</label>
      <input id="fecha" v-model="fecha" type="date" required />

      <label for="horaInicio">Hora Inicio:</label>
      <input id="horaInicio" v-model="horaInicio" type="time" required />

      <label for="horaCierre">Hora Cierre:</label>
      <input id="horaCierre" v-model="horaCierre" type="time" required />
      <router-link to="/home"> <button type="submit">Crear</button> </router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      fecha: '',
      horaInicio: '',
      horaCierre: ''
    }
  },
  methods: {
    crearEvaluacion() {
      // Aquí puedes agregar la lógica para crear la evaluación
    }
  }
}
</script>
