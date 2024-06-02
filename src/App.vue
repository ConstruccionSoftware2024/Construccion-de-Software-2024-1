<template>
  <div>
    <h1>{{ isLoginPage ? 'Iniciar sesión' : 'Registro' }}</h1>
    <FormularioLogin v-if="isLoginPage" @login="handleLogin" />
    <FormularioRegistro v-else @register="handleRegister" />
    <p>
      {{ isLoginPage ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?' }}
      <a href="#" @click.prevent="togglePage">{{ isLoginPage ? 'Regístrate' : 'Inicia sesión' }}</a>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue'
import FormularioLogin from './components/FormularioLogin.vue'
import FormularioRegistro from './components/FormularioRegistro.vue'

export default {
  components: {
    FormularioLogin,
    FormularioRegistro
  },
  setup() {
    const isLoginPage = ref(true)

    const handleLogin = (username, password) => {
      console.log('Iniciando sesión con:', username, password)
    }

    const handleRegister = (username, email, password) => {
      console.log('Registrando usuario con:', username, email, password)
    }

    const togglePage = () => {
      isLoginPage.value = !isLoginPage.value
    }

    return {
      isLoginPage,
      handleLogin,
      handleRegister,
      togglePage
    }
  }
}
</script>
