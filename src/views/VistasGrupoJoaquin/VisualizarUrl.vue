<template>
  <div id="app">
    <h1>Lista de Pestañas Abiertas</h1>
    <ul v-if="tabs.length">
      <li v-for="(tab, index) in tabs" :key="index">
        <strong>Título:</strong> {{ tab.title }}<br>
        <strong>URL:</strong> <a :href="tab.url" target="_blank">{{ tab.url }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { computed } from 'vue';
import { useUserStore } from '../../../back-end/src/store.js';

export default {
  data() {
    return {
      tabs: []
    };
  },
  created() {
    this.fetchTabs(); // Fetch data when the component is created
    setInterval(this.fetchTabs, 10000); // Fetch data every 10 seconds
  },
  methods: {
    async fetchTabs() {
      try {
        const response = await axios.get('http://localhost:5151/tabs'); // Adjust the URL to your server endpoint
        this.tabs = response.data; // Assuming the server responds with tab data in JSON format

        // Extract URLs into a string array
        const urls = this.tabs.map(tab => tab.url);
        const urlsString = urls.join(', '); // Join URLs into a single string
        console.log('URLs:', urlsString); // Print URLs as a single string to console

        // Send data to server
        this.sendDataToServer(urlsString);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    },
    async sendDataToServer(urlsString) {
      const userStore = useUserStore();
      const user = computed(() => userStore.user);

      try {
        // Primero, realiza una petición al servidor para verificar si los datos ya existen
        const checkResponse = await axios.post('http://localhost:8080/checkTabs', { userId: user.value._id, urls: urlsString }); // Endpoint para verificar en el servidor
        if (checkResponse.data.exists) {
          console.log('Los datos ya existen en la base de datos, no se enviarán de nuevo.');
          return; // Si los datos ya existen, no se hace nada más
        }

        // Si los datos no existen, procede a enviarlos al servidor
        const processResponse = await axios.post('http://localhost:8080/processTabs', { userId: user.value._id, urls: urlsString }); // Endpoint para procesar en el servidor
        console.log('Datos enviados al servidor correctamente:', processResponse.data);
      } catch (error) {
        console.error('Error al enviar los datos al servidor:', error);
      }
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f0f0f0;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 15px;
}

a {
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}
</style>