<template>
    <div class="container">
        <h1>{{ asignatura.title }} - {{ asignatura.section }}</h1>
        <div class="content">
            <div class="left-column">
                <!-- Listado de Sesiones -->
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

                <!-- Recursos de la Asignatura -->
                <div class="section">
                    <h2><i class="fa-solid fa-book"></i> Recursos de la Asignatura</h2>
                    <div v-for="(recurso, index) in recursos" :key="index" class="resource-item">
                        {{ recurso.nombre }}
                    </div>
                    <button @click="mostrarPopupRecurso = true" class="btn">Añadir Recurso</button>
                </div>

                <!-- Foro de Preguntas -->
                <div class="section">
                    <h2><i class="fa-regular fa-comment-dots"></i> Foro de Preguntas</h2>
                    <input type="text" placeholder="Escribe tu pregunta aquí..." v-model="nuevaPregunta">
                    <button @click="publicarPregunta" class="btn">Publicar Pregunta</button>
                </div>
            </div>

            <div class="right-column">
                <!-- Listado de Faltas -->
                <div class="section">
                    <h2><i class="fa-solid fa-triangle-exclamation"></i> Listado de Faltas</h2>
                    <p>Ver el detalle de faltas de Alumnos</p>
                    <button class="btn" @click="goToFaltas">Ver Detalles</button>
                </div>

                <!-- Acciones Adicionales -->
                <div class="section">
                    <h2><i class="fa-solid fa-user-plus"></i> Acciones Adicionales</h2>
                    <div class="button-container">
                        <button class="btn" @click="goToListaAlumnos">Contactar a un Alumno</button>
                        <button class="btn" @click="goToContact">Reportar un Problema</button>
                    </div>
                </div>

                <!-- Contenedor para agregar/eliminar alumnos -->
                <div class="section">
                    <h2><i class="fa-solid fa-user-plus"></i> Gestionar Alumnos</h2>
                    <div class="button-container">
                        <button class="btn" @click="mostrarPopupAgregar = true">Agregar Alumno</button>
                        <button class="btn" @click="mostrarPopupEliminar = true">Eliminar Alumno</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Popup para agregar alumno -->
        <div v-if="mostrarPopupAgregar" class="modal">
            <div class="modal-content stable-size">
                <span class="close" @click="mostrarPopupAgregar = false">&times;</span>
                <h3>Agregar Alumno</h3>
                <p>Alumnos seleccionados: {{ seleccionados.length }} / {{ alumnosNoParticipantes.length }}</p>
                <div class="alumno-lista">
                    <div v-for="alumno in paginatedAlumnosNoParticipantes" :key="alumno._id" class="alumno-item">
                        <input type="checkbox" :value="alumno._id" v-model="seleccionados"> {{ alumno.firstName }} {{
                            alumno.lastName }}
                    </div>
                </div>
                <div class="pagination">
                    <button :disabled="currentPageAgregar === 1" @click="currentPageAgregar--">Anterior</button>
                    <button :disabled="currentPageAgregar === totalPagesAgregar"
                        @click="currentPageAgregar++">Siguiente</button>
                </div>
                <button @click="agregarAlumnos" class="btn btn-modal">Agregar</button>
            </div>
        </div>

        <!-- Popup para eliminar alumno -->
        <div v-if="mostrarPopupEliminar" class="modal">
            <div class="modal-content stable-size">
                <span class="close" @click="mostrarPopupEliminar = false">&times;</span>
                <h3>Eliminar Alumno</h3>
                <p>Alumnos seleccionados: {{ seleccionados.length }} / {{ alumnosParticipantes.length }}</p>
                <div class="alumno-lista">
                    <div v-for="alumno in paginatedAlumnosParticipantes" :key="alumno._id" class="alumno-item">
                        <input type="checkbox" :value="alumno._id" v-model="seleccionados"> {{ alumno.firstName }} {{
                            alumno.lastName }}
                    </div>
                </div>
                <div class="pagination">
                    <button :disabled="currentPageEliminar === 1" @click="currentPageEliminar--">Anterior</button>
                    <button :disabled="currentPageEliminar === totalPagesEliminar"
                        @click="currentPageEliminar++">Siguiente</button>
                </div>
                <button @click="eliminarAlumnos" class="btn btn-modal">Eliminar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const sesiones = ref([]);
        const router = useRouter();
        const route = useRoute();
        const asignaturaId = route.params.id;
        const asignatura = ref({});
        const mostrarPopup = ref(false);
        const mostrarPopupRecurso = ref(false);
        const mostrarPopupAgregar = ref(false);
        const mostrarPopupEliminar = ref(false);
        const nuevaPregunta = ref('');
        const nuevoRecurso = reactive({
            nombre: '',
            enlace: ''
        });
        const nuevaTarea = reactive({
            nombre: '',
            descripcion: ''
        });
        const info = ref([]);
        const recursos = ref([]);
        const seleccionados = ref([]);
        const alumnos = ref([]);

        const currentPageAgregar = ref(1);
        const currentPageEliminar = ref(1);
        const itemsPerPage = 5;

        const formulario = reactive({
            nombre: '',
            descripcion: '',
            creador: 'default'
        });

        const cargarRecursos = async () => { };
        const goToFaltas = () => {
            router.push(`/faltaAlumnos/${asignaturaId}`);
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

        const enviarRecurso = async () => {
            console.log('Enviando recurso:');
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

        const cargarAlumnos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/usuarios?rol=alumno');
                alumnos.value = response.data;
            } catch (error) {
                console.error('Error al cargar alumnos:', error);
            }
        };

        const alumnosNoParticipantes = computed(() => {
            const participantesIds = new Set(asignatura.value.members.map(member => member.toString()));
            return alumnos.value.filter(alumno => !participantesIds.has(alumno._id.toString()));
        });

        const alumnosParticipantes = computed(() => {
            const participantesIds = new Set(asignatura.value.members.map(member => member.toString()));
            return alumnos.value.filter(alumno => participantesIds.has(alumno._id.toString()));
        });

        const paginatedAlumnosNoParticipantes = computed(() => {
            const start = (currentPageAgregar.value - 1) * itemsPerPage;
            return alumnosNoParticipantes.value.slice(start, start + itemsPerPage);
        });

        const paginatedAlumnosParticipantes = computed(() => {
            const start = (currentPageEliminar.value - 1) * itemsPerPage;
            return alumnosParticipantes.value.slice(start, start + itemsPerPage);
        });

        const totalPagesAgregar = computed(() => {
            return Math.ceil(alumnosNoParticipantes.value.length / itemsPerPage);
        });

        const totalPagesEliminar = computed(() => {
            return Math.ceil(alumnosParticipantes.value.length / itemsPerPage);
        });

        const agregarAlumnos = async () => {
            try {
                for (const studentId of seleccionados.value) {
                    await axios.post(`http://localhost:8080/asignatura/${asignaturaId}/addStudent`, { studentId });
                }
                console.log('Alumnos agregados:', seleccionados.value);
                mostrarPopupAgregar.value = false;
                cargarSesiones();
                seleccionados.value = [];
            } catch (error) {
                console.error('Error al agregar alumnos:', error);
            }
        };

        const eliminarAlumnos = async () => {
            try {
                for (const studentId of seleccionados.value) {
                    await axios.post(`http://localhost:8080/asignatura/${asignaturaId}/removeStudent`, { studentId });
                }
                console.log('Alumnos eliminados:', seleccionados.value);
                mostrarPopupEliminar.value = false;
                cargarSesiones();
                seleccionados.value = [];
            } catch (error) {
                console.error('Error al eliminar alumnos:', error);
            }
        };

        onMounted(() => {
            cargarRecursos();
            cargarSesiones();
            cargarAlumnos();
        });

        return {
            asignatura,
            mostrarPopup,
            mostrarPopupAgregar,
            mostrarPopupEliminar,
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
            goToListaAlumnos,
            goToContact,
            enviarRecurso,
            agregarAlumnos,
            eliminarAlumnos,
            seleccionados,
            alumnosNoParticipantes,
            alumnosParticipantes,
            paginatedAlumnosNoParticipantes,
            paginatedAlumnosParticipantes,
            currentPageAgregar,
            currentPageEliminar,
            totalPagesAgregar,
            totalPagesEliminar
        };
    }
};
</script>

