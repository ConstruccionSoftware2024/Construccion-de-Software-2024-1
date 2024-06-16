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
                <button>Contactar al Profesor</button>
                <button>Reportar un Problema</button>
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
    proximaTarea: '10/10/2021',
    proximoExamen: '15/10/2021',
    members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24', 'https://via.placeholder.com/24']
});


const sesiones = ref([]);

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
}

.seccion2 {
    padding: 20px;
    width: 26%;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.sesiones,
.recursos,
.foro,
.actividades,
.faltas,
.fechas,
.acciones {
    margin-bottom: 20px;
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
    background-color: #08cccc;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
}

.sesiones {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
}

.sesionesItem {
    border-bottom: 1px solid #ccc;
}

.navLink {
    text-decoration: none;
    color: #333;
    display: block;
    padding: 10px 0;
}

.navLink:hover {
    color: #08cccc;
}

.recursos {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
}

.foro {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
}

.actividades {
    background-color: #f1f1f1;
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
    color: #333;
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