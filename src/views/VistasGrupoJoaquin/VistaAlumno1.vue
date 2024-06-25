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
                <h3>Historial de Aplicaciones</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(entry, index) in history" :key="index">
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

export default {
    setup() {
        const sessionId = ref('');
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

        const readLocalFile = async () => {
            try {
                const response = await fetch('../../lib/respuesta.txt'); // Ajusta la ruta según donde se encuentre tu archivo
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo.');
                }
                const text = await response.text();
                return text;
            } catch (error) {
                console.error('Error al leer el archivo:', error);
                return ''; // Retorna una cadena vacía en caso de error
            }
        };

        const fetchHistory = async () => {
            try {
                const text = await readLocalFile();
                const lines = text.split('\n').map(line => line.trim()).filter(line => line !== '');
                const formattedHistory = lines.map(line => {
                    const [time, url] = line.split('\t'); // Asume que el formato es "hora    url"
                    return { time, url };
                });
                history.value = formattedHistory;
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

        onMounted(() => {
            startPolling();

            // Ejemplo de configuración de gráficos con Chart.js (solo para referencia)
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
            dangerLevel,
            dangerMessage,
            dangerColor,
            history,
        };
    },
};
</script>

<style scoped>
.alumno-page {
    font-family: Arial, sans-serif;
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
</style>
