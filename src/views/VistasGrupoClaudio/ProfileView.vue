<template>
    <div class="container">
        <div class="alumno-container">
            <div class="alumno-info">
                <img class="alumno-img" :src="imagen" />
                <div class="alumno-text">
                    <h2>{{ alumno.firstName }} {{ alumno.lastName }}</h2>
                    <p class="texto-major"> {{ alumno.major }}, {{ alumno.campus }}</p>
                </div>
            </div>
        </div>

        <div class="detalle-container">
            <h2 class="titulo"> Información General </h2>
            <div class="detalle-info">
                <template v-if="mostrarFormulario">
                    <div class="input-group">
                        <label for="matricula">Matrícula: </label>
                        <input id="matricula" class="inputEditable" v-model="alumno.matricula" placeholder="Matrícula"
                            disabled>
                    </div>

                    <div class="input-group">
                        <label for="rut">Rut: </label>
                        <input id="rut" class="inputEditable" v-model="alumno.rut" placeholder="Rut" disabled>
                    </div>

                    <div class="input-group">
                        <label for="fechaNacimiento">Fecha de Nacimiento: </label>
                        <input id="fechaNacimiento" class="inputEditable" v-model="alumno.fechaNacimiento"
                            placeholder="Fecha de Nacimiento" disabled>
                    </div>

                    <div class="input-group">
                        <label for="email">email: </label>
                        <input id="email" class="inputEditable" v-model="alumnoEditado.email" placeholder="email">
                    </div>

                    <div class="input-group">
                        <label for="telefono">Teléfono: </label>
                        <input id="telefono" class="inputEditable" v-model="alumnoEditado.telefono"
                            placeholder="Teléfono">
                    </div>

                    <div class="input-group">
                        <label for="direccion">Dirección: </label>
                        <input id="direccion" class="inputEditable" v-model="alumnoEditado.direccion"
                            placeholder="Dirección">
                    </div>
                </template>
                <template v-else>
                    <p><span class="atributo-username">Matrícula</span><span class="dospuntos">:</span> {{
                        alumno.matricula }}</p>
                    <p><span class="atributo-username">Rut</span><span class="dospuntos">:</span> {{ alumno.rut }}</p>
                    <p><span class="atributo-username">Fecha de Nacimiento</span><span class="dospuntos">:</span> {{
                        alumno.fechaNacimiento }}</p>
                    <p><span class="atributo-username">email</span><span class="dospuntos">:</span> {{ alumno.email }}
                    </p>
                    <p><span class="atributo-username">Teléfono</span><span class="dospuntos">:</span> {{
                        alumno.telefono
                    }}</p>
                    <p><span class="atributo-username">Dirección</span><span class="dospuntos">:</span> {{
                        alumno.direccion }}</p>
                </template>
            </div>
            <div class="botones-contenedor">
                <button v-if="mostrarFormulario" class="cancelar-perfil-btn" @click="cancelarEdicion">
                    Cancelar
                </button>
                <button class="editar-perfil-btn" @click="toggleFormulario"
                    :disabled="mostrarFormulario && !cambiosRealizados">
                    {{ mostrarFormulario ? 'Guardar Cambios' : 'Editar Perfil' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import Swal from 'sweetalert2';
import { useUserStore } from '../../../back-end/src/store.js';
import axios from 'axios';


// Datos de prueba

const imagen = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';


const alumno = ref({
    username: '',
    firstName: '',
    lastName: '',
    campus: '',
    pais: '',
    major: '',
    matricula: '',
    rut: '',
    email: '',
    fechaNacimiento: '',
    telefono: '',
    direccion: '',
});

const alumnoEditado = reactive({ ...alumno.value });

const mostrarFormulario = ref(false);

const cambiosRealizados = computed(() => {
    return Object.keys(alumno.value).some(key => alumno.value[key] !== alumnoEditado[key]);
});

const userStore = useUserStore();
const user = computed(() => userStore.user);

function toggleFormulario() {
    if (mostrarFormulario.value) {
        // Verificar si hay cambios antes de guardar
        if (cambiosRealizados.value) {
            Object.assign(alumno.value, alumnoEditado);
            Swal.fire({
                icon: 'success',
                title: '¡Cambios guardados!',
                showConfirmButton: false,
                timer: 1200
            });
            actualizarDatosUsuario();
        }
    } else {
        Object.assign(alumnoEditado, alumno.value);
    }
    mostrarFormulario.value = !mostrarFormulario.value;
}

// Recuperar datos del usuario mediante el ._id

async function cargarDatosUsuario() {
    try {
        const response = await axios.get(`http://localhost:8080/user/${user.value._id}`);
        const data = response.data;
        alumno.value = data;
    } catch (error) {
        console.error(error);
    }
}

async function actualizarDatosUsuario() {
    try {
        const { _id, ...datosActualizados } = alumnoEditado;
        await axios.post(`http://localhost:8080/user/${user.value._id}`, datosActualizados);
        cargarDatosUsuario();
    } catch (error) {
        console.error(error);
    }
}


const cancelarEdicion = () => {
    if (cambiosRealizados.value) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Los cambios no se guardarán",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: 'grey',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, seguir editando',
        }).then((result) => {
            if (result.isConfirmed) {
                mostrarFormulario.value = false;
                Object.assign(alumnoEditado, alumno.value);
            }
        });
    } else

        mostrarFormulario.value = false;
};

