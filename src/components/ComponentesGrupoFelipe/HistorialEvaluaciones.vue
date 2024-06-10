<template>
  <div>
    <ul class="subject-list">
      <h2>Historial de evaluaciones</h2>
      <li v-for="(subject, index) in subjects" :key="index">
        <router-link to="/lista-alumnos">
          <button class="subject-button">
            {{ subject }}
          </button>
        </router-link>
      </li>
      <li><router-link to="/opciones"><button class="subject-button">Volver atrás</button></router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjects: []
    }
  },
  created() {
    const numberOfSubjects = Math.floor(Math.random() * 10) + 1
    for (let i = 1; i <= numberOfSubjects; i++) {
      this.subjects.push(`Evaluacion ${i}`)
    }
  }
}
</script>

<style scoped>
.subject-list {
  list-style-type: none;
  padding: 0;
}

.subject-list li {
  margin-bottom: 10px;
}

.subject-button {
  background-color: #08cccc;
  border: none;
  color: white;
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>