<style scoped>
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
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    height: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 1.5rem;
}

.alumno-lista {
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 20px;
}

.alumno-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid var(--border-color);
}

.alumno-item input {
    margin-right: 10px;
}

.btn-modal {
    background-color: var(--button-background-color);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    margin-top: 20px;
}

.btn-modal:hover {
    background-color: var(--button-hover-background-color);
}

.pagination {
    display: flex;
    justify-content: space-between;
}

.pagination button {
    background-color: var(--button-background-color);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.pagination button:disabled {
    background-color: #b6b6b6;
    cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
    background-color: var(--button-hover-background-color);
}

.close:hover {
    color: var(--button-background-color);
}

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
    width: 90%;
    max-width: 1200px;
    margin: auto;
    justify-content: space-between;
    margin-bottom: 3rem;
    margin-top: 0.5rem;
}

h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
}

h2 {
    font-weight: bold;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
}

.left-column,
.right-column {
    width: 100%;
}

.section {
    background-color: var(--container-background-color);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
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
    font-size: 1rem;
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
    width: 100%;
    margin-bottom: 10px;
}

.btn-modal {
    float: right;
}

button.btn:hover {
    background-color: var(--button-hover-background-color);
    color: var(--text-color);
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
    flex-direction: column;
    gap: 10px;
}

@media (min-width: 768px) {
    .content {
        flex-direction: row;
    }

    .left-column {
        flex: 2;
    }

    .right-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    button.btn {
        width: auto;
        margin-bottom: 0;
    }

    .button-container {
        flex-direction: row;
        justify-content: space-between;
    }
}
</style>
