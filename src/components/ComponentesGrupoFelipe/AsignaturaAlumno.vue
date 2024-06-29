<template>
    <div class="container">
        <h1>{{ asignatura.title }} - {{ asignatura.section }}</h1>
        <div class="section">
            <p class="profesor">Docente: {{ asignatura.profesor }}</p>
            <p class="profesor">Descripción: {{ asignatura.description }}</p>
        </div>
        <div class="content">
            <div class="left-column">
                <div class="section">
                    <h2><font-awesome-icon :icon="['fas', 'list-ul']" /> Listado de Sesiones</h2>

                    <div class="sesionesItem" v-for="sesion in sesiones" :key="sesion.id">
                        <router-link :to="determinarRuta(sesion._id, rolUsuario)" class="session-item">
                            <div class="session-content">
                                <p class="session-name"> {{ sesion.nombre }}</p>
                                <p><font-awesome-icon :icon="['fas', 'layer-group']" /> Descripción: {{
                                    sesion.descripcion
                                    }}
                                </p>
                                <p><font-awesome-icon :icon="['fas', 'user-group']" /> Participantes: {{
                                    sesion.participantes ?
                                        sesion.participantes.length : 0 }}</p>
                            </div>
                        </router-link>

                    </div>
                </div>
                <div class="section">
                    <h2><font-awesome-icon :icon="['fas', 'book']" /> Recursos de la Asignatura
                    </h2>
                    <ul>
                        <li><a href="#" class="linkRecursos">PDF de Estudio</a></li>
                        <li><a href="#" class="linkRecursos">Video de Clase</a></li>
                        <li><a href="#" class="linkRecursos">Enlace Externo</a></li>
                    </ul>
                </div>


                <div class="section">
                    <h2> <font-awesome-icon :icon="['far', 'comment-dots']" /> Foro de Preguntas
                    </h2>
                    <input type="text" placeholder="Escribe tu pregunta aquí...">
                    <button class="btn" @click="publicarPregunta">Publicar Pregunta</button>
                </div>

            </div>

            <div class="right-column">
                <div class="section">
                    <div v-if="mostrarDetallesFaltas && faltaAlumnos.faltas != 0" class="overlay"></div>
                    <div class="faltas">
                        <h2><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /> Listado de
                            Faltas
                        </h2>
                        <p>Cantidad de Faltas: {{ faltaAlumnos.faltas }}</p>
                        <div v-if="mostrarDetallesFaltas && faltaAlumnos.faltas != 0" class="pop-up-detalles-faltas">
                            <h1 class="titleFaltas"><font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
                                Detalle de
                                faltas</h1>
                            <div v-for="falta in faltaAlumnos.detalleFaltas" :key="falta" class="itemDetalleFaltas">
                                <p class="subtitle">Falta: <span>{{ falta.falta }}</span></p>
                                <p class="subtitle">Fecha: <span>{{ falta.fecha }}</span></p>
                                <p class="subtitle">Profesor: <span> {{ falta.profesor }}</span></p>
                                <p class="subtitle">Descripción: <span>{{ falta.motivo }}</span></p>
                            </div>
                            <button class="closeButton btn" @click="toggleDetallesFaltas"><font-awesome-icon
                                    :icon="['fas', 'circle-xmark']" /> Cerrar</button>
                        </div>
                        <button class="btn" @click="toggleDetallesFaltas">Ver Detalles</button>
                    </div>
                </div>

                <div class="section">
                    <h2><font-awesome-icon :icon="['fas', 'book-bookmark']" /> Tareas y Exámenes
                    </h2>
                    <p>Próxima Tarea: [Fecha]</p>
                    <p>Próximo Examen: [Fecha]</p>
                    <button class="btn">Ver Calendario</button>
                </div>

                <div class="section">
                    <h2><font-awesome-icon :icon="['fas', 'user-plus']" /> Acciones Rápidas</h2>
                    <div class="button-container">
                        <button class="btn" @click="contactarProfesor">Contactar al Profesor</button>
                        <button class="btn">Reportar un Problema</button>
                    </div>
                </div>
                <div v-if="showAviso" class="aviso">
                    Correo del profesor copiado al portapapeles!
                </div>

                <div class="section">
                    <h2><font-awesome-icon :icon="['fas', 'user-group']" /> Participantes</h2>
                    <div class="team-members">
                        <img v-for="member in asignatura.members" :key="member" :src="member" alt="Team member"
                            class="team-member">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useUserStore } from '../../../back-end/src/store.js';
