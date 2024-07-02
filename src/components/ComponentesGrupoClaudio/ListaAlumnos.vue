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
              <td colspan="8">
                <div class="detail-falta-container">
                  <div v-if="cargandoAsignaturas">
                  </div>
                  <div v-else>
                    <strong class="titulo">Asignaturas inscritas:</strong>
                    <ul>
                      <li v-for="asignatura in asignaturas" :key="asignatura._id">{{ asignatura.title }}</li>
                    </ul>
                  </div>
                </div>
                <button @click="mostrarReportar = true">Contactar</button>
                <div class="modal" v-if="mostrarReportar">
                  <div class="modal-content">
                      <span class="close" @click="mostrarReportar = false">&times;</span>
                      <h3>Contactar alumno</h3>
                      <textarea placeholder="Descripción" v-model="descripcion"></textarea>
                      <button @click="enviarProblema" class="btn btn-modal">Enviar</button>
                  </div>
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
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      alumnos: [],
      historial: [],
      matriculaABanear: '',
      alumnoSeleccionado: null,
      asignaturas: [],
      mostrarReportar: false,
      descripcion: '',
      idUsuario: '',
      cargandoAsignaturas: false
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
      this.cargandoAsignaturas = true;
      try {
        const response = await axios.get(`http://localhost:8080/asignaturas/${alumnoId}`);
        this.asignaturas = response.data;
      } catch (error) {
        console.error('Failed to fetch asignaturas', error);
      } finally {
        this.cargandoAsignaturas = false;
      }
    },
    async enviarProblema() {
      try {
        this.descripcion = '';
        this.mostrarReportar = false;
        Swal.fire({
            title: 'Correo enviado al alumno',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#08cccc'
        });
        const emailData = {
        to: 'pruebas.construccion2024@outlook.com',
        subject: 'Asunto del correo', // Asunto del correo
        body: this.descripcion // Cuerpo del correo
      };

      const emailResponse = await axios.post('http://localhost:8080/emailContactoAlumno', emailData);

      } catch (error) {
          console.error('Error en la petición fetch:', error)
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

button {
    padding: 10px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
}

button:hover {
    background-color: var(--button-hover-background-color);
}

.close {
    cursor: pointer;
    float: right;
}

.close:hover {
    color: var(--button-background-color);
}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-content {
    background-color: var(--container-background-color);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    width: 80%;
    max-width: 500px;
    position: relative;
}

.modal-content h3 {
    margin-bottom: 1rem;
}

.modal-content input,
.modal-content textarea {
    width: 100%;
    padding: 0.5rem;
    background-color: var(--input-background-color);
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.modal-content textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    resize: none;
    height: 150px;
}
</style>
