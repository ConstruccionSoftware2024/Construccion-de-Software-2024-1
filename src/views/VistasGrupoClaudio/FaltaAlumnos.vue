/*HU10 Como profesor quiero dejar constancia de acción de la falta incurrida por el alumno para futuras revisiones y/o
avisos.*/

<template>
  <div class="general-div">
    <h1>Lista Alumnos</h1>

    <table class="lista-alumnos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Matricula</th>
          <th>Rut</th>
          <th>Nombre</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th>Correo</th>
          <th>Campus</th>
          <th>Faltas</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(falta, index) in faltas" :key="falta._id">
          <tr class="fila" @click="selectedFalta = selectedFalta === index ? null : index">
            <td>{{ falta.id }}</td>
            <td>{{ falta.matricula }}</td>
            <td>{{ falta.rut }}</td>
            <td>{{ falta.nombre }}</td>
            <td>{{ falta.apellidoPat }}</td>
            <td>{{ falta.apellidoMat }}</td>
            <td>{{ falta.correo }}</td>
            <td>{{ falta.campus }}</td>
            <td>{{ falta.faltas }}</td>
          </tr>
          <tr v-if="selectedFalta === index && falta.detalleFaltas != null">
            <td colspan="8">
              <div class="detail-falta-container">
                <div class="detail-falta" v-for="(detalle, i) in falta.detalleFaltas" :key="i">
                  <p class="faltaTitle">FALTA {{ i + 1 }}: {{ detalle.falta }}</p>
                  <strong>Fecha:</strong> {{ detalle.fecha }} <br />
                  <strong>Profesor:</strong> {{ detalle.profesor }} <br />
                  <strong class="faltaDesc">Descripción:</strong> {{ detalle.motivo }}
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
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
              <p class="text-form">Seleccionar profesor</p>
              <div class="custom-select">
                <select v-model="selectedProfesor">
                  <option v-for="profesor in profesores" :key="profesor.id" :value="profesor">
                    {{ profesor }}
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
      profesores: ['Daniel Moreno', 'Ricardo Perez', 'Luis Silvestre', 'Rodrigo Paredes', 'Matthew Bardeen'],
      selectedProfesor: '',
      showError: false,
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8080/faltas')
      this.faltas = response.data
    } catch (error) {
      console.error(error)
    }
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/users')
        this.alumnos = response.data
      } catch (error) {
        console.error('Failed to fetch users', error)
      }
    },
    async fetchFaltas() {
      try {
        const response = await axios.get('http://localhost:8080/faltas')
        this.faltas = response.data
      } catch (error) {
        console.error('Failed to fetch faltas', error)
      }
    },
    async guardarFalta() {
      const selectedAlumnoData = this.alumnos.find((alumno) => alumno._id === this.selectedAlumno)
      if (!selectedAlumnoData || !this.selectedProfesor || !this.falta || !this.motivo || !this.fecha) {
        this.showError = true;
        return;
      }
      const newFalta = {
        falta: this.falta,
        fecha: this.fecha,
        motivo: this.motivo,
        profesor: this.selectedProfesor
      }

      try {
        await axios.post(`http://localhost:8080/addFaltas/${this.selectedAlumno}`, newFalta)
        this.showAddFalta = false;
        this.fetchFaltas()
      } catch (error) {
        console.error('Failed to save falta', error)
      }

      // limpiar form
      this.selectedAlumno = ''
      this.selectedProfesor = ''
      this.falta = ''
      this.motivo = ''
      this.fecha = ''
    },
    cerrarModal() {
      this.showError = false;
      this.showAddFalta = false;
    }
  }
}
</script>

<style scoped>
.detail-falta-container {
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
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
}

.detail-falta {
  border: 1px solid #ccc;
  border: 1px solid var(--container-background-color);
  padding: 6px;
  text-align: left;
  padding-left: 3rem;
  width: 100%;
}

.faltaTitle {
  font-weight: bold;
}


.lista-alumnos {
  border-collapse: collapse;
  width: 100%;
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

th {
  background-color: #08cccc;
  color: white;
  font-weight: bold;
  border-right: 1px solid var(--container-background-color);
}

tr:nth-child(even) {
  background-color: var(--container-background-color);
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
  width: 65%;
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

.modal-content h2 {
  text-align: center;
  margin-bottom: 1rem;

}

.input-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.select-alumno,
.input-middle,
.input-right {
  display: flex;
  flex-direction: column;
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
  width: 385px;
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
  margin-top: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

h2 {
  font-weight: bold;
  margin-bottom: 2rem;
}
</style>
