<template>
    <div class="container">

        <div class="seccion1">

            <div class="containerTitle">
                <h1 class="title">Asignatura: {{ asignatura.title }}</h1>
                <p>Profesor: {{ asignatura.profesor }}</p>
                <p>Descripción: {{ asignatura.description }}</p>
                <hr>
            </div>
            <h3 class="subtitulo"><font-awesome-icon :icon="['fas', 'list-ul']" /> Listado de Sesiones</h3>
            <div class="sesiones">

                <div class="sesionesItem" v-for="sesion in sesiones" :key="sesion.id">
                    <router-link :to="determinarRuta(sesion._id, rolUsuario)" class="navLink"><span
                            class="session-title">{{ sesion.nombre }}</span>
                        <p><font-awesome-icon :icon="['fas', 'layer-group']" /> Descripción: {{ sesion.descripcion }}
                        </p>
                        <p><font-awesome-icon :icon="['fas', 'user-group']" /> Participantes: {{ sesion.participantes ?
                            sesion.participantes.length : 0 }}</p>
                    </router-link>

                </div>
            </div>

            <div class="recursos">
                <h3 class="subtitulo"><font-awesome-icon :icon="['fas', 'book']" /> Recursos de la Asignatura</h3>
            </div>

            <div class="foro">
                <h2><i class="fa-regular fa-comment-dots"></i> Foro de Preguntas</h2>
                <input type="text" placeholder="Escribe tu pregunta aquí..." v-model="textoPregunta">
                <button @click="publicarPregunta" class="btn-pregunta">Publicar Pregunta</button>
                <hr>
                <h3><font-awesome-icon :icon="['fas', 'list-ul']" /> Preguntas Realizadas</h3>
                <div class="preguntas">
                    <div v-for="pregunta in listadoPreguntas" :key="pregunta.preguntaId" class="pregunta">
                        <div class="pregunta-container">
                            <p class="autorPregunta">{{ pregunta.autor }}</p>
                            <div class="pregunta-responder">
                                <p class="tituloPregunta">{{ pregunta.texto }}</p>
                            </div>

                            <button @click="toggleRespuestas(pregunta.preguntaId)" class="btn-mostrarRespuestas"
                                v-if="pregunta.respuestas && pregunta.respuestas.length > 0">
                                <font-awesome-icon class="iconoRespuesta" v-if="mostrarRespuestas[pregunta.preguntaId]"
                                    :icon="['fas', 'eye-slash']" />
                                <font-awesome-icon class="iconoRespuesta" v-else :icon="['fas', 'eye']" />{{
                                    mostrarRespuestas[pregunta.preguntaId] ? 'Ocultar Respuestas' : 'Mostrar Respuestas' }}
                            </button>
                            <div class="respuestas">
                                <div class="respuestas-container" v-if="mostrarRespuestas[pregunta.preguntaId]">
                                    <div v-for="respuesta in pregunta.respuestas" :key="respuesta.respuestaId"
                                        class="respuesta">
                                        <p class="autorRespuesta">{{respuesta.autor}}</p>
                                        <p class="textoRespuestas">{{ respuesta.texto }}</p>
                                        <button v-if="respuesta.autorId === idUsuario" @click="eliminarRespuesta(pregunta.preguntaId, respuesta._id)"
                                        class="btn-eliminar-respuesta"><font-awesome-icon :icon="['fas', 'minus']" class="icon-btn-eliminar-respuesta"/></button>
                                    </div>

                                </div>

                                <div class="btn-responder">
                                    <div v-if="inputRespuesta === pregunta.preguntaId" class="responderPregunta">
                                        <input type="text" placeholder="Escribe tu respuesta aquí..."
                                            v-model="textoRespuesta">
                                        <div class="btn-publicar-container">
                                            <button class="btn-cancelar"
                                                @click="toggleInputRespuesta(pregunta.preguntaId)">Cancelar
                                            </button>
                                            <button @click="publicarRespuesta(pregunta.preguntaId)"
                                                class="btn-publicar">Publicar
                                                Respuesta</button>
                                        </div>
                                    </div>
                                    <button v-if="inputRespuesta !== pregunta.preguntaId" class="btn-responder"
                                        @click="toggleInputRespuesta(pregunta.preguntaId)"> Responder</button>
                                    <div class="botonesPregunta">
                                        <button
                                            v-if="pregunta.autorId === idUsuario && inputRespuesta !== pregunta.preguntaId"
                                            @click="eliminarPregunta(pregunta.preguntaId)" class="btn-eliminar">
                                            <font-awesome-icon :icon="['fas', 'trash-alt']" />
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="seccion2">
            <div v-if="mostrarDetallesFaltas && faltaAlumnos.faltas != 0" class="overlay"></div>
            <div class="faltas">
                <h3 class="subtitulo"><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /> Listado de Faltas
                </h3>
                <p>Cantidad de Faltas: {{ faltaAlumnos.faltas }}</p>
                <div v-if="mostrarDetallesFaltas && faltaAlumnos.faltas != 0" class="pop-up-detalles-faltas">
                    <h1 class="titleFaltas"><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /> Detalle de
                        faltas</h1>
                    <div v-for="falta in faltaAlumnos.detalleFaltas" :key="falta" class="itemDetalleFaltas">
                        <p class="subtitle">Falta: <span>{{ falta.falta }}</span></p>
                        <p class="subtitle">Fecha: <span>{{ falta.fecha }}</span></p>
                        <p class="subtitle">Profesor: <span> {{ falta.profesor }}</span></p>
                        <p class="subtitle">Descripción: <span>{{ falta.motivo }}</span></p>
                    </div>
                    <button class="closeButton" @click="toggleDetallesFaltas"><font-awesome-icon
                            :icon="['fas', 'circle-xmark']" /> Cerrar</button>
                </div>
                <button @click="toggleDetallesFaltas">Ver Detalles</button>
            </div>

            <div class="fechas">
                <h3 class="subtitulo"><font-awesome-icon :icon="['fas', 'book-bookmark']" /> Tareas y Exámenes</h3>
                <p>Próxima Tarea: [Fecha]</p>
                <p>Próximo Examen: [Fecha]</p>
                <button>Ver Calendario</button>
            </div>

            <div class="acciones">
                <h3 class="subtitulo"><font-awesome-icon :icon="['fas', 'user-plus']" /> Acciones Rápidas</h3>
                <button @click="contactarProfesor">Contactar al Profesor</button>
                <button @click="mostrarReportar = true">Reportar un Problema</button>
            </div>

            <div class="modal" v-if="mostrarReportar">
                <div class="modal-content">
                    <span class="close" @click="mostrarReportar = false">&times;</span>
                    <h3>Reportar un problema</h3>
                    <textarea placeholder="Descripción del problema" v-model="problemas.descripcion"></textarea>
                    <button @click="enviarProblema" class="btn btn-modal">Enviar</button>
                </div>
            </div>

            <div v-if="showAviso" class="aviso">
                Correo del profesor copiado al portapapeles!
            </div>
            <div class="participantes">
                <h3 class="subtitulo"><font-awesome-icon :icon="['fas', 'user-group']" /> Participantes</h3>
                <div class="team-members">
                    <img v-for="member in asignatura.members" :key="member" :src="member" alt="Team member"
                        class="team-member">
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
const mostrarReportar = ref(false);

