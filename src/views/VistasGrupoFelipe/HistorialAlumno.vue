<template>
    <div class="historial">
      <h1>Nombre Alumno</h1>
      <table>
        <thead>
          <tr>
            <th>Sitio Web</th>
            <th>Hora de Acceso</th>
            <th>Link</th>
            <th>Riesgo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sitio in sitios" :key="sitio.nombre">
            <td>{{ sitio.nombre }}</td>
            <td>{{ sitio.horaAcceso }}</td>
            <td>
              <a :href="sitio.link" target="_blank" class="sitio-link">{{ sitio.link }}</a>
            </td>
            <td>{{ sitio.riesgo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      sitios: [
        {
          nombre: 'Google',
          horaAcceso: '10:00 AM',
          link: 'https://www.google.com',
          riesgo: 'Bajo'
        },
        {
          nombre: 'PxxxHub',
          horaAcceso: '10:45 AM',
          link: 'https://www.epicidad.com',
          riesgo: 'Alto'
        },
        {
          nombre: 'OnlyCars',
          horaAcceso: '10:52 AM',
          link: 'https://onlycars.nelsonsilva.dev/#/',
          riesgo: 'Bajo'
        }
      ]
    }
  }
}
</script>

<style scoped>

.sitio-link {
  color: #00aeff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 15px;
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

body.dark-mode th, body.dark-mode td {
  border-bottom: 1px solid #888;
}

body.dark-mode tr:nth-child(even) {
  background-color: #555;
}

body.dark-mode th {
  background-color: #444;
  color: #fff;
}
</style>
