<template>
  <section class="options">
    <div class="title">
      <h2>Módulos</h2>
    </div>
    <input v-model="searchTerm" placeholder="Buscar módulo" class="search-bar">
    <i @click="addModule" class="fas fa-plus-circle add-icon"></i>
  </section>
  <section class="dashboard">
    <div v-for="(subject, index) in filteredSubjects" :key="index" class="card">
      <div class="card-header">
        <router-link to="/estadoAlumnos">
          <button class="subject-button">
            {{ subject.name }}
          </button>
        </router-link>
      </div>
      <hr>
      <p>{{ subject.semester }}</p>
      <p>Nro de estudiantes: {{ subject.studentCount }}</p>
      <p>Área: {{ subject.area }}</p>
      <div class="dropdown">
        <button class="dropbtn">&#9660;</button>
        <div class="dropdown-content">
          <router-link to="/crearevaluacion">Crear evaluación</router-link>
          <router-link to="/historialevaluaciones">Ver evaluaciones anteriores</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      subjects: [],
      searchTerm: ''
    }
  },
  computed: {
    filteredSubjects() {
      if (this.searchTerm) {
        return this.subjects.filter(subject => subject.name.includes(this.searchTerm));
      } else {
        return this.subjects;
      }
    }
  },
  methods: {
    addModule() {
    }
  },
  created() {
    const numberOfSubjects = Math.floor(Math.random() * 10) + 1
    for (let i = 1; i <= numberOfSubjects; i++) {
      this.subjects.push({
        name: `Asignatura ${i}`,
        semester: `Semestre ${Math.floor(Math.random() * 2) + 1}`, // Genera aleatoriamente "Semestre 1" o "Semestre 2"
        studentCount: Math.floor(Math.random() * 100),
        area: ['Matemáticas', 'Computación', 'Programación'][Math.floor(Math.random() * 3)],
        showOptions: false 
      })
    }
  }
}
</script>

<style scoped>
.subject-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.subject-list li {
  margin-bottom: 10px;
}


.dropdown {
  position: relative;
  display: inline-block;
  left: 12em;
  width: 30px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--container-background-color);
  width: 14em;
  z-index: 1;
}

.dropdown-content a {
  color: var(--text-color);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  white-space: nowrap;
}

.dropdown-content a:hover {  
  background-color: var(--grey-hover-color);
}

.dropdown:hover .dropdown-content {
  display: block;
  background-color: var(--container-background-color);
}

.dropbtn {
  background-color: #08cccc;
  color: #f1f1f1;
  padding: 5px;
  width: 100%;
  border: none;
}

.dropbtn:hover {
  background-color: var(--button-hover-background-color);
}

.title {
  align-self: flex-start;
}

h2 {
  font-weight: bold;
  font-size: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left !important; 
}

hr {
  border: 0;
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

section {
  margin: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0em;
}

.add-icon { /* Pensado para que se agreguen módulos */ 
  cursor: pointer;
  position: absolute;
  right: 6.5em;
  font-size: 30px;
}

.search-bar {
  position: absolute;
  right: 20px;
  height: 40px;
  padding-left: 10px;
}

.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  margin: 0 auto;
  max-width: 1800px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.card {
  position: relative;
  width: 250px;
  height: 350px;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  padding: 16px;
  background-color: var(--container-background-color);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  margin: 16px;
  display: flex;
  flex-direction: column;
  allign-items: center;
  justify-content: center;
}

.toggle-button {
  position: absolute;
  top: 20em;
  right: 1em;
}

.subject-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 200px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.subject-button {
  border-radius: 5px;
  background-color: #08cccc;
  border: none;
  color: white;
  padding: 80px 62px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  margin-bottom: 0px;
}

.subject-button:hover {
  background-color: white; 
  color: black; 
  border: 2px solid var(--button-background-color);
}
</style>
