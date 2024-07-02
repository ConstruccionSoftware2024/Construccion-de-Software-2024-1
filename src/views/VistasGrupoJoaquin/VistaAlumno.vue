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

            <div class="evaluations box-shadow">
                <h3 class="subtitulo"><font-awesome-icon :icon="['fas', 'list-ul']" /> Listado de Evaluaciones</h3>
                <div class="listaEvaluaciones">
                    <div class="sesionesItem" v-for="eva in evaluations" :key="eva.id">
                        <router-link :to="'/vistaEvaluacion/' + eva._id" class="navLink"><span class="session-title">{{
                            eva.nombre }}</span></router-link>
                    </div>
                </div>
            </div>

            <div class="history box-shadow">
                <a :href="downloadLink" download="Procesos-exe.exe">
                    <button>Descargar Ejecutable</button>
                </a>
                <button @click="guardarHistorial">Guardar procesos</button>



                <h3>Historial de Aplicaciones</h3>
                <table>

                    <thead v-if="tabs.length">
                        <tr v-for="(tab, index) in tabs" :key="index">
                            <td>{{ formatTime(tab.time) }}</td>
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
        </main>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import Chart from 'chart.js/auto';
import { useUserStore } from '../../../back-end/src/store.js';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAt9ZEV59R9z5vL9ENMVwVx3b5t9kg0MNY");
export default {
    /*  mounted() {
          if (this.$store.state.usuario.role == "profesor") {
              this.$router.push('/listaAsignaturas')
          }
      }, */
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
        const evaluations = ref([]);
        const userId = ref('');

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

        const createSession = () => {
            // Lógica para unirse a una sesión
        };
        const formatTime = (time) => {
            const date = new Date(time);
            const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            return formattedTime;
        };
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/historial');
                const procesosOrdenados = response.data.sort((a, b) => {
                    return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
                });
                // Obtener los nombres modificados de los procesos
                const procesos = procesosOrdenados.map(proceso => proceso.url);
                const rialNombres = await cambiaNombreProceso(procesos);

                // Asignar los nombres modificados a history.value
                const temp = procesosOrdenados.map((proceso, index) => {
                    if (typeof proceso.url != 'string') {
                        return { ...proceso, url: '-' };
                    }
                    return { ...proceso, url: rialNombres[index] };
                });

                const temp2 = [...new Set(temp)]; // Eliminar duplicados

                // Filtrar los elementos que no son aplicaciones
                history.value = temp2.filter(proceso => proceso.url !== '-' && proceso.url !== '- (-)');
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };
        async function cambiaNombreProceso(procesos) {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `Dada la lista de procesos: ${procesos}\n Proporcione solamente los nombres de las aplicaciones (no de sistema) presentes entre estos procesos (nombre que aparece en el admin de tareas) (en el mismo orden que vienen y, si no es aplicacion, devolver con un -) y clasifique cada uno como 'bueno', 'malo' o 'intermedio' según la etica estudiantil y los procesos que ayuden a realizar trampa son malos por ejemplo: "Discord" ya que tiene chat con otros usuarios, indicando la clasificación entre paréntesis al lado del nombres (siempre solo de las apliciones). Devuelva la lista de procesos en un formato separado por comas. Seguir explicitamente este formato: proceso1 (bueno), proceso2 (malo), proceso3 (intermedio), -. Sin explicacion y mostrando los nombres conocidos (Visal Studio Code en vez de code).`;

            const result = await model.generateContent(prompt);
            const response2 = result.response;
            const text = response2.text();

            // Convertir la lista separada por comas a un arreglo
            const procesosModificados = text.split(',').map(name => name.trim());
            return procesosModificados;
        }
        async function recuperarEvaluaciones(id) {
            await axios.get(`http://localhost:8080/evaluacion/${id}`)
                .then(async response => {
                    evaluations.value = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }
        const startPolling = () => {
            fetchHistory(); // Llama a fetchHistory inmediatamente al iniciar el polling            
            setInterval(async () => {
                await fetchHistory(); // Actualiza el historial cada intervalo                 
                await guardarHistorial(); // Guarda el historial cada intervalo             
            }, 10000); // Intervalo de 10 segundos
        };

        const guardarHistorial = () => {
            const procesos = history.value.map(proceso => proceso.url);
            //const procesosString = procesos.join(',');
            const userStore = useUserStore();
            const user = computed(() => userStore.user);
            const userId = user.value._id;
            axios.post('http://localhost:8080/checkTabs', { userId: userId, sessionId: sessionId, procesos: procesos }) // Endpoint para verificar en el servidor
            //window.alert('Procesos guardados en DB');
        };

        onMounted(() => {
            startPolling();
            fetchHistory();
            recuperarEvaluaciones(idRuta);

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
            formatTime,
            lastActivity,
            dangerLevel,
            dangerMessage,
            dangerColor,
            history,
            idRuta,
            evaluations,
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
                const response = await axios.get('http://localhost:5151/tabs');
                this.tabs = response.data.map(tab => ({
                    time: new Date(), // Aquí puedes usar la hora actual o la hora del servidor
                    url: tab.url
                }));

                // Llamar a sendDataToServer con las URLs obtenidas
                this.sendDataToServer(this.tabs);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        },

        async sendDataToServer(tabs) {
            const userStore = useUserStore();
            const user = computed(() => userStore.user);

            try {
                const formattedTime = new Date().toLocaleTimeString(); // Obtener la hora actual formateada
                console.log('Sending data to checkTabs:', { userId: user.value._id, tabs: tabs });

                const checkResponse = await axios.post('http://localhost:8080/checkTabs', { userId: user.value._id, tabs: tabs, time: formattedTime });
                if (checkResponse.data.exists) {
                    console.log('Los datos ya existen en la base de datos, no se enviarán de nuevo.');
                    return;
                }

                const processResponse = await axios.post('http://localhost:8080/processTabs', { userId: user.value._id, tabs: tabs, time: formattedTime });
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

.chartContainer,
.chartDataContainer {
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

.evaluations {
    margin-bottom: 20px;
    margin-top: 20px;
    padding: 20px;
    background-color: var(--container-background-color);
    border-radius: 10px;
}

.listaEvaluaciones {
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
}

.navLink {
    text-decoration: none;
    color: var(--text-color);
    display: block;
    padding: 10px 10px;
    border-radius: 5px;
    background-color: var(--gray-text-color);
    margin-bottom: 0.5rem;
}

.navLink:hover {
    background-color: var(--gray-hover-color);
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
