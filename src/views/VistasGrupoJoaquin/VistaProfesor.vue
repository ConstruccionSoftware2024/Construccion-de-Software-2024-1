<template>
    <div class="profesorPage">
        <h1>Sesion id:1</h1>
        <div class="dashboard">
            <button @click="createSession">Crear Sesión</button>
            <button @click="otherOptions">Otras Opciones</button>
        </div>
        <div class="mainContainer">
            <div class="chartContainer">
                <canvas id="studentsPieChart"></canvas>
                <div class="legend">
                </div>
            </div>
            <div class="chartDataContainer">
                <h2>Datos del Gráfico</h2>
                <p><strong>Total de Estudiantes:</strong> {{ students.length }}</p>
                <p><strong>Aplicaciones Peligrosas Abiertas:</strong> {{ totalDangerousApps }}</p>
                <p><strong>Última Actividad:</strong> {{ lastActivity }}</p>
                <div class="charts">
                    <canvas id="appsBarChart"></canvas>
                </div>
            </div>
        </div>
        <div class="bottomContainer">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Matrícula</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in students" :key="student.matricula"
                        :class="{ peligro: student.status === 'Peligro', advertencia: student.status === 'Advertencia' }">
                        <td>{{ student.nombre }}</td>
                        <td>{{ student.apellido }}</td>
                        <td>{{ student.matricula }}</td>
                        <td
                            :class="{ 'peligro-text': student.status === 'Peligro', 'advertencia-text': student.status === 'Advertencia' }">
                            {{ student.status }}</td>
                        <td>
                            <button class="actionButton ban" @click="banStudent(student)">Banear</button>
                            <button class="actionButton expel" @click="expelStudent(student)">Expulsar</button>
                            <button class="actionButton notify" @click="notifyStudent(student)">Notificar</button>
                            <button class="actionButton view" @click="viewProcesses(student)"><i
                                    class="fas fa-eye"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="showModal" class="modal" @click.self="closeModal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h2>Procesos de {{ selectedStudent.nombre }}</h2>
                <ul>
                    <li v-for="app in selectedStudent.apps" :key="app.name">
                        <i class="fas fa-check-circle" :class="app.status"></i>{{ app.name }} - {{ app.status }}
                    </li>
                </ul>
                <button class="closeButton" @click="closeModal">Cerrar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
    name: 'ProfesorPage',
    setup() {
        const students = ref([
            { nombre: 'Alumno 1', apellido: 'Apellido 1', matricula: '12345', status: 'Peligro', apps: [{ name: 'Discord', status: 'danger' }, { name: 'Chrome', status: 'normal' }], recentActivity: ['Abrió Discord', 'Visitó un sitio web'] },
            { nombre: 'Alumno 2', apellido: 'Apellido 2', matricula: '12346', status: 'Normal', apps: [{ name: 'Word', status: 'normal' }, { name: 'Chrome', status: 'normal' }], recentActivity: ['Escribió un documento', 'Visitó un sitio web'] },
            { nombre: 'Alumno 3', apellido: 'Apellido 3', matricula: '12347', status: 'Advertencia', apps: [{ name: 'Slack', status: 'warning' }, { name: 'Excel', status: 'normal' }], recentActivity: ['Usó Slack', 'Editó una hoja de cálculo'] },
            { nombre: 'Alumno 4', apellido: 'Apellido 4', matricula: '12348', status: 'Normal', apps: [{ name: 'PowerPoint', status: 'normal' }, { name: 'Chrome', status: 'normal' }], recentActivity: ['Creó una presentación', 'Visitó un sitio web'] },
            { nombre: 'Alumno 5', apellido: 'Apellido 5', matricula: '12349', status: 'Peligro', apps: [{ name: 'Teams', status: 'danger' }, { name: 'Chrome', status: 'normal' }], recentActivity: ['Usó Teams', 'Visitó un sitio web'] },
            { nombre: 'Alumno 6', apellido: 'Apellido 6', matricula: '12350', status: 'Normal', apps: [{ name: 'Word', status: 'normal' }, { name: 'Chrome', status: 'normal' }], recentActivity: ['Escribió un documento', 'Visitó un sitio web'] },
            { nombre: 'Alumno 7', apellido: 'Apellido 7', matricula: '12351', status: 'Advertencia', apps: [{ name: 'Zoom', status: 'warning' }, { name: 'Chrome', status: 'normal' }], recentActivity: ['Usó Zoom', 'Visitó un sitio web'] },
            { nombre: 'Alumno 8', apellido: 'Apellido 8', matricula: '12352', status: 'Normal', apps: [{ name: 'Excel', status: 'normal' }, { name: 'Chrome', status: 'normal' }], recentActivity: ['Editó una hoja de cálculo', 'Visitó un sitio web'] },
            { nombre: 'Alumno 9', apellido: 'Apellido 9', matricula: '12353', status: 'Advertencia', apps: [{ name: 'Skype', status: 'warning' }, { name: 'Chrome', status: 'normal' }], recentActivity: ['Usó Skype', 'Visitó un sitio web'] },
            { nombre: 'Alumno 10', apellido: 'Apellido 10', matricula: '12354', status: 'Peligro', apps: [{ name: 'Discord', status: 'danger' }, { name: 'Chrome', status: 'normal' }], recentActivity: ['Abrió Discord', 'Visitó un sitio web'] },
        ]);

        const totalDangerousApps = ref(students.value.reduce((total, student) => {
            return total + student.apps.filter(app => app.status === 'danger').length;
        }, 0));

        const lastActivity = ref(students.value.map(student => student.recentActivity).flat().pop());

        const filteredStudents = ref([]);
        const showModal = ref(false);
        const selectedStudent = ref(null);

        const handleChartClick = (event, elements) => {
            if (elements.length) {
                const chart = elements[0].element.$context.raw;
                const index = elements[0].index;
                const label = chart.data.labels[index];
                filteredStudents.value = students.value.filter(student => student.status === label);
                showModal.value = true;
            }
        };

        const createCharts = () => {
            const pieCtx = document.getElementById('studentsPieChart').getContext('2d');
            const appsCtx = document.getElementById('appsBarChart').getContext('2d');

            const data = {
                labels: ['Peligro', 'Advertencia', 'Normal'],
                datasets: [{
                    data: [
                        students.value.filter(s => s.status === 'Peligro').length,
                        students.value.filter(s => s.status === 'Advertencia').length,
                        students.value.filter(s => s.status === 'Normal').length,
                    ],
                    backgroundColor: ['#FF0000', '#f7d547', '#008000'],
                }],
            };

            new Chart(pieCtx, {
                type: 'pie',
                data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 1,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Estado de los Estudiantes',
                        },
                    },
                    onClick: handleChartClick,
                },
            });

            const appUsage = students.value.reduce((acc, student) => {
                student.apps.forEach(app => {
                    if (acc[app.name]) {
                        acc[app.name]++;
                    } else {
                        acc[app.name] = 1;
                    }
                });
                return acc;
            }, {});

            const appLabels = Object.keys(appUsage);
            const appData = Object.values(appUsage);

            new Chart(appsCtx, {
                type: 'bar',
                data: {
                    labels: appLabels,
                    datasets: [{
                        label: 'Uso de Aplicaciones',
                        data: appData,
                        backgroundColor: '#08cccc',
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: 'Uso de Aplicaciones por los Estudiantes',
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                maxRotation: 90,
                                minRotation: 45,
                            }
                        }
                    }
                },
            });
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const banStudent = (student) => {
            alert(`Estudiante ${student.nombre} baneado.`);
        };

        const expelStudent = (student) => {
            alert(`Estudiante ${student.nombre} expulsado.`);
        };

        const notifyStudent = (student) => {
            alert(`Notificación enviada a ${student.nombre}.`);
        };

        const viewProcesses = (student) => {
            selectedStudent.value = student;
            showModal.value = true;
        };

        const createSession = () => {
            alert('Sesión creada.');
        };

        const otherOptions = () => {
            alert('Otras opciones.');
        };

        onMounted(() => {
            createCharts();
        });

        return {
            students,
            filteredStudents,
            showModal,
            closeModal,
            totalDangerousApps,
            lastActivity,
            selectedStudent,
            banStudent,
            expelStudent,
            notifyStudent,
            viewProcesses,
            createSession,
            otherOptions,
        };
    },
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
    color: var(--text-color);
}

