<template>
  <nav class="nav-bar">
    <div class="nav-item">
      <i class="fa-solid fa-user user-icon"></i>
      <span>{{ username }}</span>
    </div>
    <div class="nav-item dark-mode-switch">
      <div class="switch" @click="toggleDarkMode">
        <div class="slider" :class="{ 'slider-active': darkMode }"></div>
      </div>
      <label>Modo oscuro</label>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      username: 'Usuario',
      darkMode: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      document.body.classList.toggle('dark-mode', this.darkMode)
    }
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: #c58940;
  display: flex;
  justify-content: space-between;
  height: 100px;
  border: none;
  color: white;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 40px;
}

.user-icon {
  font-size: 3em;
  margin-left: 60px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  background-color: #ccc;
  border-radius: 17px;
  cursor: pointer;
  transition: background-color 0.4s;
}
.slider {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 26px;
  height: 26px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.4s;
}
.slider-active {
  transform: translateX(26px);
}
.dark-mode .switch {
  background-color: #4e4e4e;
}
</style>