const faltaAlumnos = ref([]);

const textoPregunta = ref('');

const listadoPreguntas = ref([]);

const textoRespuesta = ref('');

const inputRespuesta = ref('');

const mostrarRespuestas = ref({});

const toggleRespuestas = (id) => {
    if (mostrarRespuestas.value === null) {
        mostrarRespuestas.value = {};
    }
    mostrarRespuestas.value[id] = !mostrarRespuestas.value[id];
};

const toggleInputRespuesta = (id) => {
    if (inputRespuesta.value === id) {
        inputRespuesta.value = '';
    } else {
        inputRespuesta.value = id;
    }
};


const toggleDetallesFaltas = () => {
    mostrarDetallesFaltas.value = !mostrarDetallesFaltas.value;

    if (faltaAlumnos.value.faltas === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay faltas registradas',
            timer: 1200,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#08cccc'
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

const problemas = ref({
    descripcion: '',
    idUsuario: idUsuario
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


async function enviarProblema() {

    console.log('problemas:', problemas);

    const problemaParaEnviar = {
        descripcion: problemas.value.descripcion,
        idUsuario: idUsuario // Asegúrate de que idUsuario esté definido
    };

    try {
        // Envía el objeto problema a /publicarProblema
        const respuesta = await axios.post('http://localhost:8080/publicarProblema', problemaParaEnviar);

        if (respuesta.status === 200) {
            // Resetea la descripción del problema y oculta el formulario de reporte
            problemas.value.descripcion = '';
            mostrarReportar.value = false;
            Swal.fire({
                title: 'Problema reportado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#08cccc'
            });
        } else {
            console.error('Error al enviar los datos:', respuesta.statusText)
        }
    } catch (error) {
        console.error('Error en la petición fetch:', error)
    }
}

async function recuperarAsignatura(id) {
    await axios.get(`http://localhost:8080/asignatura/${id}`)
        .then(async response => {
            asignatura.value = response.data;
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

async function publicarPregunta() {

    //validacion
    if (textoPregunta.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes escribir una pregunta',
            timer: 1200
        });
        return;
    }

    const nuevaPregunta = {
        texto: textoPregunta.value,
        autor: userStore.user._id,
    }

    await axios.post('http://localhost:8080/pregunta', {
        texto: nuevaPregunta.texto,
        autor: nuevaPregunta.autor,
        asignaturaId: id
    })
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Pregunta Publicada',
                text: 'Tu pregunta ha sido publicada con éxito',
                timer: 1200
            });

            textoPregunta.value = '';
            recuperarPreguntas();
        })
        .catch(error => {
            console.error(error);
        });
}

async function eliminarPregunta(preguntaId) {
    await axios.delete(`http://localhost:8080/pregunta/${id}/${preguntaId}`)
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Pregunta Eliminada',
                text: 'Tu pregunta ha sido eliminada con éxito',
                timer: 1000
            });
            recuperarPreguntas();
        })
        .catch(error => {
            console.error(error);
        });
}

