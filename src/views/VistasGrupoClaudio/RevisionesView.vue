/* H12 Como profesor quiero un listado de alumno general (Para todos los profesores) que permita
mostrarme las faltas de cada alumno y clasificarlos como “peligrosos” o “no peligrosos” */

<template>
  <div class="container">
    <div class="search-bar">
      <input
        class="search-input"
        type="text"
        v-model="searchName"
        placeholder="Buscar por nombre"
      />
      <input
        class="search-input"
        type="text"
        v-model="searchLastName"
        placeholder="Buscar por apellido"
      />
      <input
        class="search-input"
        type="text"
        v-model="searchEmail"
        placeholder="Buscar por email"
      />
      <input class="search-input" type="text" v-model="searchRut" placeholder="Buscar por RUT" />
    </div>

    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Mail</th>
            <th>RUT</th>
            <th>Faltas</th>
            <th>Detalle de Faltas</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="index">
            <td>{{ student.name }}</td>
            <td>{{ student.lastName }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.rut }}</td>
            <td @click="student.showDetalleFaltas = !student.showDetalleFaltas">
              {{ student.faltas }}
            </td>

            <td class="detalle-container">
              <button
                class="button-detalle"
                @click="student.showDetalleFaltas = !student.showDetalleFaltas"
              >
                {{ student.showDetalleFaltas ? 'Ocultar' : 'Mostrar' }}
              </button>

              <div v-if="student.showDetalleFaltas">
                <table class="detalle-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Motivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(detalle, index) in student.detalleFaltas" :key="index">
                      <td>{{ detalle.fecha }}</td>
                      <td>{{ detalle.motivo }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
            <td>
              <select
                v-model="student.estado"
                class="selector-peligro"
                @change="updateStudentStatus(student)"
              >
                <option class="opcion-peligro">No peligroso</option>
                <option class="opcion-peligro">Peligroso</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const searchName = ref('');
const searchLastName = ref('');
const searchEmail = ref('');
const searchRut = ref('');
const students = ref([]);

const filteredStudents = computed(() => {
  return students.value.filter((student) => {
    return (
      student.name?.toLowerCase().includes(searchName.value.toLowerCase()) &&
      student.lastName?.toLowerCase().includes(searchLastName.value.toLowerCase()) &&
      student.email?.toLowerCase().includes(searchEmail.value.toLowerCase()) &&
      student.rut?.toLowerCase().includes(searchRut.value.toLowerCase())
    )
  })
});

const updateStudentStatus = async (student) => {
  try {
    await axios.post(`http://localhost:8080/faltas/${student.id}`, {
      estado: student.estado
    });
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/faltas');
    students.value = response.data;
  } catch (error) {
    console.error(error);
  }
});

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
  position: relative;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  padding: 20px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  margin: 0 10px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.table-container {
  overflow-x: auto;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.styled-table thead tr {
  background-color: #08cccc;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
}

.styled-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f9f9f9;
}

.styled-table tbody tr.selected-row {
  background-color: #f8f4e7;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.detalle-table {
  width: 100%;
}

.delete-button:hover {
  background-color: rgba(220, 53, 69, 0.2);
}

.delete-button:hover i {
  color: #dc3545;
}

.detalle-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-detalle {
  padding: 8px;
  background-color: #08cccc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.selector-peligro {
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  width: 100%;
}
</style>
