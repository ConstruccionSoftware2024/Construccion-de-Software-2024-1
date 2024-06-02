<template>
  <div class="homePage">
    <h1>Bienvenido!</h1>
    <p>esta es la pagina principal.</p>
    <button @click="login">Log in</button>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    login() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
.homePage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: #fff;
}

h1 {
  font-size: 3em;
  margin-bottom: 0%;
}

p {
  font-size: 1em;
  margin-bottom: 1em;
}

button {
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  background-color: #08cccc;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

button:hover {
  background-color: #06bfbf;
}
</style>