async function recuperarPreguntas() {
    await axios.get(`http://localhost:8080/preguntas/${id}`)
        .then(response => {
            listadoPreguntas.value = response.data;
        })
        .catch(error => {
            console.error(error);
        });
}

async function publicarRespuesta(preguntaId) {
    //validacion
    if (textoRespuesta.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes escribir una respuesta',
            timer: 1200
        });
        return;
    }

    const nuevaRespuesta = {
        texto: textoRespuesta.value,
        autorRespuesta: userStore.user._id,
        preguntaId: preguntaId,
    }

    const preguntaIndex = listadoPreguntas.value.findIndex(pregunta => pregunta.preguntaId === preguntaId);
    if (preguntaIndex !== -1) {
        if (!listadoPreguntas.value[preguntaIndex].respuestas) {
            listadoPreguntas.value[preguntaIndex].respuestas = [];
        }
        listadoPreguntas.value[preguntaIndex].respuestas.push(nuevaRespuesta);
    }

    // Enviar informacion a la base de datos
    await axios.post('http://localhost:8080/respuesta', {
        texto: nuevaRespuesta.texto,
        autorRespuesta: nuevaRespuesta.autorRespuesta,
        preguntaId: nuevaRespuesta.preguntaId,
        asignaturaId: id
    })
        .then(response => {
            textoRespuesta.value = '';
        })
        .catch(error => {
            console.error(error);
        });

        recuperarPreguntas();

    mostrarRespuestas.value[preguntaId] = true;
    textoRespuesta.value = '';
}

async function eliminarRespuesta(preguntaId, respuestaId) {
    await axios.delete(`http://localhost:8080/respuesta/${id}/${preguntaId}/${respuestaId}`)
        .then(response => {
            recuperarPreguntas();
        })
        .catch(error => {
            console.error(error);
        });
}

