<template>
  <footer>
    <div class="container">
      <p>&copy; 2024 Proyecto</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  background-color: #c58940;
  color: black;
  padding: 20px 0;
  width: 100%;
  margin-top: auto;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

p {
  margin: 0;
}
</style>
