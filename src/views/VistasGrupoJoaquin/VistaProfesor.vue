<template>
    <div class="profesorPage">
        <h1>Sesion id: {{ sessionId }}</h1>
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
                <div class="menuContainer">
                    <h2>Herramientas del docente</h2>
                    <button @click="toggleMenu" class="menuButton">Opciones</button>
                    <div v-if="menuOpen" class="dropdownMenu">
                        <button @click="redirigirCrearEvaluacion(); menuOpen = false">Crear Evaluación</button>
                        <button @click="añadir(); menuOpen = false">Añadir Alumno</button>
                        <button @click="otherOptions(); menuOpen = false">Otras Opciones</button>
                    </div>
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
                            <button class="actionButton ban" @click="banExpStudent(alumno, true)"
                                :disabled="alumno.status !== 'Peligro' && alumno.status !== 'Advertencia'">Banear</button>
                            <button class="actionButton expel" @click="banExpStudent(alumno, false)"
                                :disabled="alumno.status !== 'Peligro' && alumno.status !== 'Advertencia'">Expulsar</button>
                            <BotonNotificar :participante="alumno" />
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
    <div>
        <section class="modal_añadir">
            <div class="modal__container_añadir">
                <div class="modal__header">
                    <h2 class="modal__title_añadir">Añadir Alumno</h2>
                    <span class="modal__counter">{{ selectedUsersCount }} / {{ users.length }} seleccionados</span>
                </div>
                <input type="text" class="modal__search" placeholder="Buscar alumnos..." v-model="searchTerm" />
                <div class="modal__content">
                    <ul name="user" id="user" class="modal__select_añadir">
                        <li v-for="user in paginatedUsers" :key="user._id" class="listar_alumnos">
                            <input type="checkbox" v-model="user.selected" class="input_alumnos">
                            <span class="dato_alumno">{{ user.matricula }}</span>
                            <span class="dato_alumno">{{ user.firstName }}</span>
                            <span class="dato_alumno">{{ user.lastName }}</span>
                        </li>
                    </ul>
                    <div class="pagination">
                        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
                        <span>{{ currentPage }} / {{ totalPages }}</span>
                        <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
                    </div>
                </div>
                <div class="botones_añadir">
                    <button @click.prevent="cerrarModal" class="modal__close_añadir">Cancelar</button>
                    <button @click.prevent="anadir_Usuario" class="modal_close_añadir">Guardar</button>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import BotonNotificar from '@/components/ComponentesGrupoClaudio/BotonNotificar.vue';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const idRuta = route.params.id;
        return {
            idRuta,
            router
        }
    },

    data() {
        return {
            alumnos: [],
            session: {},
            totalDangerousApps: 0,
            lastActivity: '',
            showModal: false,
            selectedStudent: '',
            sessionId: this.idRuta,
            users: [],
            currentPage: 1,
            itemsPerPage: 10,
            searchTerm: '',
            menuOpen: false
        };
    },

    created() {
        this.fetchUsers();
        this.mounted();
    },

    name: 'ProfesorPage',
    components: {
        BotonNotificar,
    },

    computed: {
        totalPages() {
            return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
        },
        paginatedUsers() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredUsers.slice(start, end);
        },
        filteredUsers() {
            return this.users.filter(user => {
                const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
                return fullName.includes(this.searchTerm.toLowerCase()) || user.matricula.includes(this.searchTerm);
            });
        },
        selectedUsersCount() {
            return this.users.filter(user => user.selected).length;
        }
    },

    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },

        closeMenu() {
            this.menuOpen = false;
        },

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
                const response = await axios.get('http://localhost:8080/users');
                const participantes = response.data;

                const sessionResponse = await axios.get('http://localhost:8080/sesion/' + this.sessionId);
                const sessionUsers = sessionResponse.data;

                const participantesIds = sessionUsers.participantes;

                const studentsWithApps = this.assignAppsToStudents(participantes).filter(user =>
                    participantesIds.includes(user._id)
                );

                this.alumnos = studentsWithApps;
                this.totalDangerousApps = studentsWithApps.reduce((total, student) => {
                    return total + student.apps.filter(app => app.status === 'Peligro').length;
                }, 0);
                this.lastActivity = new Date().toLocaleString();
                this.createCharts();
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },

        calculateTotalDangerousApps(students) {
            return students.reduce((total, student) => {
                return total + student.apps.filter(app => app.status === 'Peligro').length;
            }, 0);
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
                        throw new Error('Error al actualizar la lista de participantes');
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

        redirigirCrearEvaluacion() {
            this.router.push({ name: 'CrearEvaluacion', params: { id: this.sessionId } });
        },

        otherOptions() {
            alert('Otras opciones.');
        },

        async mounted() {
            const sessionResponse = await axios.get('http://localhost:8080/sesion/' + this.sessionId);
            const sessionUsers = sessionResponse.data;

            const participantesIds = sessionUsers.participantes;

            const response = await axios.get('http://localhost:8080/users');
            const allUsers = response.data;

            axios.get('http://localhost:8080/users')
                .then(response => {
                    this.users = allUsers.filter(user => !participantesIds.includes(user._id));
                })
                .catch(error => {
                    console.error(error);
                });
        },

        añadir() {
            const modal = document.querySelector('.modal_añadir');
            modal.classList.add('modal_añadir--show');
        },

        cerrarModal() {
            const modal = document.querySelector('.modal_añadir');
            modal.classList.remove('modal_añadir--show');
        },

        async anadir_Usuario() {
            try {
                const selectedUsers = this.users.filter(user => user.selected);
                const response = await axios.post('http://localhost:8080/anadir_Usuario', {
                    users: selectedUsers.map(user => user._id),
                    sesion_id: this.sessionId
                });
                this.cerrarModal();
            } catch (error) {
                console.error(error);
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        }
    }
};
</script>

