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
            <button class="modern-button" type="submit">Iniciar sesión</button>
          </router-link>
        </div>
        <div class="forgot-password">
          <router-link to="/forgot-password">¿Olvidaste tu contraseña?</router-link>
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
  margin-bottom: 15px;
}

.modern-button {
  padding: 10px 40px;

  border-radius: 5px;
  border: none;
  background-color: #c58940;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.modern-button:hover {
  background-color: #b46300;
}
.forgot-password {
  margin-top: 10px;
  text-align: center;
}
</style>
