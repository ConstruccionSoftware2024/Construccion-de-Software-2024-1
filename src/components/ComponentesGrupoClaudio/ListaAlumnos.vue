<template>
  <div class="general-div">
    <div class="datos">
      <h1>Listado de Alumnos</h1>
    </div>

    <div class="lista">
      <table>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Correo</th>
            <th>Campus</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(alumno, index) in alumnos" :key="alumno.matricula">
            <tr @click="seleccionarAlumno(index)" :class="{ 'selected': alumnoSeleccionado === index }">
              <td>{{ alumno.matricula }}</td>
              <td>{{ alumno.firstName }}</td>
              <td>{{ alumno.lastName }}</td>
              <td>{{ alumno.secondLastName }}</td>
              <td>{{ alumno.email }}</td>
              <td>{{ alumno.campus }}</td>
            </tr>

            <tr v-if="alumnoSeleccionado === index">
              <td colspan="8" class="detail-falta-container">
                <div v-if="asignaturas.length > 0">
                  <strong class="titulo">Asignaturas inscritas:</strong>
                  <ul>
                    <li v-for="asignatura in asignaturas" :key="asignatura._id">{{ asignatura.title }}</li>
                  </ul>
                </div>
                <div v-else>
                  <p class="titulo">No hay asignaturas inscritas</p>
                </div>
              </td>
            </tr>

          </template>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      alumnos: [],
      historial: [],
      matriculaABanear: '',
      alumnoSeleccionado: null,
      asignaturas: []
    }
  },
  methods: {
    async obtenerAlumnos() {
      try {
        const response = await axios.get('http://localhost:8080/users');
        this.alumnos = response.data;
        this.historial = this.alumnos.map(alumno => ({
          nombre: alumno.nombre,
          matricula: alumno.matricula
        }));
      } catch (error) {
        console.error('Failed to fetch alumnos', error);
      }
    },
    async obtenerAsignaturas(alumnoId) {
      try {
        const response = await axios.get(`http://localhost:8080/asignaturas/${alumnoId}`);
        this.asignaturas = response.data;
      } catch (error) {
        console.error('Failed to fetch asignaturas', error);
      }
    },
    seleccionarAlumno(index) {
      this.alumnoSeleccionado = this.alumnoSeleccionado === index ? null : index;
      if (this.alumnoSeleccionado !== null) {
        this.obtenerAsignaturas(this.alumnos[this.alumnoSeleccionado]._id);
      }
    }
  },
  created() {
    this.obtenerAlumnos();
  }
}
</script>

<style scoped>
.selected {
  color: var(--text-table-color);
  background-color: var(--border-color);
}

.titulo {
  font-weight: bold;
}

h1 {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--container-background-color);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropbtn {
  background-color: #08cccc;
  color: var(--text-color);
  ;
  padding: 12px;
  font-size: 12px;
  border: none;
  cursor: pointer;
}

.general-div {
  text-align: center;
  justify-content: center;
  align-items: center;
}

table {
  width: 75%;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}

th,
td {
  height: 40px;
  text-align: center;
  max-height: 40px;
  overflow-y: auto;
}

td {
  cursor: pointer;
  border: 1px solid var(--border-color);
}

tr:hover {
  background-color: var(--gray-hover-color);
}

th {
  background-color: #08cccc;
  color: white;
  font-weight: bold;
  border-right: 1px solid var(--container-background-color);
}

.detail-falta-container {
  border: 1px solid var(--border-color);
  background-color: var(--input-background-color);
  padding: 10px;
  text-align: left;
  padding-left: 3rem;
  width: 100%;
  cursor: auto;
}
</style>
