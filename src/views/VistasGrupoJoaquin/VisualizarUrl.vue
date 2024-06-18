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
    fetchTabs() {
      axios.get('http://localhost:5151/tabs')
        .then(response => {
          this.tabs = response.data; // Assuming the server responds with tab data in JSON format
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
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