onMounted(async () => {
    recuperarAsignatura(id);
    recuperarFaltas(idUsuario);
    recuperarPreguntas();
    window.addEventListener('click', closePopUp);
});

</script>

<style scoped>
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
    margin: 40px 10%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

.containerTitle {
    margin-bottom: 20px;
}

.title {
    font-size: 24px;
    margin: 0;
    font-weight: bold;
}

.seccion1 {
    padding: 20px;
    width: 70%;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: var(--container-background-color);
}

.seccion2 {
    padding: 20px;
    width: 26%;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: var(--container-background-color);
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

button {
    padding: 10px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
}

button:hover {
    background-color: var(--button-hover-background-color);
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
    flex-wrap: wrap;
}

.team-member {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 5px;
}

.close {
    cursor: pointer;
    float: right;
}

.close:hover {
    color: var(--button-background-color);
}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-content {
    background-color: var(--container-background-color);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    width: 80%;
    max-width: 500px;
    position: relative;
}

.modal-content h3 {
    margin-bottom: 1rem;
}

.modal-content input,
.modal-content textarea {
    width: 100%;
    padding: 0.5rem;
    background-color: var(--input-background-color);
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.modal-content textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    resize: none;
    height: 150px;
}

input[type="text"] {
    font-size: 16px;
    border-radius: 5px;
    border: none;
    padding: 0.5rem;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    background-color: var(--input-background-color);
    color: var(--text-color);
}

.pregunta {
    margin-bottom: 10px;
}

.btn-pregunta {
    margin-bottom: 0.8rem;
}

.pregunta-container {
    background-color: var(--gray-text-color);
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 10px;
}

.tituloPregunta {
    font-weight: bold;
}

.autorPregunta {
    font-style: italic;
    margin-bottom: 0;
    margin-top: 0;
    font-size: 0.8rem;
}

.btn-responder {
    background-color: none;
    color: var(--button-text-color);
    border: none;
    border-radius: 5px;
    font-size: 12px;
    padding: 5px;
    margin: 0;
    margin-right: 5px;
    margin-left: auto;
    display: flex;
    align-items: end;
}

.btn-cancelar {
    background-color: var(--gray-hover-color);
    margin: 0;
    margin-bottom: 5px;
    margin-right: 10px;
    padding: 5px;
}

.btn-cancelar:hover {
    background-color: var(--border-color)
}

.btn-publicar-container {
    display: flex;
    justify-content: flex-end;
}

.btn-publicar {
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    padding: 5px;
    margin-top: 0;
    margin-bottom: 8px;
    margin-right: 0;
}

.pregunta-responder {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 8px;
}

.btn-eliminar {
    background-color: red;
    color: var(--button-text-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    padding: 5px;
    margin: 0;
}

.btn-eliminar:hover {
    background-color: darkred;
}

.responderPregunta input {
    margin-bottom: 10px;
    font-size: 0.8rem;
    border: 1px solid #cccccc7a;
}

.respuestas-container {
    margin-top: 10px;
}

.respuesta {
    background-color: var(--border-color);
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 8px;
    position: relative;
}

.textoRespuestas {
    margin: 0;
    margin-left: 10px;
}

.autorRespuesta {
    font-style: italic;
    margin-bottom: 8px;
    margin-top: 0;
    font-size: 0.8rem;
}

.responderPregunta {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.btn-mostrarRespuestas {
    background-color: transparent;
    color: var(--button-text-color);
    text-decoration: underline;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    padding: 5px;
    margin: 0;
}

.btn-mostrarRespuestas:hover {
    background-color: black;
}

.iconoRespuesta {
    margin-right: 5px;
}


.btn-eliminar-respuesta {
    background-color: red;
    color: var(--button-text-color);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position:absolute;
    margin:0;
    right: 2px;
    top: -5px;
    font-size: 8px;
    padding:5px;
}

.btn-eliminar-respuesta:hover {
    background-color: darkred;
}

.icon-btn-eliminar-respuesta {
    font-size: 8px;
    margin: 0;
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