import Swal from 'sweetalert2';

const route = useRoute();
const id = route.params.id;

const userStore = useUserStore();
const rolUsuario = userStore.user.role;
const idUsuario = userStore.user._id;

const mostrarDetallesFaltas = ref(false);

const faltaAlumnos = ref([]);

const toggleDetallesFaltas = () => {
    mostrarDetallesFaltas.value = !mostrarDetallesFaltas.value;

    if (faltaAlumnos.value.faltas === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay faltas registradas',
            timer: 1200
        });
    }
};

const closePopUp = (event) => {
    if (!event.target.closest('.pop-up-detalles-faltas') && !event.target.closest('.faltas') && mostrarDetallesFaltas.value) {
        mostrarDetallesFaltas.value = false;
    }
}

const asignatura = ref({
    nombre: 'Nombre Ejemplo',
    profesor: 'Profesor Ejemplo',
    email: 'ejemplo@utalca.cl',
    proximaTarea: '10/10/2021',
    proximoExamen: '15/10/2021',
    members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24', 'https://via.placeholder.com/24']
});

const sesiones = ref([]);
const showAviso = ref(false);

const contactarProfesor = async () => {
    try {
        await navigator.clipboard.writeText(asignatura.value.email);
        showAviso.value = true;
        setTimeout(() => {
            showAviso.value = false;
        }, 2000); // Ocultar el aviso después de 2 segundos
    } catch (err) {
        console.error('Error al copiar el correo: ', err);
    }
};

