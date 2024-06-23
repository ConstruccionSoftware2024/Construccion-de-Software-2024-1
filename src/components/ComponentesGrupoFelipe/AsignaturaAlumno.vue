<template>
    <div class="container">

        <div class="seccion1">

            <div class="containerTitle">
                <h2 class="title">Asignatura: {{ asignatura.title }}</h2>
                <p>Profesor: {{ asignatura.profesor }}</p>
                <p>Descripción: {{ asignatura.description }}</p>
                <hr>
            </div>

            <div class="sesiones">
                <h3 class="subtitulo">Listado de Sesiones</h3>
                <div class="sesionesItem" v-for="sesion in sesiones" :key="sesion.id">
                    <router-link :to="determinarRuta(sesion._id, rolUsuario)" class="navLink">{{ sesion.nombre
                        }}</router-link>
                </div>
            </div>

            <div class="recursos">
                <h3 class="subtitulo">Recursos de la Asignatura</h3>
                <ul>
                    <li><a href="#">PDF de Estudio</a></li>
                    <li><a href="#">Video de Clase</a></li>
                    <li><a href="#">Enlace Externo</a></li>
                </ul>
            </div>


            <div class="foro">
                <h3 class="subtitulo">Foro de Preguntas</h3>
                <p>Escribe tu pregunta aquí...</p>
                <button @click="publicarPregunta">Publicar Pregunta</button>
            </div>

        </div>

        <div class="seccion2">
            <div class="faltas">
                <h3 class="subtitulo">Listado de Faltas</h3>
                <p>Resumen de Faltas: [Número de Faltas]</p>
                <button>Ver Detalles</button>
            </div>

            <div class="fechas">
                <h3 class="subtitulo">Tareas y Exámenes</h3>
                <p>Próxima Tarea: [Fecha]</p>
                <p>Próximo Examen: [Fecha]</p>
                <button>Ver Calendario</button>
            </div>

            <div class="actividades">
                <h3 class="subtitulo">Actividades Recientes</h3>
                <ul>
                    <li>Entrega Tarea 1</li>
                    <li>Participación en Foro</li>
                    <li>Acceso a PDF de Estudio</li>
                </ul>
            </div>


            <div class="acciones">
                <h3 class="subtitulo">Acciones Rápidas</h3>
                <button @click="contactarProfesor">Contactar al Profesor</button>
                <button>Reportar un Problema</button>
            </div>
            <div v-if="showAviso" class="aviso">
                Correo del profesor copiado al portapapeles!
            </div>
            <button @click="mostrarPopup = true">Crear sesión</button>

            <div v-if="mostrarPopup" class="popup">
                <h2>Crear sesión</h2>
                <label>Nombre de la sesión: <input v-model="nuevaSesion.nombre" type="text"></label>
                <label>Descripción: <input v-model="nuevaSesion.descripcion" type="text"></label>
                <button @click="enviarFormulario">Crear</button>
                <button @click="mostrarPopup = false">Cancelar</button>
            </div>

            <div class="participantes">
                <h3 class="subtitulo">Participantes</h3>
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

const route = useRoute();
const id = route.params.id;

const userStore = useUserStore();
const rolUsuario = userStore.user.role;

const asignatura = ref({
    nombre: 'Nombre Ejemplo',
    profesor: 'Profesor Ejemplo',
    email: 'ejemplo@utalca.cl',
    proximaTarea: '10/10/2021',
    proximoExamen: '15/10/2021',
    members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24', 'https://via.placeholder.com/24']
});

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
            console.log("asignatura: ", asignatura.value);
            recuperarProfesor(response.data.profesorId);
            const sesionesPromesas = asignatura.value.sesiones.map(sesionId => recuperarSesiones(sesionId));
            const sesionesResultados = await Promise.all(sesionesPromesas);
            sesiones.value = sesionesResultados;
            console.log(sesiones.value);
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

function determinarRuta(id, rol) {
    if (rol === 'profesor') {
        return { name: 'VistaProfesor', params: { id: id } };
    } else {
        return { name: 'VistaAlumno', params: { id: id } };
    }
}

onMounted(async () => {
    recuperarAsignatura(id);

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

.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
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

.sesiones {
    background-color: var(--background-color);
    padding: 10px;
    border-radius: 5px;
}

.sesionesItem {
    border-bottom: 1px solid #ccc;
}

.navLink {
    text-decoration: none;
    color: var(--text-color);
    display: block;
    padding: 10px 0;
}

.navLink:hover {
    color: var(--button-hover-background-color);
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