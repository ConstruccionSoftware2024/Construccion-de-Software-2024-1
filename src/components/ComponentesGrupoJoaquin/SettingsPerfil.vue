//Apartado del Perfil con Apariencia
<template>
  <div class="settings-page">
    <div class="container">
      <h2>Apariencia</h2>
      <div class="theme-selector">
        <div class="theme-option" :class="{ selected: !isDarkMode && selectedTheme === 'light' }"
          @click="selectTheme('light')">
          <img src="../../assets/images/light.jpg" alt="Light Theme">
          <p>Claro</p>
        </div>
        <div class="theme-option" :class="{ selected: isDarkMode && selectedTheme === 'dark' }"
          @click="selectTheme('dark')">
          <img src="../../assets/images/dark.jpg" alt="Dark Theme">
          <p>Oscuro</p>
        </div>
        <div class="theme-option" :class="{ selected: selectedTheme === 'auto' }" @click="selectTheme('auto')">
          <img src="../../assets/images/auto.jpg" alt="Auto Theme">
          <p>Automatico</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useThemeStore, useUserStore } from '../../../back-end/src/store.js'

const themeStore = useThemeStore()
const selectedTheme = ref('light')

const isDarkMode = computed(() => themeStore.isDarkMode)

const selectTheme = (theme) => {
  selectedTheme.value = theme
  if (theme === 'auto') {
    setAutoTheme()
  } else {
    themeStore.setTheme(theme)
    applyTheme(theme)
  }
}

const setAutoTheme = () => {
  const hour = new Date().getHours()
  const theme = (hour >= 6 && hour < 18) ? 'light' : 'dark'
  themeStore.setTheme(theme)
  applyTheme(theme)
}

const applyTheme = (theme) => {
  document.body.className = ''
  if (theme === 'light') {
    document.body.classList.add('light-mode')
  } else if (theme === 'dark') {
    document.body.classList.add('dark-mode')
  }
}

watch(selectedTheme, (newTheme) => {
  if (newTheme !== 'auto') {
    themeStore.setTheme(newTheme)
    applyTheme(newTheme)
  }
})

onMounted(() => {
  const initialTheme = themeStore.isDarkMode ? 'dark' : 'light'
  applyTheme(initialTheme)
  selectedTheme.value = initialTheme
})

</script>
//-----------------------Script para botones de actualizacion----------------------
<script>
const userStore = useUserStore();
const user = computed(() => userStore.user);
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      firstName: '',
      lastName: '',
      secondLastName: '',
      campus: '',
      major: '',
      passwordVisible: false,

    }
  },
  methods: {
    async edit_username() {
      try {
        //var val_pass = prompt("Ingrese la contraseña actual para actualizar")
        //const response = await axios.post('http://localhost:8080/verify_password', {
        //email: user.value.email,
        //val_password: val_pass
        //});
        //if (response.data.passwordCorrect) {
        const response = await axios.post('http://localhost:8080/edit_username', {
          email: user.value.email,
          new_username: this.newusername
        });

        console.log(response.data);
        //} else {
        //  alert("Contraseña incorrecta")
        //}

      } catch (error) {
        console.error(error);
      }
    },
    async edit_password() {
      try {
        const response = await axios.post('http://localhost:8080/edit_password', {
          email: user.value.email,
          new_password: this.newpassword,
        });

        console.log(response.data);

      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
.settings-page {
  padding: 2rem;
  margin: 60px auto;
  background-color: var(--background-color);
  color: var(--text-color);
  width: 80%;
}

.container {
  background: var(--container-background-color);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.profile-setting {
  margin-bottom: 1rem;
}

.profile-setting label {
  display: flex;
  font-size: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

h2 {
  margin-bottom: 1rem;
  font-weight: 600;
}

.profile-setting input {
  width: 55%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border-color: transparent;
  background-color: var(--input-background-color);
  color: var(--text-color);
  display: inline-block;
  margin-left: 0;
  flex-flow: row wrap;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--button-background-color);
}

.theme-selector {
  display: flex;
  gap: 1rem;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: border-color 0.3s;
}

.theme-option.selected {
  border-color: var(--button-background-color);
}

.theme-option img {
  width: 100px;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
}

.theme-option p {
  margin-top: 0.5rem;
  font-size: 1rem;
  text-align: center;
}

p {
  text-align: left;
  margin-left: 2%;
  margin-top: 1%;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2%;

}

.card-client {
  background: #555;
  width: 70%;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 20px;
  padding-right: 20px;
  border: 4px solid #fff;
  box-shadow: 0 6px 10px #212121;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  transition: all 0.3s ease;
}

.card-client:hover {
  transform: translateY(-10px);
}

.user-picture {
  overflow: hidden;
  object-fit: cover;
  width: 10rem;
  height: 10rem;
  border: 4px solid #fff;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.user-picture svg {
  width: 2.5rem;
  fill: currentColor;
}

.name-client {
  margin: 0;
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;
}

.name-client span {
  display: block;
  font-weight: 200;
  font-size: 18px;
}

.contenedor {
  width: 100%;
}


.Btn {
  position: relative;
  margin-left: 2%;
  justify-content: flex-start;
  width: 21%;
  height: 40px;
  border: none;
  padding: 0px 20px;
  background-color: #212121;
  color: white;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #6d6b6b;
  transition-duration: .3s;
  right: 0%;
}

.svg {
  width: 13px;
  position: absolute;
  right: 0;
  margin-right: 20px;
  fill: white;
  transition-duration: .3s;
}

.Btn:hover {
  color: transparent;
}

.Btn:hover svg {
  right: 43%;
  margin: 0;
  padding: 0;
  border: none;
  transition-duration: .3s;
}

.Btn:active {
  transform: translate(3px, 3px);
  transition-duration: .3s;
  box-shadow: 2px 2px 0px rgb(237, 237, 237);
}
</style>
