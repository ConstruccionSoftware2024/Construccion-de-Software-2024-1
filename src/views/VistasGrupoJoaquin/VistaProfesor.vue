<template>
    <div class="profesorPage">
        <h1>Sesion id:{{ sessionId }}</h1>
        <div class="dashboard">
            <button @click="createSession">Crear Sesión</button>
            <button @click="otherOptions">Otras Opciones</button>
        </div>
        <div class="mainContainer">
            <div class="chartContainer">
                <canvas id="studentsPieChart"></canvas>
                <div class="legend"></div>
            </div>
            <div class="chartDataContainer">
                <h2>Datos del Gráfico</h2>
                <p><strong>Total de Estudiantes:</strong> {{ alumnos.length }}</p>
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
                        <th>Matrícula</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="alumno in alumnos" :key="alumno._id">
                        <td>{{ alumno.matricula }}</td>
                        <td>{{ alumno.firstName }}</td>
                        <td>{{ alumno.lastName }}</td>
                        <td>{{ alumno.secondLastName }}</td>
                        <td
                            :class="{ 'peligro-text': alumno.status === 'Peligro', 'advertencia-text': alumno.status === 'Advertencia', 'normal-text': alumno.status === 'Normal' }">
                            {{ alumno.status }}
                        </td>
                        <td>
                            <button class="actionButton ban" @click="banExpStudent(alumno, accion = true)"
                                :disabled="alumno.status !== 'Peligro' && alumno.status !== 'Advertencia'">Banear</button>
                            <!-- Si "accion" es true se banea, si no, no -->
                            <button class="actionButton expel" @click="banExpStudent(alumno, accion = false)"
                                :disabled="alumno.status !== 'Peligro' && alumno.status !== 'Advertencia'">Expulsar</button>
                            <button class="actionButton notify" @click="notifyStudent(alumno)">Notificar</button>
                            <button class="actionButton view" @click="viewProcesses(alumno)"><i
                                    class="fas fa-eye"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="showModal" class="modal" @click.self="closeModal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h2>Procesos de {{ selectedStudent.firstName }} {{ selectedStudent.lastName }} {{
                    selectedStudent.secondLastName }}</h2>
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
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {

    data() {

        return {
            alumnos: [],
            session: {},
            totalDangerousApps: 0,
            lastActivity: '',
            showModal: false,
            selectedStudent: null,
            sessionId: '665d1794a22b8d44afad0793'
        };
    },
    created() {
        this.fetchUsers();
    },
    name: 'ProfesorPage',
    methods: {
        /*async fetchSessionData() {
            try {
                const response = await axios.get(`http://localhost:8080/sessions/${this.idRuta}`);
                const sessionData = response.data;
                this.session = sessionData;
                this.alumnos = this.assignAppsToStudents(sessionData.participantes);
                this.totalDangerousApps = this.calculateTotalDangerousApps(this.alumnos);
                this.lastActivity = new Date().toLocaleString();
                this.createCharts();
            } catch (error) {
                console.error('Error fetching session data:', error);
            }
        },*/
        assignAppsToStudents(students) {
            const dangerApps = ['Discord', 'ChatGPT', 'Steam'];
            const warningApps = ['Slack', 'Zoom', 'Skype'];
            const normalApps = ['Word', 'Excel', 'PowerPoint', 'Chrome'];

            return students.map((student, index) => {
                const apps = [];
                let status = 'Normal';

                if (index % 3 === 0) {
                    status = 'Peligro';
                } else if (index % 3 === 1) {
                    status = 'Advertencia';
                }

                const appList = status === 'Peligro' ? dangerApps : (status === 'Advertencia' ? warningApps : normalApps);
                const randomApps = this.shuffleArray(appList);

                const numberOfApps = Math.floor(Math.random() * 2) + 2;
                for (let i = 0; i < numberOfApps; i++) {
                    apps.push({ name: randomApps[i], status });
                }

                return {
                    ...student,
                    apps,
                    status,
                };
            });
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        async fetchUsers() {
            try {
                //el gran problema que hubo para hacer filtro y usar los usuarios dentro de la bd fue que no habia usuarios y no existia un metodo para agregarlos
                //por lo que se tuvo que hacer un metodo para agregar usuarios  directamente en el array de la bd de mongo
                //pero al menos ya funcion el filtro y se pueden ver los usuarios en la tabla con su respectiva información

                const response = await axios.get('http://localhost:8080/users');
                const participantes = response.data;

                const sessionResponse = await axios.get('http://localhost:8080/sesion/' + this.sessionId);// + this.sessionId);
                const sessionUsers = sessionResponse.data;

                console.log("ID de los Usuarios de la Sesion \n" + sessionUsers.participantes);

                const participantesIds = sessionUsers.participantes;

                const studentsWithApps = this.assignAppsToStudents(participantes).filter(user =>
                    participantesIds.includes(user._id)
                );

                //const studentsWithApps = this.assignAppsToStudents(response.data);
                this.alumnos = studentsWithApps;
                this.totalDangerousApps = studentsWithApps.reduce((total, student) => {
                    return total + student.apps.filter(app => app.status === 'danger').length;
                }, 0);
                this.lastActivity = new Date().toLocaleString();
                this.createCharts();
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        createCharts() {
            const pieCtx = document.getElementById('studentsPieChart').getContext('2d');
            const appsCtx = document.getElementById('appsBarChart').getContext('2d');

            const data = {
                labels: ['Peligro', 'Advertencia', 'Normal'],
                datasets: [{
                    data: [
                        this.alumnos.filter(s => s.status === 'Peligro').length,
                        this.alumnos.filter(s => s.status === 'Advertencia').length,
                        this.alumnos.filter(s => s.status === 'Normal').length,
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
                    onClick: this.handleChartClick,
                },
            });

            const appUsage = this.alumnos.reduce((acc, student) => {
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
                            },
                        },
                    },
                },
            });
        },
        handleChartClick(elements) {
            if (elements.length) {
                const chart = elements[0].element.$context.raw;
                const index = elements[0].index;
                const label = chart.data.labels[index];
                this.filteredStudents = this.alumnos.filter(student => student.status === label);
                this.showModal = true;
            }
        },
        closeModal() {
            this.showModal = false;
        },
        async banExpStudent(student, accion) {
            if (student.status === 'Peligro' || student.status === 'Advertencia') {
                try {
                    this.alumnos = this.alumnos.filter(al => al !== student);
                    const response = await axios.post('http://localhost:8080/banearExpulsar/' + this.sessionId, { email: student.email, userId: student._id, banear: accion });

                    if (!response.ok) {
                        throw new Error('Error al actualizar la lista de participantes')
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }

            } else {
                alert(`La acción de banear solo está disponible para estudiantes en estado de Peligro o Advertencia.`);
            }
        },
        notifyStudent(student) {
            alert(`Notificación enviada a ${student.firstName} ${student.lastName}.`);
        },
        viewProcesses(student) {
            this.selectedStudent = student;
            this.showModal = true;
        },
        createSession() {
            console.log(this.idRuta);
        },
        otherOptions() {
            alert('Otras opciones.');
        },
    }
};
</script>

<style scoped>
.actionButton[disabled] {
    background-color: #cccccc;
    cursor: not-allowed;
    color: #666666;
}

.profesorPage {
    padding: 2rem;
    margin: 60px auto;
    background-color: var(--background-color);
    color: #333;
    width: 80%;
    max-width: 1200px;
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

.normal-text {
    font-weight: bold;
    color: #008000;

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
    .profesorPage {
        width: 90%;
    }

    .mainContainer {
        flex-direction: column;
        align-items: center;
    }

    .chartContainer,
    .chartDataContainer {
        width: 100%;
        height: auto;
    }

    .chartDataContainer .charts {
        margin-top: 20px;
    }
}

@media (max-width: 768px) {
    .dashboard {
        flex-direction: column;
        align-items: center;
    }

    .dashboard button {
        width: 100%;
        margin-bottom: 10px;
    }

    .bottomContainer {
        overflow-x: auto;
    }

    table {
        width: 100%;
    }

    th,
    td {
        padding: 8px;
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .profesorPage {
        padding: 1rem;
    }

    h1,
    h2 {
        font-size: 1.5rem;
    }

    .dashboard button {
        font-size: 0.9rem;
    }

    th,
    td {
        font-size: 0.7rem;
    }

    .modal-content {
        width: 95%;
        padding: 10px;
    }

    .closeButton {
        padding: 8px 16px;
        font-size: 0.9rem;
    }
}
</style>
