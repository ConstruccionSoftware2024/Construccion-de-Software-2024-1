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
          riesgo: 'Bajo',
          visitas: 10 //nuevo campo el cual deberia de ser capas de detectar la cantidad de veces que se accedio a la pagina
        },
        {
          nombre: 'PxxxHub',
          horaAcceso: '10:45 AM',
          link: 'https://www.epicidad.com',
          riesgo: 'Alto',
          visitas: 5
        },
        {
          nombre: 'OnlyCars',
          horaAcceso: '10:52 AM',
          link: 'https://onlycars.nelsonsilva.dev/#/',
          riesgo: 'Bajo',
          visitas: 7
        }
      ]
    }
  },

  //esto mas que nada es algo temporal mientras se pueda implementar una forma de identificar las paginas/aplicaciones mas utilizadas por el usuario dentro de la plataforma
  //pero como se dejo de una manera estatica mientras se tenga el valor visitas que se encargar de medir la cantidad de veces que se accedio a la pagina/aplicacion
  //se puede hacer uso de este metodo para identificar la pagina mas visitada

  methods: { //Funcion que se encarga de identificar la pagina mas visitada 
    sitioMasVisitado() {
      const sitio = this.sitios.reduce((max, sitio) => sitio.visitas > max.visitas ? sitio : max, this.sitios[0]);
      return { nombre: sitio.nombre, visitas: sitio.visitas };
    }
  },
  mounted() { //Funcion que se encarga de mostrar la pagina mas visitada dentro del console.log
    const sitioMasVisitado = this.sitioMasVisitado();
    console.log('Pagina más Visitada:', sitioMasVisitado.nombre, '\nCantidad de Visitas:', sitioMasVisitado.visitas);
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

th,
td {
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
</style>
