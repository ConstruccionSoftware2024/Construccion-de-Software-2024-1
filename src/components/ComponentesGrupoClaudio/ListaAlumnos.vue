<template>
  <div class="datos">
    <h1>Evaluación</h1>
    <h3>Nombre del módulo</h3>
  </div>

  <div class="lista">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Matrícula</th>
          <th>Sesión Iniciada</th>
          <th>Riesgo</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alumno in alumnos" :key="alumno.matricula">
          <td>{{ alumno.nombre }}</td>
          <td>{{ alumno.apellido }}</td>
          <td>{{ alumno.matricula }}</td>
          <td>{{ "Si/No" }}</td>
          <td>
            <i v-if="alumno.riesgo === 'Bajo'" class="fa-solid fa-check"></i>
            <i v-else-if="alumno.riesgo === 'Medio'" class="fa-solid fa-exclamation"></i>
            <i v-else-if="alumno.riesgo === 'Alto'" class="fa-solid fa-x"></i>
          </td>
          <td>
            <div class="dropdown">
              <button class="dropbtn">Ver más</button>
              <div class="dropdown-content">
                <router-link to="/historial">Ver alumno</router-link>
                <a href="#">Enviar mensaje</a>
                <a href="#">Bloquear</a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alumnos: [],
      historial: [],//por ahora es una idea probicional hecha por enzo y erik
      //la idea es guardar la informacion de los usuarios con su matricula, la idea es guardarlos posteriormente dentro de una nueva tabla en la base de datos
      matriculaABanear: ''
    }
  },
  methods: {
    generarAlumnos() {
      for (let i = 0; i < 5; i++) {
        const alumno = {
          nombre: `Alumno ${i + 1}`,
          apellido: `Apellido ${i + 1}`,
          matricula: `Matricula ${i + 1}`,
          riesgo: ['Bajo', 'Medio', 'Alto'][Math.floor(Math.random() * 3)]
        }
        this.alumnos.push(alumno)
        this.historial.push({
          nombre: alumno.nombre,
          matricula: alumno.matricula
        })
      }
      console.log(this.historial)
      //examinando el localhost, revisando dentro de console se puede verificar que los datos
      //se estan guardando correctamente nombre y matricula
    }
  },
  created() {
    this.generarAlumnos()
  }
}
</script>

<style scoped>
h3 {
  font-size: medium;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
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
  background-color: #e5ba73;
  color: black;
  padding: 12px;
  font-size: 12px;
  border: none;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #c58940;
  color: white;
}

body.dark-mode {
  background-color: #333;
  color: #fff;
}

body.dark-mode table {
  color: #fff;
}

body.dark-mode th,
body.dark-mode td {
  border-bottom: 1px solid #888;
}

body.dark-mode tr:nth-child(even) {
  background-color: #555;
}

body.dark-mode th {
  background-color: #444;
  color: #fff;
}

.dark-mode .switch {
  background-color: #4e4e4e;
}
</style>