cargarDatosUsuario();
</script>


<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    gap: 3rem;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 2rem;

}

.alumno-container,
.detalle-container {
    flex-grow: 1;
}

.alumno-container {
    flex-basis: 25%;
    background-color: var(--container-background-color);
    border-radius: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    flex-direction: row;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    padding: 3rem;
}

.detalle-container {
    flex-basis: 75%;
    display: flex;
    border-radius: 1rem;
    margin-top: 1rem;
    padding: 1rem;
    flex-direction: column;
    background-color: var(--container-background-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.alumno-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.alumno-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 2px solid var(--text-color);
}

.alumno-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-top: 2px solid var(--text-color);
    padding-top: 1rem;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.alumno-text>h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-color);
    font-weight: bold;
}

.alumno-text>p {
    margin: 0;
    color: var(--text-color);
    margin-top: 0.8rem;
}

.detalle-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    width: 100%;
    justify-content: center;
}

.detalle-info>p {
    margin: 0.5rem 0;
    font-size: 1.3rem;
    color: var(--text-color);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--text-color);
}

.titulo {
    text-align: start;
    font-size: 1.8rem;
    color: var(--text-color);
    font-weight: bold;
    padding-left: 1rem;
    padding-bottom: 1.5rem;
}

.dospuntos {
    margin-right: 6px;
}

.atributo-username {
    font-weight: 600;
}

.texto-campus {
    font-size: 0.9rem;
    color: var(--text-color);
}

.texto-major {
    font-size: 1rem;
    color: var(--text-color);
    margin-top: 0.8rem;
}

.inputEditable {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #000;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    width: 100%;
}

.input-group {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--text-color);
}

.input-group label {
    margin-right: 10px;
    white-space: nowrap;
    font-weight: 600;
    font-size: 1.3rem;
}

.inputEditable {
    flex-grow: 1;
}

.botones-contenedor {
    display: flex;
    width: 100%;
    justify-content: space-between;
}


.editar-perfil-btn {
    background-color: var(--button-background-color);
    color: black;
    font-weight: 600;
    padding: 10px 20px;
    margin: 10px 0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1.2rem;
    flex-grow: 5;
}

.editar-perfil-btn:hover {
    background-color: var(--button-hover-background-color);
}

.editar-perfil-btn:disabled {
    background-color: grey;
    cursor: not-allowed;
}

.cancelar-perfil-btn,
.editar-perfil-btn {
    margin: 10px;
}

.cancelar-perfil-btn {
    background-color: red;
    color: white;
    padding: 10px 20px;
    margin: 10px 0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1.2rem;
    flex-grow: 1;
}

.cancelar-perfil-btn:hover {
    background-color: #E50000;
}
</style>