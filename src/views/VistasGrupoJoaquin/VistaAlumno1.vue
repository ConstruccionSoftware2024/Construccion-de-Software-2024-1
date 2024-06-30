<template>
    <div class="alumno-page">
        <main>
            <div class="session-info box-shadow">
                <h2>Sesion id: <input v-model="sessionId" /></h2>
                <button @click="createSession">Unirse a Sesión</button>
            </div>
            <div class="danger-level box-shadow" :style="{ backgroundColor: dangerColor }">
                <h3>Nivel de Peligro: {{ dangerLevel }}</h3>
                <p>{{ dangerMessage }}</p>
            </div>
            <div class="charts">
                <div class="chart-container box-shadow">
                    <canvas id="statusChart"></canvas>
                </div>
                <div class="chart-info box-shadow">
                    <h3>Datos del Gráfico</h3>
                    <p>Aplicaciones totales: {{ totalApps }}</p>
                    <p>Aplicaciones Peligrosas Abiertas: {{ dangerousApps }}</p>
                    <p>Última Actividad: {{ lastActivity }}</p>
                    <canvas id="appsChart"></canvas>
                </div>
            </div>
            <div class="history box-shadow">
                <a :href="downloadLink" download="Procesos-exe.exe">
                    <button>Descargar Ejecutable</button>
                </a>
                <!--<button @click="guardarHistorial">Guardar procesos</button> LA FUNCIÓN EN EL SERVER.JS DE ESTA FUNCION ESTÁ MAL IMPLEMENTADA REVISAR-->

                <h3>Historial de Aplicaciones</h3>
                <table>
                    <thead v-if="tabs.length">
                        <tr v-for="(tab, index) in tabs" :key="index">
                            <td>{{ getFormattedTime() }}</td>
                            <th><a :href="tab.url" target="_blank">Url: {{ tab.url }}</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="entry in history" :key="entry.time">
                            <td>{{ entry.time }}</td>
                            <td>{{ entry.url }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="response-data box-shadow">
                <h3>Datos de Respuesta</h3>
                <pre v-if="responseData">{{ responseData }}</pre>
                <p v-else>Cargando datos...</p>
            </div>
        </main>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { useUserStore } from '../../../back-end/src/store.js';

export default {
    mounted() {
        if (this.$store.state.usuario.role === "profesor") {
            this.$router.push('/listaAsignaturas');
        }
    },
    setup() {
        const sessionId = ref('');
        const totalApps = ref(0);
        const dangerousApps = ref(0);
        const lastActivity = ref('');
        const dangerLevel = ref('Normal');
        const dangerMessage = ref('El estudiante ha abierto algunas aplicaciones peligrosas.');
        const history = ref([]);
        const responseData = ref('');

        const dangerColor = computed(() => {
            switch (dangerLevel.value) {
                case 'Peligro':
                    return '#ff0000';
                case 'Advertencia':
                    return '#f7d446';
                case 'Normal':
                    return '#008000';
                default:
                    return '#FFFFFF';
            }
        });
        const getFormattedTime = () => {
            const date = new Date();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        };
        const createSession = () => {
            // Lógica para unirse a una sesión
        };

        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/historial');
                history.value = response.data.sort((a, b) => {
                    return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
                });
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        const startPolling = () => {
            fetchHistory(); // Llama a fetchHistory inmediatamente al iniciar el polling
            setInterval(async () => {
                await fetchHistory(); // Actualiza el historial cada intervalo
            }, 10000); // Intervalo de 10 segundos (ajusta según tus necesidades)
        };

        const guardarHistorial = () => {
            axios.post('http://localhost:8080/guardar-procesos')
                .then(response => {
                    console.log('Historial guardado correctamente:', response.data);
                })
                .catch(error => {
                    console.error('Error al guardar el historial:', error);
                });
        };

        const fetchResponseData = async () => {
            try {
                const response = await fetch('http://localhost:5173/respuesta.txt');
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue satisfactoria');
                }
                responseData.value = await response.text();
            } catch (error) {
                console.error('Error en la solicitud fetch:', error);
                responseData.value = 'Error al cargar datos';
            }
        };

        const startResponsePolling = () => {
            fetchResponseData(); // Llama a fetchResponseData inmediatamente al iniciar el polling
            setInterval(async () => {
                await fetchResponseData(); // Actualiza los datos cada intervalo
            }, 10000); // Intervalo de 10 segundos (ajusta según tus necesidades)
        };

        onMounted(() => {
            startPolling();
            fetchHistory();
            startResponsePolling();

            const statusChartCtx = document.getElementById('statusChart').getContext('2d');
            new Chart(statusChartCtx, {
                type: 'pie',
                data: {
                    labels: ['Peligro', 'Advertencia', 'Normal'],
                    datasets: [
                        {
                            data: [5, 2, 3],
                            backgroundColor: ['#ff0000', '#f7d446', '#008000'],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Estado de Peligro'
                        }
                    }
                }
            });

            const appsChartCtx = document.getElementById('appsChart').getContext('2d');
            new Chart(appsChartCtx, {
                type: 'bar',
                data: {
                    labels: ['Discord', 'Chrome', 'Word', 'Slack', 'Excel', 'PowerPoint', 'Teams', 'Zoom', 'Skype'],
                    datasets: [
                        {
                            label: 'Uso de Aplicaciones en tu sesión',
                            data: [3, 15, 4, 5, 2, 1, 3, 2, 1],
                            backgroundColor: '#00BFFF',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Uso de Aplicaciones'
                        }
                    }
                }
            });
        });

        return {
            sessionId,
            totalApps,
            dangerousApps,
            lastActivity,
            getFormattedTime,
            dangerLevel,
            dangerMessage,
            dangerColor,
            history,
            responseData,
            createSession,
            downloadLink: '/public/Downloads/Procesos-exe.exe',
            guardarHistorial,
        };
    },
    data() {
        return {
            tabs: []
        };
    },
    created() {
        this.fetchTabs(); // Fetch data when the component is created
        setInterval(this.fetchTabs, 10000); // Fetch data every 10 seconds
    },
    methods: {
        async fetchTabs() {
            try {
                const response = await axios.get('http://localhost:5151/tabs'); // Adjust the URL to your server endpoint
                this.tabs = response.data; // Assuming the server responds with tab data in JSON format

                // Extract URLs into a string array
                const urls = this.tabs.map(tab => tab.url);
                const urlsString = urls.join(', '); // Join URLs into a single string
                console.log('URLs:', urlsString); // Print URLs as a single string to console

                // Send data to server
                this.sendDataToServer(urlsString);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        },
        async sendDataToServer(urlsString) {
            const userStore = useUserStore();
            const user = computed(() => userStore.user);

            try {
                const currentDate = new Date().toISOString();


                // Primero, realiza una petición al servidor para verificar si los datos ya existen
                const checkResponse = await axios.post('http://localhost:8080/checkTabs', { userId: user.value._id, urls: urlsString });

                if (checkResponse.data.exists) {
                    console.log('Los datos ya existen en la base de datos, no se enviarán de nuevo.');
                    return; // Si los datos ya existen, no se hace nada más
                }

                // Si los datos no existen, procede a enviarlos al servidor
                const processResponse = await axios.post('http://localhost:8080/processTabs', {
                    userId: user.value._id,
                    urls: urlsString,
                    timestamp: currentDate // Enviar la fecha actual al servidor
                });

                console.log('Datos enviados al servidor correctamente:', processResponse.data);
            } catch (error) {
                console.error('Error al enviar los datos al servidor:', error);
            }
        }

    }
};
</script>

<style scoped>
.alumno-page {
    font-family: Arial, sans-serif;
}

header h1 {
    margin: 0;
}

nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    gap: 10px;
}

nav ul li {
    display: inline;
}

nav ul li a {
    color: white;
    text-decoration: none;
}

.session-info {
    margin: 20px 0;
    display: flex;
    align-items: center;
}

.session-info h2 {
    margin-left: 33%;
    margin-right: 10px;
}

button {
    margin: 10px;
    padding: 10px 20px;
    background-color: #4bb6b8;
    color: white;
    border: none;
    cursor: pointer;
}

.danger-level {
    margin: 20px 0;
    padding: 20px;
    background: white;
    border-radius: 10px;
    text-align: center;
}

.charts {
    display: flex;
    justify-content: space-between;
}

.chart-container {
    width: 500px;
    flex: 1;
    margin: 0 20px;
    padding: 20px;
    background: white;
    border-radius: 10px;
}

.chart-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    flex: 1;
    padding: 20px;
    background: white;
    border-radius: 10px;
}

.box-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.history {
    margin-bottom: 50px;
    margin-top: 20px;
    padding: 20px;
    background: white;
    border-radius: 10px;
}

.history table {
    width: 100%;
    border-collapse: collapse;
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

.response-data {
    margin-top: 20px;
    padding: 20px;
    background: white;
    border-radius: 10px;
}

pre {
    background-color: #f4f4f4;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>
