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
          <th>Cambiar</th>
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
          <td class="button-container">
            <button v-if="sitio.riesgo !== 'Peligroso'" @click="cambiarRiesgo(sitio, 'Peligroso')"
              class="rojo">Peligroso</button>
            <button v-if="sitio.riesgo !== 'Dudoso'" @click="cambiarRiesgo(sitio, 'Dudoso')"
              class="amarillo">Dudoso</button>
            <button v-if="sitio.riesgo !== 'Sin riesgo'" @click="cambiarRiesgo(sitio, 'Sin riesgo')" class="verde">Sin
              riesgo</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
let rojo = ["https://discord.com", "https://www.teamspeak.com", "https://www.skype.com", "Zoom.exe", "Telegram.exe", "WhatsApp.exe", "Snapchat.exe", "TikTok.exe", "YouTube.exe", "Twitch.exe", "Tinder.exe", "Grindr.exe", "https://www.epicidad.com", "https://www.instagram.com"];
let amarillo = ["Riot.exe", "EpicGames", "Txt", "https://docs.google.com", "Excel", "PowerPoint", "Paint", "Illustrator", "Photoshop", "Premiere", "Acrobat", "Ink"];
let verde = ["https://pseint.sourceforge.net", "https://www.spyder-ide.org", "Eclipse", "NetBeans", "https://www.jetbrains.com", "PyCharm", "VisualStudio", "CodeBlocks", "DevC++", "SublimeText", "Atom", "Notepad++", "Vim", "Emacs", "Nano", "Gedit", "pgAdmin", "GitBash", "https://replit.com"];
let palabrasPeligrosas = [];

export default {
  data() {
    return {
      sitios: [
        {
          nombre: 'Google',
          horaAcceso: '10:00 AM',
          link: 'https://www.google.com',
          riesgo: this.nuevaApp('https://www.google.com')
        },
        {
          nombre: 'PxxxHub',
          horaAcceso: '10:45 AM',
          link: 'https://www.epicidad.com',
          riesgo: this.nuevaApp('https://www.epicidad.com')
        },
        {
          nombre: 'OnlyCars',
          horaAcceso: '10:52 AM',
          link: 'https://onlycars.nelsonsilva.dev/#/',
          riesgo: this.nuevaApp('https://onlycars.nelsonsilva.dev/#/')
        },
        {
          nombre: 'Word Online',
          horaAcceso: '11:00 AM',
          link: 'https://docs.google.com',
          riesgo: this.nuevaApp('https://docs.google.com')
        },
        {
          nombre: 'Instagram',
          horaAcceso: '11:30 AM',
          link: 'https://www.instagram.com',
          riesgo: this.nuevaApp('https://www.instagram.com')
        },
        {
          nombre: 'Replit',
          horaAcceso: '12:00 PM',
          link: 'https://replit.com',
          riesgo: this.nuevaApp('https://replit.com')
        }
      ]
    }
  },
  methods: {
    nuevaApp(pagina) {
      for (let i = 0; i < rojo.length; i++) {
        if (pagina === rojo[i]) {
          console.log("La página está en lista roja");
          return "Peligroso";
        }
      }
      for (let i = 0; i < verde.length; i++) {
        if (pagina === verde[i]) {
          console.log("La página está en lista verde");
          return "Sin riesgo";
        }
      }
      for (let i = 0; i < amarillo.length; i++) {
        if (pagina === amarillo[i]) {
          console.log("La página está en lista amarilla");
          return "Dudoso";
        }
      }
      console.log("Página agregada a lista amarilla por defecto");
      return "Dudoso";
    },
    cambiarRiesgo(sitio, nuevoRiesgo) {
      // Encuentra el índice del sitio en la lista
      const index = this.sitios.findIndex(s => s === sitio);
      if (index !== -1) {
        // Elimina el sitio de su lista actual
        const riesgoActual = sitio.riesgo;
        this.eliminarSitioDeLista(sitio, riesgoActual);

        // Asigna el nuevo riesgo al sitio
        this.sitios[index].riesgo = nuevoRiesgo;

        // Agrega el sitio a la nueva lista
        this.agregarSitioALista(sitio, nuevoRiesgo);
      }
    },
    eliminarSitioDeLista(sitio, riesgo) {
      // Implementa la lógica para eliminar el sitio de su lista actual (roja, amarilla o verde)
      if (riesgo === "Peligroso") {
        for (let i = 0; i < rojo.length; i++) {
          if (sitio.link === rojo[i]) {
            rojo.splice(i, 1);
          }
        }
      } else if (riesgo === "Dudoso") {
        for (let i = 0; i < amarillo.length; i++) {
          if (sitio.link === amarillo[i]) {
            amarillo.splice(i, 1);
          }
        }
      } else if (riesgo === "Sin riesgo") {
        for (let i = 0; i < verde.length; i++) {
          if (sitio.link === verde[i]) {
            verde.splice(i, 1);
          }
        }
      }
    },
    agregarSitioALista(sitio, nuevoRiesgo) {
      // Implementa la lógica para agregar el sitio a su nueva lista (roja, amarilla o verde)
      if (nuevoRiesgo === "Peligroso") {
        rojo.push(sitio.link);
      } else if (nuevoRiesgo === "Dudoso") {
        amarillo.push(sitio.link);
      } else if (nuevoRiesgo === "Sin riesgo") {
        verde.push(sitio.link);
      }
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
  background-color: #08cccc;
  color: black;
  font-weight: bold;
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

.rojo {
  background-color: red;
  color: white;
}

.amarillo {
  background-color: yellow;
  color: black;
}

.verde {
  background-color: green;
  color: white;
}

.button-container button {
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 60%;
  /* Agrega margen arriba de los botones */
}
</style>
