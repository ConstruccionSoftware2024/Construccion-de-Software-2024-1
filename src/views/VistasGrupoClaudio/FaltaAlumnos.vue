<template>
  <div class="general-div">
    <h1>Faltas {{ asignatura.title }}</h1>

    <table v-if="faltasFiltradas.length" class="lista-alumnos">
      <thead>
        <tr>
          <th>Matricula</th>
          <th>Nombre</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th>Correo</th>
          <th>Campus</th>
          <th>Faltas</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(falta, index) in faltasFiltradas" :key="falta._id">
          <tr class="fila" :class="{ 'selected': selectedFalta === index }"
            @click="selectedFalta = selectedFalta === index ? null : index">
            <td>{{ falta.matricula }}</td>
            <td>{{ falta.nombre }}</td>
            <td>{{ falta.apellidoPat }}</td>
            <td>{{ falta.apellidoMat }}</td>
            <td>{{ falta.correo }}</td>
            <td>{{ falta.campus }}</td>
            <td>{{ falta.detalleFaltas.length }}</td>
          </tr>
          <tr v-if="selectedFalta === index">
            <td class="detail-falta-container" colspan="8">
              <div class="detail-falta" v-for="(detalle, i) in falta.detalleFaltas" :key="i">
                <strong class="faltaTitle">FALTA {{ i + 1 }}: {{ detalle.falta }}</strong><br />
                <strong>Fecha:</strong> {{ detalle.fecha }} <br />
                <strong>Profesor:</strong> {{ detalle.profesor }} <br />
                <strong>Descripción:</strong> {{ detalle.motivo }}
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div v-else>
      <span>No hay faltas.</span>
    </div>
    <button @click="showAddFalta = true" class="addButton">Agregar Falta</button>


    <div class="modal" v-if="showAddFalta">
      <div class="modal-content">
        <span class="close" @click="cerrarModal">&times;</span>
        <div class="add-falta">
          <h2>Añadir Falta</h2>
          <div class="input-group">
            <div class="select-alumno">
              <p class="text-form">Seleccionar alumno</p>
              <div class="custom-select">
                <select v-model="selectedAlumno" placeholder="Seleccionar alumno">
                  <option v-for="alumno in alumnos" :key="alumno._id" :value="alumno._id">
                    {{ alumno.firstName }} {{ alumno.lastName }} {{ alumno.secondLastName }}
                  </option>
                </select>
              </div>
            </div>

            <div class="input-middle">
              <p class="text-form">Falta Incurrida</p>
              <input v-model="falta" type="text" placeholder="Falta Incurrida" />
              <p class="text-form">Descripción</p>
              <textarea v-model="motivo" placeholder="Descripción" class="input-descripcion"></textarea>
            </div>
            <div class="input-right">
              <p class="text-form">Seleccionar Fecha</p>
              <input v-model="fecha" type="date" />
            </div>
            <div v-if="showError" class="error-message">
              Por favor complete todos los campos.
            </div>
          </div>

          <button @click="guardarFalta" class="saveButton">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import { useUserStore } from '../../../back-end/src/store.js'
export default {
  data() {
    return {
      faltas: [],
      alumnos: [],
      selectedFalta: null,
      selectedAlumno: '',
      falta: '',
      motivo: '',
      fecha: '',
      showAddFalta: false,
      showError: false,
      asignaturaId: null,
      faltasFiltradas: [],
      asignatura: {}
    }
  },
  setup() {
    const userStore = useUserStore();
    return { userStore }
  },
  async created() {
    this.asignaturaId = this.$route.params.id;

    try {
      const response = await axios.get(`http://localhost:8080/asignatura/${this.asignaturaId}`);
      this.asignatura = response.data;
    } catch (error) {
      console.error(error);
    }

    this.fetchFaltas()
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/users')
        const users = response.data
        this.alumnos = users.filter(user => user.role === 'alumno' && this.asignatura.members.includes(user._id));
      } catch (error) {
        console.error('Failed to fetch users', error)
      }
    },
    async fetchFaltas() {
      this.asignaturaId = this.$route.params.id;
      try {
        const response = await axios.get('http://localhost:8080/faltas')
        this.faltas = response.data
        this.faltasFiltradas = this.faltas.map(falta => {
          if (falta && falta.detalleFaltas) {
            return {
              ...falta,
              detalleFaltas: falta.detalleFaltas.filter(detalle => detalle.asignatura === this.asignaturaId)
            };
          } else {
            return falta;
          }
        }).filter(falta => falta.detalleFaltas && falta.detalleFaltas.length > 0);
      } catch (error) {
        console.error(error)
      }
    },
    async guardarFalta() {
      const selectedAlumnoData = this.alumnos.find((alumno) => alumno._id === this.selectedAlumno)
      if (!selectedAlumnoData || !this.falta || !this.motivo || !this.fecha) {
        this.showError = true;
        return;
      }
      const newFalta = {
        falta: this.falta,
        fecha: this.fecha,
        motivo: this.motivo,
        profesor: this.userStore.user.firstName + ' ' + this.userStore.user.lastName + ' ' + this.userStore.user.secondLastName,
        asignatura: this.asignaturaId
      }

      try {
        await axios.post(`http://localhost:8080/addFaltas/${this.selectedAlumno}`, newFalta)
        this.showAddFalta = false;
        this.fetchFaltas()
      } catch (error) {
        console.error('Failed to save falta', error)
      }

      this.selectedAlumno = ''
      this.falta = ''
      this.motivo = ''
      this.fecha = ''
      this.fetchUsers()
      this.showError = false;
    },
    cerrarModal() {
      this.showError = false;
      this.showAddFalta = false;
    }
  }
}
</script>

