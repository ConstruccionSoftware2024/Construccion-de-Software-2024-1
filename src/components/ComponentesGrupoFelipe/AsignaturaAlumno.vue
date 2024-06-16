<template>
    <div class="container">

        <div class="seccion1">

            <div class="containerTitle">
                <h2 class="title">Asignatura: {{ asignatura.nombre }}</h2>
                <p>Profesor: {{ asignatura.profesor }}</p>
                <hr>
            </div>

            <div class="sesiones">
                <h3 class="subtitulo">Listado de Sesiones</h3>
                <div class="sesionesItem" v-for="sesion in sesiones" :key="sesion.id">
                    <router-link :to="'/session/' + sesion._id" class="navLink">{{ sesion.nombre }}</router-link>
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

            <div class="actividades">
                <h3 class="subtitulo">Actividades Recientes</h3>
                <ul>
                    <li>Entrega Tarea 1</li>
                    <li>Participación en Foro</li>
                    <li>Acceso a PDF de Estudio</li>
                </ul>
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


            <div class="acciones">
                <h3 class="subtitulo">Acciones Rápidas</h3>
                <button>Contactar al Profesor</button>
                <button>Reportar un Problema</button>
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

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
    data() {
        return {
            asignatura: {
                nombre: 'Nombre Ejemplo',
                profesor: 'Profesor Ejemplo',
                proximaTarea: '10/10/2021',
                proximoExamen: '15/10/2021',
                subjectName: 'Matemáticas',
                members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24', 'https://via.placeholder.com/24']
            },
            sesiones: [],
            mostrarPopup: false,
            nuevaSesion: {
                nombre: '',
                descripcion: '',
                asignatura: ''
            },
        }
    },
    methods: {
        recuperarSesiones() {
            axios.get(`http://localhost:8080/sesion`)
                .then(response => {
                    this.sesiones = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        publicarPregunta() {
            alert('Pregunta Publicada');
        },
        async fetchProjects() {
            try {
                const response = await axios.get('http://localhost:8080/asignaturas');
                this.projects = response.data;
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        },
        goToProject(id) {
            this.$router.push(`/asignatura/${id}`);
        },
        async enviarFormulario() {
            try {
                // Obtiene la id de la asignatura de la URL
                const asignaturaId = this.$route.params.id;

                if (!asignaturaId) {
                    console.error('No se encontró la id de la asignatura');
                    return;
                }

                // Agrega la id de la asignatura al objeto nuevaSesion
                this.nuevaSesion.asignatura = asignaturaId;
                console.log('Datos a enviar:', this.nuevaSesion);

                const respuesta = await axios.post('http://localhost:8080/sesion', this.nuevaSesion)

                if (respuesta.status === 200) {
                    this.fetchProjects();
                    this.mostrarPopup = false;
                } else {
                    console.error('Error al enviar los datos:', respuesta.statusText)
                }
            } catch (error) {
                console.error('Error en la petición fetch:', error)
            }
        },
    },
    created() {
        this.fetchProjects();
    },
    mounted() {
        this.recuperarSesiones();
    }
}
</script>

<style scoped>
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
</style>