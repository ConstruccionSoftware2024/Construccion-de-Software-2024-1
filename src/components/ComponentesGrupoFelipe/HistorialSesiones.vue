<template>
    <div class="session-history-page">
        <main>
            <h3>Historial de Sesiones para {{ selectedSubjectTitle }}</h3>
            <div class="filter">
                <label for="subject-select">Selecciona una asignatura:</label>
                <select id="subject-select" v-model="selectedSubject" @change="filterSessions">
                    <option v-for="subject in subjects" :key="subject._id" :value="subject._id">
                        {{ subject.title }}
                    </option>
                </select>
            </div>
            <div class="history box-shadow">
                <table>
                    <thead>
                        <tr>
                            <th>ID de Sesión</th>
                            <th>Nombre del Alumno</th>
                            <th>Fecha</th>
                            <th>Duración</th>
                            <th>Estado</th>
                            <th class="acciones">Vista</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="session in filteredSessions" :key="session._id">
                            <td>{{ session._id }}</td>
                            <td>{{ session.studentName }}</td>
                            <td>{{ session.date }}</td>
                            <td>{{ session.duration }}</td>
                            <td>{{ session.status }}</td>
                            <td class="acciones">
                                <button v-if="session.status === 'Activo'" @click="handleButtonClick(session._id)">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const selectedSubject = ref('');
        const selectedSubjectTitle = ref('');
        const subjects = ref([]);
        const sessions = ref([]);
        const filteredSessions = computed(() => {
            return sessions.value.filter(session => session.asignatura === selectedSubject.value);
        }
        );

        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/subjects');
                subjects.value = response.data;
                if (subjects.value.length > 0) {
                    selectedSubject.value = subjects.value[0]._id;
                    selectedSubjectTitle.value = subjects.value[0].title;
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        const fetchSessions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/sessions');
                sessions.value = response.data;
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        const handleButtonClick = (sessionId) => {
            alert(`Botón presionado para la sesión ${sessionId}`);
        };

        const filterSessions = () => {
            const subject = subjects.value.find(subj => subj._id === selectedSubject.value);
            selectedSubjectTitle.value = subject ? subject.title : '';
        };

        onMounted(() => {
            fetchSubjects();
            fetchSessions();
        });

        return {
            selectedSubject,
            selectedSubjectTitle,
            subjects,
            sessions,
            filteredSessions,
            handleButtonClick,
            filterSessions,
        };
    },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.session-history-page {
    font-family: Arial, sans-serif;
    padding: 20px;
}

h3 {
    font-size: 3em;
    text-align: left;
    margin-left: 4%;
    margin-bottom: 20px;
}

.filter {
    margin-left: 4%;
    margin-bottom: 20px;
}

.history {
    margin: 0 auto;
    padding: 20px;
    width: 95%;
    background: white;
    border-radius: 10px;
}

.history table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    /* Asegura que el ancho de las columnas sea fijo */
}

.history th,
.history td {
    border: 1px solid #ddd;
    padding: 8px;
}

.history th {
    background-color: #f2f2f2;
    text-align: left;
}

.history th.acciones,
.history td.acciones {
    width: 50px;
    text-align: center;
    padding: 0;
}

button {
    padding: 5px 10px;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

button i {
    color: #4bb6b8;
    font-size: 16px;
}

button:hover i {
    color: #2a8689;
}

.box-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>