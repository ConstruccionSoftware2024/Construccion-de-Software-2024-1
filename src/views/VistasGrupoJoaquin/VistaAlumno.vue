<template>
    <div class="alumno-page">
        <main>
            <h1>Sesion id: {{ sessionId }}</h1>
            <div class="danger-level box-shadow" :style="{ backgroundColor: dangerColor }">
                    <h3>Nivel de Peligro: {{ dangerLevel }}</h3>
                    <p>{{ dangerMessage }}</p>
                </div>

            <div class="mainContainer">
                    <div class="chartContainer box-shadow">
                        <canvas id="statusChart"></canvas>
                    </div>
                    <div class="chartDataContainer box-shadow">
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
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>URL</th>
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
        </main>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { useRoute } from 'vue-router';

export default {
    mounted() {
        if (this.$store.state.usuario.role == "profesor") {
            this.$router.push('/listaAsignaturas')
        }
    },
    setup() {
        const route = useRoute();
        const idRuta = route.params.id;
        const sessionId = idRuta;
        const totalApps = ref(0);
        const dangerousApps = ref(0);
        const lastActivity = ref('');
        const dangerLevel = ref('Normal');
        const dangerMessage = ref('El estudiante ha abierto algunas aplicaciones peligrosas.');
        const history = ref([]);

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

        onMounted(() => {
            startPolling();
            fetchHistory();

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
                            backgroundColor: '#08cccc',
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
            dangerLevel,
            dangerMessage,
            dangerColor,
            history,
            idRuta,
            downloadLink: '/public/Downloads/Procesos-exe.exe',
            guardarHistorial,
        };
    },
};
</script>

<style scoped>
.alumno-page {
    padding: 2rem;
    margin: 20px auto;
    background-color: var(--background-color);
    color: var(--text-color);
    width: 80%;
    max-width: 1200px;
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
    color: var(--text-color);
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
    background-color: var(--button-hover-background-color);
    color: var(--text-color);
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

.mainContainer {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
}

.chartContainer, .chartDataContainer {
    width: calc(50% - 10px);
    padding: 20px;
    background-color: var(--container-background-color);
    border-radius: 10px;
    height: auto;
    min-height: 300px;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
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

.box-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.history {
    margin-bottom: 50px;
    margin-top: 20px;
    padding: 20px;
    background-color: var(--container-background-color);
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
    background-color: var(--container-background-color);
    text-align: left;
}


@media (max-width: 1200px) {
    .alumno-page {
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
    .alumno-page {
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
