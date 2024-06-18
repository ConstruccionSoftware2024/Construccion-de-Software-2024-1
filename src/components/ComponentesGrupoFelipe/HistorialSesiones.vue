<template>
    <div class="session-history-page">
        <main>
            <h3>Historial de Sesiones para {{ selectedSubject }}</h3>
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
                        <tr v-for="session in sessions" :key="session.id">
                            <td>{{ session.id }}</td>
                            <td>{{ session.studentName }}</td>
                            <td>{{ session.date }}</td>
                            <td>{{ session.duration }}</td>
                            <td>{{ session.status }}</td>
                            <td class="acciones">
                                <button v-if="session.status === 'Activo'" @click="handleButtonClick(session.id)">
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
import { ref } from 'vue';

export default {
    setup() {
        const selectedSubject = ref('Matemáticas');
        const sessions = ref([
            { id: 1, studentName: 'Alumno 1', subject: 'Matemáticas', date: '2023-06-01', duration: '1 hora', status: 'Inactivo' },
            { id: 2, studentName: 'Alumno 2', subject: 'Matemáticas', date: '2023-06-05', duration: '1.5 horas', status: 'Inactivo' },
            { id: 3, studentName: 'Alumno 3', subject: 'Matemáticas', date: '2023-06-05', duration: '1.5 horas', status: 'Activo' },
            { id: 4, studentName: 'Alumno 4', subject: 'Matemáticas', date: '2023-06-05', duration: '1.5 horas', status: 'Activo' },
            { id: 5, studentName: 'Alumno 5', subject: 'Matemáticas', date: '2023-06-05', duration: '1.5 horas', status: 'Activo' },
            { id: 6, studentName: 'Alumno 6', subject: 'Matemáticas', date: '2023-06-05', duration: '1.5 horas', status: 'Activo' },
            { id: 7, studentName: 'Alumno 7', subject: 'Matemáticas', date: '2023-06-05', duration: '1.5 horas', status: 'Inactivo' },
            { id: 8, studentName: 'Alumno 8', subject: 'Matemáticas', date: '2023-06-05', duration: '1.5 horas', status: 'Activo' },
            { id: 9, studentName: 'Alumno 9', subject: 'Matemáticas', date: '2023-06-05', duration: '1.5 horas', status: 'Activo' },
            { id: 10, studentName: 'Alumno 10', subject: 'Matemáticas', date: '2023-06-05', duration: '1.5 horas', status: 'Activo' },
        ]);

        const handleButtonClick = (sessionId) => {
            alert(`Botón presionado para la sesión ${sessionId}`);
        };

        return {
            selectedSubject,
            sessions,
            handleButtonClick,
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