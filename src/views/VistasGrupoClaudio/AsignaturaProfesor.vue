<template>
    <div class="container">
        <h1>{{ asignatura.title }} - {{ asignatura.section }}</h1>
        <div class="content">
            <div class="left-column">
                <div class="section">
                    <h2><i class="fa-solid fa-list-ul"></i> Listado de Sesiones</h2>
                    <router-link v-for="(sesion, index) in sesiones" :key="index" :to="'/session/' + sesion._id"
                        class="session-item">
                        <div class="session-content">
                            <p class="session-name"> {{ sesion.nombre }}</p>
                            <p><i class="fa-solid fa-layer-group"></i> Descripción: {{ sesion.descripcion }}</p>
                            <p><i class="fa-solid fa-user-group"></i> Participantes: {{ sesion.participantes ?
                                sesion.participantes.length : 0 }}</p>
                        </div>
                    </router-link>
                    <button @click="mostrarPopup = true" class="new-section-button btn">Crear sesión</button>
                </div>

                <div class="section">
                    <h2><i class="fa-solid fa-book"></i> Recursos de la Asignatura</h2>
                    <div v-for="(recurso, index) in recursos" :key="index" class="resource-item">
                        {{ recurso.nombre }}
                    </div>
                    <button @click="mostrarPopupRecurso = true" class="btn">Añadir Recurso</button>
                </div>

                <div class="section">
                    <h2><i class="fa-regular fa-comment-dots"></i> Foro de Preguntas</h2>
                    <input type="text" placeholder="Escribe tu pregunta aquí..." v-model="nuevaPregunta">
                    <button @click="publicarPregunta" class="btn">Publicar Pregunta</button>
                </div>
            </div>

            <div class="right-column">
                <div class="section">
                    <h2><i class="fa-solid fa-triangle-exclamation"></i> Listado de Faltas</h2>
                    <p>Ver el detalle de faltas de Alumnos</p>
                    <button class="btn" @click="goToFaltas">Ver Detalles</button>
                </div>

                <div class="section">
                    <h2><i class="fa-solid fa-user-plus"></i> Acciones Adicionales</h2>
                    <div class="button-container">
                        <button class="btn">Contactar a un Alumno</button>
                        <button class="btn">Reportar un Problema</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" v-if="mostrarPopup">
            <div class="modal-content">
                <span class="close" @click="mostrarPopup = false">&times;</span>
                <div class="add-falta">
                    <h2>Crear nueva sesión</h2>
                    <div class="input-group">
                        <div class="input-middle" style="display: flex; justify-content: space-between;">
                            <div style="flex: 1; margin-right: 10px;">
                                <p class="text-form">Nombre de la sesión</p>
                                <input required placeholder="Nombre de la sesión" type="text" id="nombre"
                                    v-model="nuevaSesion.nombre">
                            </div>
                            <div style="flex: 1; margin-left: 10px;">
                                <p class="text-form">Descripción</p>
                                <input required placeholder="Descripción" type="text" id="descripcion"
                                    v-model="nuevaSesion.descripcion">
                            </div>
                        </div>
                        <div v-if="showError" class="error-message">
                            Por favor complete todos los campos.
                        </div>
                    </div>
                    <button @click.prevent="enviarFormulario" class="saveButton"
                        :disabled="!nuevaSesion.nombre || !nuevaSesion.descripcion">Crear</button>
                </div>
            </div>
        </div>

        <!-- Popup for adding resource -->
        <div v-if="mostrarPopupRecurso" class="popup">

            <h3>Añadir nuevo recurso</h3>
            <input required placeholder="Nombre del recurso" type="text" v-model="nuevoRecurso.nombre">
            <input required placeholder="Enlace del recurso" type="text" v-model="nuevoRecurso.enlace">
            <input type="submit" class="btn" value="Añadir Recurso">
            <button @click="mostrarPopupRecurso = false" class="btn-cerrar">Cerrar</button>

        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    data() {
        return {
            sesiones: [],
            mostrarPopup: false,
            nuevaSesion: {
                nombre: '',
                descripcion: '',
                asignatura: ''
            },
        }
    },
    setup() {
        const sesiones = ref([]);
        const router = useRouter();
        const route = useRoute()
        const asignaturaId = route.params.id
        const asignatura = ref('Nombre Ejemplo')
        const mostrarPopup = ref(false)
        const mostrarPopupRecurso = ref(false)
        const nuevaPregunta = ref('')
        const nuevoRecurso = reactive({
            nombre: '',
            enlace: ''
        })
        const nuevaTarea = reactive({
            nombre: '',
            descripcion: ''
        })
        const info = ref([])
        const recursos = ref([])

        const formulario = reactive({
            nombre: '',
            descripcion: '',
            creador: 'default'
        })

        const cargarRecursos = async () => {
        }
        const goToFaltas = () => {
            router.push('/faltaAlumnos');
        };

        const publicarPregunta = () => {
            console.log('Pregunta publicada:', nuevaPregunta.value)

        }

        const enviarRecurso = async () => {
            console.log('Enviando recurso:')
        }
        const cargarSesiones = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/asignatura/${asignaturaId}`);
                asignatura.value = response.data;
                if (asignatura.value.sesiones) {
                    const promises = asignatura.value.sesiones.map(sesionId =>
                        axios.get(`http://localhost:8080/sesion/${sesionId}`)
                    );

                    const sesionResponses = await Promise.all(promises);

                    sesiones.value = sesionResponses.map(response => response.data);

                    console.log(sesiones);
                }
            } catch (error) {
                console.error(error);
            }
        };
        onMounted(() => {
            cargarRecursos();
            cargarSesiones();
        })

        return {
            asignatura,
            mostrarPopup,
            mostrarPopupRecurso,
            nuevaPregunta,
            nuevoRecurso,
            info,
            recursos,
            formulario,
            enviarRecurso,
            sesiones,
            publicarPregunta,
            goToFaltas,
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
            if (!this.nuevaSesion.nombre || !this.nuevaSesion.descripcion) {
                this.showError = true;
                return;
            }
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
                    this.nuevaSesion.nombre = '';
                    this.nuevaSesion.descripcion = '';
                    // Obtiene la id de la sesión creada
                    const sessionId = respuesta.data._id;

                    await axios.post(`http://localhost:8080/asignatura/${asignaturaId}/addSession`, { sessionId });

                    console.log('Sesión creada con ID:', sessionId);

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
    }
}
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

