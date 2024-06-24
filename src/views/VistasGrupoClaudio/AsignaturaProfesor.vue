<template>
    <div class="container">
        <h1>{{ asignatura.title }} - {{ asignatura.section }}</h1>
        <div class="content">
            <div class="left-column">
                <div class="section">
                    <h2><i class="fa-solid fa-list-ul"></i> Listado de Sesiones</h2>
                    <router-link v-for="(sesion, index) in sesiones" :key="index" :to="'/vistaProfesor/' + sesion._id"
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
                    <div class="input-group">
                        <input type="text" placeholder="Escribe tu pregunta aquí..." v-model="nuevaPregunta">
                        <button @click="publicarPregunta" class="btn">Publicar Pregunta</button>
                    </div>
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
                        <button class="btn" @click="goToListaAlumnos">Contactar a un Alumno</button>
                        <button class="btn" @click="goToContact">Reportar un Problema</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="mostrarPopupRecurso" class="modal">
            <div class="modal-content">
                <span class="close" @click="mostrarPopupRecurso = false">&times;</span>
                <h3>Añadir nuevo recurso</h3>
                <input required placeholder="Título del recurso" type="text" v-model="nuevoRecurso.titulo">
                <textarea required placeholder="Descripción del recurso" v-model="nuevoRecurso.descripcion"></textarea>
                <input required type="file" @change="onFileChange">
                <button @click="enviarRecurso" class="btn">Añadir Recurso</button>
            </div>
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
            mostrarPopupRecurso: false,
            nuevaSesion: {
                nombre: '',
                descripcion: '',
                asignatura: ''
            },
            nuevoRecurso: {
                titulo: '',
                descripcion: '',
                archivo: null
            }
        }
    },
    setup() {
        const sesiones = ref([]);
        const router = useRouter();
        const route = useRoute();
        const asignaturaId = route.params.id;
        const asignatura = ref('Nombre Ejemplo');
        const mostrarPopup = ref(false);
        const mostrarPopupRecurso = ref(false);
        const nuevaPregunta = ref('');
        const nuevoRecurso = reactive({
            titulo: '',
            descripcion: '',
            archivo: null
        });
        const info = ref([]);
        const recursos = ref([]);

        const cargarRecursos = async () => { };
        const goToFaltas = () => {
            router.push('/faltaAlumnos');
        };
        const goToListaAlumnos = () => {
            router.push('/lista-alumnos');
        };
        const goToContact = () => {
            router.push('/contact');
        };
        const publicarPregunta = () => {
            console.log('Pregunta publicada:', nuevaPregunta.value);
        };

        const onFileChange = (e) => {
            nuevoRecurso.archivo = e.target.files[0];
        };

        const enviarRecurso = async () => {
            console.log('Enviando recurso:', nuevoRecurso);
            // lógica para enviar el recurso al servidor
            mostrarPopupRecurso.value = false;
        };

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
        });

        return {
            asignatura,
            mostrarPopup,
            mostrarPopupRecurso,
            nuevaPregunta,
            nuevoRecurso,
            info,
            recursos,
            sesiones,
            publicarPregunta,
            goToFaltas,
            goToListaAlumnos,
            goToContact,
            onFileChange,
            enviarRecurso
        };
    }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1200px;
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
    flex-wrap: wrap;
}

.left-column,
.right-column {
    flex: 1;
    min-width: 300px;
}

.section {
    background-color: var(--container-background-color);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

button.btn:hover {
    background-color: var(--button-hover-background-color);
    color: black;
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

:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--button-background-color);
}

.modal-content .btn {
    margin-right: 0.5rem;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    cursor: pointer;
}

.input-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.input-group input {
    flex: 1;
    min-width: 200px;
}

@media (max-width: 768px) {
    .content {
        flex-direction: column;
    }
}

.button-container {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.button-container button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

button.new-section-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    width: 100%;
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }

    .input-group input,
    .input-group button {
        width: 100%;
        margin-top: 0.5rem;
    }
}
</style>