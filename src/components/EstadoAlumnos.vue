*/HU6 Como profesor quiero ver el estado de cada alumno (Rojo-Amarillo-Verde) para determinar una
decisión. /*

<template>
  <div class="general-container">
    <h1>Estado Alumnos</h1>

    <router-link to="/faltas-alumnos">Click para ir Falta alumnos</router-link>

    <table class="lista-alumnos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th>Mail</th>
          <th>Estado</th>
          <th>Decision</th>
          <th>Descripcion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(alumno, index) in alumnos" :key="alumno._id">
          <td>{{ alumno._id }}</td>
          <td>{{ alumno.firstName }}</td>
          <td>{{ alumno.lastName }}</td>
          <td>{{ alumno.secondLastName }}</td>
          <td>{{ alumno.email }}</td>
          <td :style="{ color: getColor(estados[index]).color }">
            {{ getEstadoLabel(estados[index]) }}
          </td>
          <td>
            <select v-model="alumno.decision">
              <option value=""></option>
              <option value="ban">Banear</option>
              <option value="avisar">Avisar</option>
            </select>
          </td>
          <td>
            <input type="text" v-model="alumno.descripcion" placeholder="Agregar descripción" />
            <div>
              <span v-if="needsDescription[index] && !alumno.descripcion" style="color: red"
                >Debe agregar una descripción</span
              >
            </div>
            <button @click="applyDescription(alumno, index)" :disabled="!alumno.descripcion">
              Aplicar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      alumnos: [],
      estados: [],
      needsDescription: []
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/users')
        this.alumnos = response.data
        this.generateRandomColors()
      } catch (error) {
        console.error('Failed to fetch users', error)
      }
    },
    generateRandomColors() {
      const colors = ['rojo', 'verde', 'amarillo']
      this.estados = Array.from(
        { length: this.alumnos.length },
        () => colors[Math.floor(Math.random() * colors.length)]
      )
      this.needsDescription = Array(this.alumnos.length).fill(false)
    },
    getColor(color) {
      switch (color) {
        case 'rojo':
          return { color: 'red', label: 'Peligro' }
        case 'verde':
          return { color: 'green', label: 'Limpio' }
        case 'amarillo':
          return { color: 'yellow', label: 'Advertencia' }
        default:
          return { color: 'black', label: '' }
      }
    },
    getEstadoLabel(color) {
      return this.getColor(color).label
    },
    applyDescription(alumno, index) {
      if (!alumno.descripcion) {
        return
      }
      this.needsDescription.splice(index, 1, false)
      if (alumno.decision === 'ban') {
        this.alumnos.splice(index, 1)
        alert('Alumno eliminado')
      } else if (alumno.decision === 'avisar') {
        alert('Advertencia aplicada')
      }
    }
  }
}
</script>

<style scoped>
.lista-alumnos {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
}

th {
  background-color: #08cccc;
  color: white;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #303030;
}

.general-container {
  width: 100%;
}
</style>
