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

        <!-- Popup for creating session -->
        <div v-if="mostrarPopup" class="popup">
            <form @submit.prevent="enviarFormulario">
                <h3>Crear nueva sesión</h3>
                <input required placeholder="Nombre de la sesión" type="text" id="nombre" v-model="formulario.nombre">
                <input required placeholder="Descripción" type="text" id="descripcion" v-model="formulario.descripcion">
                <input type="submit" class="btn" value="Crear sesión">
                <button @click="mostrarPopup = false" class="btn-cerrar">Cerrar</button>
            </form>
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

        const enviarFormulario = async () => {
            console.log('Enviando formulario:', formulario)
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
            enviarFormulario,
            enviarRecurso,
            sesiones,
            publicarPregunta,
            goToFaltas,
        }
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

.button-container {
    display: flex;
    justify-content: space-between;
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
</style>
