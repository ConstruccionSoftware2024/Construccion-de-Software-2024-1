<template>
  <div class="buttons">
    <button @click="toggleTheme">Dark Mode</button>
  </div>
</template>

<script setup>
import { useThemeStore } from '../../../back-end/src/store.js'

const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.toggleDarkMode()
}
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

button {
  padding: 1rem 2rem;
  font-size: 1rem;
  background-color: #08cccc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