.profesorPage {
    padding: 2rem;
    margin: 60px auto;
    background-color: var(--background-color);
    color: #333;
    width: 80%;
    max-width: 1200px;
}

.dashboard {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.dashboard button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: var(--button-background-color);
    color: var(--text-color);
    cursor: pointer;
    font-size: 1rem;
}

.dashboard button:hover {
    background-color: var(--button-hover-background-color);
}

.mainContainer {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
}

.chartContainer,
.chartDataContainer {
    width: calc(50% - 10px);
    color: var(--text-color);
    height: 500px;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--container-background-color);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    overflow: hidden;
}

.chartContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.chartContainer canvas {
    width: 100%;
    height: auto;
    max-width: 400px;
    max-height: 400px;
}

.chartDataContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
}

.chartDataContainer .charts {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-top: 40px;
}

.chartDataContainer .charts canvas {
    width: 100%;
    height: auto;
    max-height: 200px;
}

.chartDataContainer p {
    margin: 10px 0;
}

.bottomContainer {
    margin-top: 20px;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: var(--container-background-color);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

table,
th,
td {
    border: 1px solid var(--border-color);
    background-color: var(--container-background-color);
    color: var(--text-color);
}

th,
td {
    padding: 12px 15px;
    text-align: left;
    font-size: 0.9rem;
}

th {
    background-color: var(--container-background-color);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
}

.actionButton {
    margin: 5px 5px 5px 0;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
}

.actionButton.ban {
    color: var(--text-color);
    background-color: var(--table-button-color);
}

.actionButton.ban:hover {
    background-color: var(--button-hover-background-color);
}

.actionButton.expel {
    color: var(--text-color);
    background-color: var(--table-button-color);
}

.actionButton.expel:hover {
    background-color: var(--button-hover-background-color);
}

.actionButton.notify {
    color: var(--text-color);
    background-color: var(--table-button-color);
}

.actionButton.notify:hover {
    background-color: var(--button-hover-background-color);
}

.actionButton.view {
    color: var(--text-color);
    background-color: var(--table-button-color);
}

.actionButton.view:hover {
    background-color: var(--button-hover-background-color);
}

.peligro {
    background-color: rgba(255, 0, 0, 0.1);
}

.advertencia {
    background-color: rgba(255, 255, 0, 0.1);
}

.peligro-text {
    font-weight: bold;
    color: #FF0000;
}

.advertencia-text {
    font-weight: bold;
    color: #f7d547;
}


.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: var(--container-background-color);
    color: var(--text-color);
    margin: auto;
    padding: 20px;
    width: 80%;
    max-width: 600px;
    border-radius: 10px;
    text-align: center;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: var(--text-color);
    text-decoration: none;
    cursor: pointer;
}

.modal-content ul {
    list-style: none;
    padding: 0;
}

.modal-content li {
    padding: 10px;
}

.modal-content li:last-child {
    border-bottom: none;
}

.modal-content i {
    margin-right: 10px;
}

.closeButton {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: var(--button-background-color);
    color: var(--text-color);
    cursor: pointer;
    font-size: 1rem;
}

.closeButton:hover {
    background-color: var(--button-hover-background-color);
}


@media (max-width: 1200px) {
    .mainContainer {
        flex-direction: column;
        align-items: center;
    }

    .chartContainer,
    .chartDataContainer {
        width: 100%;
        margin-bottom: 20px;
    }
}

@media (max-width: 768px) {
    .dashboard {
        flex-direction: column;
        align-items: center;
    }

    .dashboard button {
        margin-bottom: 10px;
        width: 100%;
    }

    .legend {
        flex-direction: column;
    }
}

@media (max-width: 576px) {

    .chartContainer,
    .chartDataContainer {
        height: auto;
    }

    .chartDataContainer .charts canvas {
        height: 300px;
    }

    table,
    th,
    td {
        font-size: 0.8rem;
    }

    .actionButton {
        padding: 5px 8px;
        font-size: 0.8rem;
    }
}
</style>