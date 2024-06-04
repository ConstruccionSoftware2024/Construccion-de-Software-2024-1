<template>
    <div class="historial">
      <h1>Evaluación (vista alumno)</h1>
      <div class="color-box" :style="{ backgroundColor: color }">
        <div class="centered-text">Riesgo</div>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      sitios: [],
      color: 'green',
      colors: ['green', 'yellow', 'red'],
      index: 0
    }
  },
  mounted() {
    this.color = this.colors[this.getRandomIndex()]
  },
  methods: {
    getRandomIndex() {
      return Math.floor(Math.random() * this.colors.length)
    }
  }
}
</script>

<style scoped>
.color-box {
  width: 100px;
  height: 50px;
  position: fixed;
  top: 120px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center; 
}

.centered-text {
  text-align: center;
}
</style>
