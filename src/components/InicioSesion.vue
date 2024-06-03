<template>
  <div>
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <router-link to="/modulos"> <button type="submit">Iniciar sesión</button> </router-link>
      </div>
    </form>
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
