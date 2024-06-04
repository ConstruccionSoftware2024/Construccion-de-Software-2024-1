<template>
  <div class="history">
    <h2>Historial de Páginas Visitadas</h2>
    <div class="card-container">
      <div class="card bg-navbar" v-for="(student, index) in students" :key="index">
        <h3>Alumno: {{ index + 1 }}</h3>
        <p>Paginas visitadas:</p>
        <ul>
          <li v-for="(page, pageIndex) in student.pages" :key="pageIndex">{{ page }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [
        { pages: ['Página 1', 'Página 2', 'Página 3'] },
        { pages: ['Página 1', 'Página 4', 'Página 5'] },
        { pages: ['Página 2', 'Página 6', 'Página 7'] }
      ]
    }
  }
}
</script>

<style scoped>
.history {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px;
  text-align: center;
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  border: 1px solid #000000;
  padding: 15px;
  margin: 10px 0;
  width: 100%;
  max-width: 400px;
  text-align: left;
}

.card h3 {
  margin: 0 0 10px;
}

.card ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.card ul li {
  margin: 5px 0;
}
</style>