<style scoped>
.selected {
  color: var(--text-table-color);
  background-color: var(--border-color);
}

.detail-falta-container {
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  cursor: auto;
  background-color: var(--input-background-color);
}

.text-form {
  margin-bottom: 0.2rem;
}


.error-message {
  position: absolute;
  top: calc(100%);
  left: 0;
  right: 0;
  background-color: #ff5733;
  color: white;
  padding: 10px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.general-div {
  text-align: center;
  justify-content: center;
  align-items: center;
}

.detail-falta {
  padding: 15px;
  text-align: left;
  padding-left: 3rem;
  width: 100%;
}

.faltaTitle {
  font-weight: bold;
  margin-bottom: 1rem;
}


.lista-alumnos {
  border-collapse: collapse;
  width: 75%;
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

tr:hover {
  background-color: var(--gray-hover-color);
}

td {
  cursor: pointer;
  border: 1px solid var(--border-color);
}

th {
  background-color: #08cccc;
  color: white;
  font-weight: bold;
  border-right: 1px solid var(--container-background-color);
}


.addButton {
  margin-top: 2rem;
  margin-bottom: 4rem;
  background-color: #08cccc;
  color: white;
  border: none;
  height: 2.5rem;
  width: 9rem;
  font-weight: bold;
  cursor: pointer;
}

.addButton:hover {
  background-color: var(--button-hover-background-color);
  border: var(--border-color);
  color: black;
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
  background-color: #e9e9e9;
  background-color: var(--container-background-color);
  padding: 2rem;
  width: 60%;
  min-height: 35%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.close:hover {
  color: var(--button-background-color);
}

.modal-content h2 {
  text-align: center;
  margin-bottom: 1rem;

}

.input-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  gap: 10px;
}

.addfalta {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.custom-select select,
.modal-content input[type="text"],
.modal-content input[type="date"],
.modal-content textarea {
  font-size: 16px;
  border-radius: 5px;
  border: none;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  margin-bottom: 1rem;
  background-color: var(--input-background-color);
  color: var(--text-color);
}


.modal-content textarea {
  max-height: 550px;
  min-height: 50px;
  max-width: 385px;
  min-width: 200px;
  width: 100%;
  height: 118px;
}

.custom-select select:focus,
.modal-content input[type="text"]:focus,
.modal-content input[type="date"]:focus,
.modal-content textarea:focus {
  box-shadow: 0 0 0 2px var(--button-background-color);
  outline: none;
}

.saveButton {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: #08cccc;
  color: white;
  border: none;
  height: 2.5rem;
  width: 9rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

.saveButton:hover {
  background-color: var(--button-hover-background-color);
  border: var(--border-color);
  color: black;
}

h1 {
  margin-top: 2.5rem;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

h2 {
  font-weight: bold;
  margin-bottom: 2rem;
}

@media (max-width: 1200px) {
  .input-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .saveButton {
    position: relative;
    bottom: 0;
    right: 0;
    margin-top: 1rem;
  }

  .select-alumno,
  .input-middle,
  .input-right {
    width: 80%;
  }

  .modal-content textarea {
    width: 100%;
  }

  .modal-content {
    width: 40%;
    height: auto;
    min-height: 400px;
    min-width: 400px;
  }
}
</style>