h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

h2 {
    font-weight: bold;
}

.content {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
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
    gap: 1.5rem;
}

.section {
    background-color: var(--container-background-color);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

.section:not(:last-child) {
    margin-bottom: 1.5rem;
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

.new-section-button {
    margin-top: 0.7rem;
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

.resource-item,
.activity-item {
    padding: 1rem 0;
    border-bottom: 1px solid #ddd;
}

.input-field {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
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

h2 {
    font-weight: bold;
    margin-bottom: 2rem;
}

.button-container {
    display: flex;
    justify-content: space-between;
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
    background-color: #e9e9e9;
    background-color: var(--container-background-color);
    padding: 2rem;
    width: 65%;
    min-height: 35%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
}

.modal-content h2 {
    text-align: center;
    margin-bottom: 1rem;

}

.modal-content input[type="text"],
.modal-content input[type="date"],
.modal-content textarea {
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

.modal-content textarea {
    max-height: 550px;
    min-height: 50px;
    max-width: 385px;
    min-width: 200px;
    width: 385px;
    height: 118px;
}

.modal-content input[type="text"]:focus,
.modal-content input[type="date"]:focus,
.modal-content textarea:focus {
    box-shadow: 0 0 0 2px var(--button-background-color);
    outline: none;
}

.saveButton {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background-color: #08cccc;
    color: white;
    border: none;
    height: 2.5rem;
    width: 9rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
}

.saveButton:hover {
    background-color: var(--button-hover-background-color);
    border: var(--border-color);
    color: black;
}
</style>
