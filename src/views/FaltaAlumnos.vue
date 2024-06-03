/*HU10 Como profesor quiero dejar constancia de acción de la falta incurrida por el alumno para
futuras revisiones y/o avisos.*/

<template>
  <div class="select-faltas">
    <h1>Faltas Alumnos</h1>
    <router-link to="/estado-alumnos">Estado alumnos</router-link>
    <table class="lista-alumnos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th>Rut</th>
          <th>Correo</th>
          <th>Faltas</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(falta, index) in faltas" :key="falta._id">
          <tr @click="selectedFalta = selectedFalta === index ? null : index">
            <td>{{ falta._id }}</td>
            <td>{{ falta.name }}</td>
            <td>{{ falta.lastName }}</td>
            <td>{{ falta.secondLastName }}</td>
            <td>{{ falta.rut }}</td>
            <td>{{ falta.email }}</td>
            <td>{{ falta.faltas }}</td>
          </tr>
          <tr v-if="selectedFalta === index">
            <td colspan="6">
              <div class="detail-falta" v-for="(detalle, i) in falta.detalleFaltas" :key="i">
                <p>FALTA {{ i + 1 }}: {{ detalle.falta }}</p>
                <strong>Fecha:</strong> {{ detalle.fecha }} <br />
                <strong>Descripción:</strong> {{ detalle.motivo }}
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <div class="addFalta">
    <button @click="showAddFalta = true">Agregar Falta</button>
    <div v-if="showAddFalta" class="add-falta">
      <p>Seleccionar alumno</p>
      <select v-model="selectedAlumno" placeholder="Seleccionar alumno">
        <option v-for="alumno in alumnos" :key="alumno._id" :value="alumno._id">
          {{ alumno.firstName }} {{ alumno.lastName }} {{ alumno.secondLastName }}
        </option>
      </select>
      <input v-model="falta" type="text" placeholder="Falta Incurrida" />
      <input v-model="motivo" type="text" placeholder="Motivo" />
      <input v-model="fecha" type="date" />
      <button @click="guardarFalta">Guardar</button>
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
      showAddFalta: false
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
    async guardarFalta() {
      const newFalta = {
        fecha: this.fecha,
        falta: this.falta,
        motivo: this.motivo
      }

      const alumnoIndex = this.faltas.findIndex((alumno) => alumno._id === this.selectedAlumno)

      if (alumnoIndex !== -1) {
        this.faltas[alumnoIndex].detalleFaltas.push(newFalta)
        this.faltas[alumnoIndex].faltas += 1
        console.log(this.faltas[alumnoIndex])

        // Send the new falta to the backend
        try {
          await axios.post('http://localhost:8080/faltas-post/update', {
            alumnoId: this.selectedAlumno._id,
            falta: newFalta
          })
        } catch (error) {
          console.error('Failed to post new falta', error)
        }
      } else {
        const selectedAlumnoData = this.alumnos.find((alumno) => alumno._id === this.selectedAlumno)
        const newAlumno = {
          _id: selectedAlumnoData._id,
          name: selectedAlumnoData.firstName,
          lastName: selectedAlumnoData.lastName,
          email: selectedAlumnoData.email,
          rut: selectedAlumnoData.rut,
          faltas: 1,
          estado: 'Peligroso',
          detalleFaltas: [newFalta]
        }
        this.faltas.push(newAlumno)
        console.log(newAlumno)
        // Send the new alumno to the backend
        try {
          await axios.post('http://localhost:8080/faltas-post/new', newAlumno)
          console.log(newAlumno)
        } catch (error) {
          console.error('Failed to post new alumno', error)
        }
      }

      // Optional: Reset form fields
      this.selectedAlumno = ''
      this.falta = ''
      this.motivo = ''
      this.fecha = ''
      this.showAddFalta = false
    }
  }
}
</script>

<style scoped>
p {
  font-weight: bold;
}
.detail-falta {
  border-bottom: 1px solid #ffffff;
}
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

.add-falta input,
.add-falta select {
  display: block;
  margin-bottom: 10px;
}

.add-falta button {
  margin-top: 10px;
}

.selected {
  background-color: #d3d3d3;
}
</style>
