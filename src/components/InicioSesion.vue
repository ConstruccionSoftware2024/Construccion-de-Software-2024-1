<template>
  <div class="container">
    <div class="login-form">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="username">Nombre de usuario:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <router-link to="/modulos">
            <div class="button-container">
              <button class="modern-button">Iniciar sesión</button>
            </div>
          </router-link>
        </div>
        <div class="forgot-password">
          <router-link to="/forgot-password" class="forgot-password-link"
            >¿Olvidaste tu contraseña?</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      console.log(`Usuario: ${this.username}, Contraseña: ${this.password}`)
    }
  }
}
</script>

<style scoped>

.login-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 30px;
  background-color: #f0f0f0; 
}

.forgot-password-link {
  color: #00aeff; 
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.login-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 35px; 
}

.button-container { 
  display: flex;
  justify-content: center;
}

.modern-button {
  padding: 10px 40px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  background-color: #ffe0b5;
  color: #775225;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-bottom: 15px;
}

.modern-button:hover {
  background-color: #b46300;
  color: #ffe0b5;
}
.forgot-password {
  margin-top: 10px;
  text-align: center;
}
</style>