<style scoped>
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
    height: auto;
    min-height: 300px;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--container-background-color);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    overflow: visible;
}

.menuContainer {
    margin-top: 20px;
    text-align: left;
    position: relative;
    width: 100%;
}

.menuButton {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: var(--button-background-color);
    color: var(--text-color);
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    position: relative;
}

.menuButton::after {
    content: "▼";
    margin-left: 10px;
    font-size: 0.8rem;
}

.dropdownMenu {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    background-color: var(--container-background-color);
    border: 1px solid var(--border-color);
    border-radius: 0 0 5px 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.dropdownMenu button {
    padding: 10px 20px;
    background-color: var(--container-background-color);
    color: var(--text-color);
    border: none;
    border-bottom: 1px solid var(--border-color);
    text-align: left;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
}

.dropdownMenu button:last-child {
    border-bottom: none;
}

.dropdownMenu button:hover {
    background-color: var(--gray-hover-color);
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

.modal_añadir {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.6s;
}

.modal_añadir--show {
    opacity: 1;
    pointer-events: auto;
}

.modal__container_añadir {
    width: 90%;
    max-width: 600px;
    max-height: 90%;
    background-color: var(--container-background-color);
    border-radius: 6px;
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    overflow-y: auto;
}

.modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.modal__title_añadir {
    font-size: 1.5rem;
}

.modal__counter {
    font-size: 1rem;
    color: #6c757d;
}

.modal__search {
    width: 100%;
    padding: 0.5em;
    margin-bottom: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.modal__content {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.modal__select_añadir {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.listar_alumnos {
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 0.5em;
    border-bottom: 1px solid #ddd;
}

.input_alumnos {
    margin-right: 1em;
}

.dato_alumno {
    flex: 1;
    text-align: left;
}

.pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;
}

.pagination button {
    padding: 0.5em 1em;
    background-color: var(--button-background-color);
    border: none;
    border-radius: 4px;
    color: var(--text-color);
    cursor: pointer;
    transition: background-color 0.3s;
}

.pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.pagination span {
    font-weight: bold;
}

.botones_añadir {
    display: flex;
    justify-content: right;
    gap: 20px;
    align-items: center;
    margin-top: 1em;
}

.modal_reset,
.modal__close_añadir,
.modal_close_añadir {
    text-decoration: none;
    color: #fff;
    background-color: #6c757d;
    padding: 0.5em 1em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s;
}

.modal__close_añadir {
    background-color: var(--button-background-color);
}

.modal_close_añadir {
    background-color: var(--button-background-color);
}

.modal_reset:hover,
.modal__close_añadir:hover,
.modal_close_añadir:hover {
    background-color: #555;
}

.modal__close_añadir:hover {
    background-color: var(--button-hover-background-color);
}

.modal_close_añadir:hover {
    background-color: var(--button-hover-background-color);
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

h1 {
    color: var(--text-color);
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