function recuperarSesiones(id) {
    return axios.get(`http://localhost:8080/sesion/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
}

const publicarPregunta = () => {
    alert('Pregunta Publicada');
};

async function recuperarAsignatura(id) {
    await axios.get(`http://localhost:8080/asignatura/${id}`)
        .then(async response => {
            asignatura.value = response.data;
            console.log("asignatura: ", asignatura);
            recuperarProfesor(response.data.profesorId);
            const sesionesPromesas = asignatura.value.sesiones.map(sesionId => recuperarSesiones(sesionId));
            const sesionesResultados = await Promise.all(sesionesPromesas);
            sesiones.value = sesionesResultados;
        })
        .catch(error => {
            console.error(error);
        });
}

async function recuperarProfesor(id) {
    await axios.get(`http://localhost:8080/user/${id}`)
        .then(response => {
            asignatura.value.profesor = response.data.firstName + ' ' + response.data.lastName;
            asignatura.value.email = response.data.email;
        })
        .catch(error => {
            console.error(error);
        });
}
async function recuperarFaltas(id) {
    await axios.get(`http://localhost:8080/faltas/${id}`)
        .then(response => {
            if (response.data.length === 0) {
                faltaAlumnos.value.faltas = 0;
            } else {
                faltaAlumnos.value = response.data;
            }
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
}

function determinarRuta(id, rol) {
    if (rol === 'profesor') {
        return { name: 'VistaProfesor', params: { id: id } };
    } else {
        return { name: 'VistaAlumno', params: { id: id } };
    }
}

onMounted(async () => {
    recuperarAsignatura(id);
    recuperarFaltas(idUsuario);
    window.addEventListener('click', closePopUp);
});

</script>

<style scoped>
input[type="text"] {
    font-size: 16px;
    border-radius: 5px;
    border: none;
    padding: 0.5rem;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    margin-bottom: 1rem;
    background-color: var(--input-background-color);
    color: var(--text-color);
}

input[type="text"]:focus {
    box-shadow: 0 0 0 2px var(--button-background-color);
    outline: none;
}

.profesor {
    font-size: 18px;
    font-weight: bold;
    top: 1rem;
}

.session-item {
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-decoration: none;
    color: inherit;
}

.session-item:hover {
    background-color: var(--gray-hover-color);
}

.session-name {
    font-size: 17px;
    font-weight: bold;
}

.session-content {
    flex-direction: column;
    padding: 0.2rem;
    border-radius: 5px;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
    background-color: var(--gray-text-color);
}

.session-content:hover {
    background-color: var(--gray-hover-color);
    color: var(--text-color);
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.linkRecursos:hover {
    color: var(--button-hover-background-color);

}

h1 {
    font-size: 2.5rem;
    font-weight: bold;
}

h2 {
    font-weight: bold;
}

.section {
    background-color: var(--container-background-color);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.section:not(:last-child) {
    margin-bottom: 1.7rem;
}

.content {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
}

.aviso {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4caf50;
    color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.pop-up-detalles-faltas {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--container-background-color);
    padding: 20px;
    border: 1px solid #ccc;
    z-index: 1000;
    width: 50%;
    border-radius: 12px;
    max-height: 70%;
    overflow-y: auto;
}

.itemDetalleFaltas {
    margin-bottom: 10px;
    background-color: var(--gray-text-color);
    padding: 10px;
    border-radius: 5px;
}

.titleFaltas {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 20px;
}

.subtitle {
    font-weight: bold;
}

.closeButton {
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
    margin-top: 10px;
    width: 100%;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
}

.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--container-background-color);
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 1000;
}

.container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 70%;
    margin: auto;
    justify-content: space-between;
    margin-bottom: 3rem;
    margin-top: 0.5rem;
}

.containerTitle {
    margin-bottom: 20px;
}



.left-column {
    flex: 2;
    display: flex;
    flex-direction: column;
}

.right-column {
    flex: 1;
    display: flex;
    flex-direction: column;
}


.sesiones,
.participantes,
.recursos,
.foro,
.actividades,
.faltas,
.fechas,
.acciones {
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
}

.subtitulo {
    font-size: 20px;
    margin: 0;
    font-weight: bold;
    margin-bottom: 5px;
}

button.btn {
    background-color: var(--button-background-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-modal {
    float: right;
}

button.btn:hover {
    background-color: var(--button-hover-background-color);
    color: black;
}

button.btn-cerrar {
    background-color: #ff4d4d;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button.btn-cerrar:hover {
    background-color: #ff1a1a;
}


.button-container {
    display: flex;
    justify-content: space-between;
}


button.btn:hover {
    background-color: var(--button-hover-background-color);
    color: black;
}

button.btn-cerrar {
    background-color: #ff4d4d;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button.btn-cerrar:hover {
    background-color: #ff1a1a;
}


.button-container {
    display: flex;
    justify-content: space-between;
}

button.btn:hover {
    background-color: var(--button-hover-background-color);
    color: black;
}

button.btn-cerrar {
    background-color: #ff4d4d;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button.btn-cerrar:hover {
    background-color: #ff1a1a;
}


.button-container {
    display: flex;
    justify-content: space-between;
}

.session-title {
    font-size: 17px;
    font-weight: bold;
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

.recursos {
    padding: 10px;
    border-radius: 5px;
}

.foro {
    padding: 10px;
    border-radius: 5px;
}

.actividades {
    padding: 10px;
    border-radius: 5px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
    text-decoration: none;
}

a {
    text-decoration: none;
    color: var(--text-color);
}

.team-members {
    margin-top: 10px;
    display: flex;
}

.team-member {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 5px;
}

@media screen and (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .seccion1 {
        width: 100%;
    }

    .seccion2 {
        width: 100%;
        margin-top: 20px;
    }
}
</style>