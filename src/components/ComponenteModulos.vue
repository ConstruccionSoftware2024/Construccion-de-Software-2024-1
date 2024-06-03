<template>
  <div>
    <router-link to="/opciones">
      <button v-for="(subject, index) in subjects" :key="index">
        {{ subject }}
      </button></router-link
    >
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
      this.subjects.push(`Asignatura ${i}`)
    }
  }
}
</script>
