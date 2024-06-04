
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios';

// Configurar un interceptor de Axios para agregar el token a cada solicitud
axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  // Manejar la respuesta y redireccionar si el token ha expirado
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        router.push('/login'); // Redirecciona a la página de login
      }
      return Promise.reject(error);
    }
  );


const app = createApp(App)
app.use(router)

app.mount('#app')