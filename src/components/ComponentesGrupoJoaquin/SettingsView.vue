<template>
  <div class="settings-page">
    <div class="container">
      <h2>Perfil</h2>
      <div class="profile-setting">
        <label for="username">Nombre de usuario</label>
        <input type="text" id="username" v-model="profile.username">
      </div>
      <div class="profile-setting">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" v-model="profile.email">
      </div>
    </div>
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
import { useThemeStore } from '../../../back-end/src/store.js'

const themeStore = useThemeStore()
const selectedTheme = ref('light')
const profile = ref({
  username: 'faltaEditar',
  email: 'esta funcionalidad'
})
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
  display: block;
  font-size: 1rem;
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 1rem;
  font-weight: 600;
}

.profile-setting input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border-color: transparent;
  background-color: var(--input-background-color);
  color: var(--text-color);
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
</style>
