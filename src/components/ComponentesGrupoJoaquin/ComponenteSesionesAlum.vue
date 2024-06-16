<template>
  <div class="container">
      <h2>Lista de sesiones</h2>
      
      <input type="text" v-model="searchQuery" placeholder="Filtrar por nombre" class="search-input">

      <div class="sessions-container" v-if="finish.success">
          <div class="session-card" v-for="(sesion, index) in filteredSessions" :key="index">
              <a :href="'/session/' + sesion._id" class="card">
                  <div class="card-header">
                      <h2 class="session-name">{{ sesion.nombre }}</h2>
                      <p class="session-id">Id: {{ sesion._id }}</p>
                  </div>
                  <div class="card-body">
                      <p class="session-description">{{ sesion.descripcion }}</p>
                  </div>
              </a>
          </div>
      </div>
      <div v-if="finish.tried && !finish.success" class="error-message">
          <p>Error al cargar las sesiones.</p>
      </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'

export default {
  setup() {
      let info = ref([])
      let finish = ref({
          tried: false,
          success: false
      })
      let searchQuery = ref("")

      const cargarSesiones = async () => {
          console.log("cargando")
          try {
              const respuesta = await fetch('http://localhost:8080/sesion');

              if (respuesta.ok) {
                  const datos = await respuesta.json();
                  info.value = datos
                  console.log('Datos recibidos:', info.value);
                  finish.value.tried = true
                  finish.value.success = true
              } else {
                  console.error('Error al obtener los datos:', respuesta.statusText);
                  finish.value.tried = true
                  finish.value.success = false
              }
          } catch (error) {
              console.error('Error en la petición fetch:', error);
          }
      };

      onMounted(cargarSesiones)

      const filteredSessions = computed(() => {
          return info.value.filter(sesion => sesion.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()))
      })

      return {
          info,
          finish,
          searchQuery,
          filteredSessions
      };
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.search-input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 250px;
  font-size: 1rem;
}

.sessions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.session-card {
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.session-card:hover {
  transform: translateY(-5px);
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.2);
}

.card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
}

.card-header {
  margin-bottom: 1rem;
}

.session-name {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.session-id {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #777;
}

.card-body {
  margin-top: 0.5rem;
}

.session-description {
  margin: 0;
  font-size: 1rem;
  color: #555;
}

.error-message {
  color: red;
}
</style>
