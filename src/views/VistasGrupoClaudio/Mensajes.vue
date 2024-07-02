<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../../../back-end/src/store.js'
import * as ordenamiento from '../../algoritmos/Ordenamiento.js'

let info = ref([])
let enviados = ref(false)
let finish = ref({
    tried: false,
    success: false
})
let selectedOption = ref('')

const userStore = useUserStore()
const user = computed(() => userStore.user);
let usuario = ref(user.value.firstName + ' ' + user.value.lastName)

onMounted(async () => {
    await cargarMensajes()
})



const cargarMensajes = async () => {
    enviados.value = false
    try {
        console.log('props', user.value._id)
        const respuesta = await fetch('http://localhost:8080/message/' + user.value._id);

        if (respuesta.ok) {
            const datos = await respuesta.json();
            info.value = datos.reverse()
            console.log('Datos recibidos mensajes:', info.value);
            finish.value.tried = true
            finish.value.success = true
        } else {
            console.error('Error al obtener los datos:', respuesta.statusText);
            finish.value.tried = true
            finish.value.success = false
        }
    } catch (error) {
        console.error('Error en la petición fetch:', error);
    }
};

const cargarMensajesEnviados = async () => {
    enviados.value = true
    try {
        console.log('props', user.value._id)
        const respuesta = await fetch('http://localhost:8080/sendmessage/' + user.value._id);

        if (respuesta.ok) {
            const datos = await respuesta.json();
            info.value = datos
            console.log('Datos recibidos:', info.value);
            finish.value.tried = true
            finish.value.success = true
        } else {
            console.error('Error al obtener los datos:', respuesta.statusText);
            finish.value.tried = true
            finish.value.success = false
        }
    } catch (error) {
        console.error('Error en la petición fetch:', error);
    }
};

const formatearFecha = (fecha) => {
    if (!fecha) {
        return ''
    }
    let formato = fecha.split('T')
    let dia = formato[0]
    let hora = formato[1].split('.')[0]
    return hora + ' --  ' + dia
}


const handleSelectChange = () => {
    switch (selectedOption.value) {
        case 'mayorPeligrosidad':
            info.value = ordenamiento.ordenarPorMayorPeligrosidad(info.value)
            break;
        case 'menorPeligrosidad':
            info.value = ordenamiento.ordenarPorMenorPeligrosidad(info.value)
            break;
        case 'asignatura':
            info.value = ordenamiento.ordenarPorAsignatura(info.value)
            break;
        case 'sesion':
            info.value = ordenamiento.ordenarPorSesion(info.value)
            break;
        case 'fecha':
            info.value = ordenamiento.ordenarPorFecha(info.value)
            break;
        case 'destinatario':
            info.value = ordenamiento.ordenarPorDestinatarioNombre(info.value)
            break;
        case 'remitente':
            info.value = ordenamiento.ordenarPorRemitenteNombre(info.value)
            break;
        case 'vistosPrimero':
            info.value = ordenamiento.ordenarPorVistosPrimero(info.value)
            break;
        case 'pendientesPrimero':
            info.value = ordenamiento.ordenarPorPendientesPrimero(info.value)
            break;
        default:
            console.log('Opción no reconocida');
    }
};

</script>

<template>

    <div class="text-container">
        <h1 class="greeting">Hola {{ userStore.user.firstName }} {{ userStore.user.lastName }}!</h1>
        <p class="description">¡Bienvenido/a a tu lista de mensajes! Aquí puedes ver todas las notificaciones que has
            recibido.</p>
    </div>
    <div class="supercontainer">

        <div class="controls">
            <button :class="{ 'active': !enviados }" @click="cargarMensajes">
                <img src="/recibidos.svg" alt="recibidos">
                Recibidos

            </button>

            <button :class="{ 'active': enviados }" @click="cargarMensajesEnviados">
                <img src="/enviados.svg" alt="recibidos">
                Enviados</button>

            <select v-model="selectedOption" @change="handleSelectChange">
                <option value="">Ordenar por</option>
                <option value="mayorPeligrosidad">Mayor peligrosidad</option>
                <option value="menorPeligrosidad">Menor peligrosidad</option>
                <option value="asignatura">Asignatura</option>
                <option value="sesion">Sesión</option>
                <option value="fecha">Fecha</option>
                <option value="destinatario" v-if="enviados">Destinatario</option>
                <option value="remitente" v-if="!enviados">Remitente</option>
                <option value="vistosPrimero" v-if="enviados">Vistos primero</option>
                <option value="pendientesPrimero" v-if="enviados">Pendientes primero</option>
            </select>

        </div>

        <div class="container">
            <div class="mensaje" v-if="info.length === 0 && !enviados">
                No tienes notificaciones
            </div>
            <div class="mensaje" v-if="info.length === 0 && enviados">
                No has enviado notificaciones
            </div>
            <div class="mensaje" v-for="mensaje in info">
                <div class="remitente">
                    <img src="/warning.svg" alt="advertencia" v-if="mensaje.alerta == 'Advertencia'">
                    <img src="/normal.svg" alt="normal" v-if="mensaje.alerta == 'Normal'">
                    <img src="/danger.svg" alt="peligro" v-if="mensaje.alerta == 'Peligro'">
                    <h3 v-if="!enviados">{{ mensaje.remitenteNombre }}</h3>
                    <h3 v-else>{{ mensaje.destinatarionombre }}</h3>
                    <span v-if="enviados && !mensaje.visto">Pendiente </span>
                    <span v-if="enviados && mensaje.visto">Visto</span>
                </div>
                <p class="infosesion">
                    <span v-if="mensaje.asignatura">{{ mensaje.asignatura }}, </span>{{ mensaje.sesion }}
                </p>
                <p>
                    {{ mensaje.mensaje }}
                </p>

                <p class="fecha">{{ formatearFecha(mensaje.fecha) }}</p>

            </div>

        </div>

    </div>




</template>

<style scoped>
.supercontainer {
    display: flex;
    width: 90%;
    margin: 0 auto;
    padding: .5rem;
}

select {
    width: 100%;
    padding: .5rem;
    margin-top: .5rem;
    outline: none;
}

.controls {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: .5rem;
    margin: 1rem;
    width: 30%;
    padding: 0 1rem;
    border-right: 2px solid #ccc;

}

.controls button {
    border: 2px solid #08cccc;
    outline: none;
    padding: .75rem 1rem;
    width: 100%;
    transition: .5s all ease;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    gap: .5rem;
}

.controls button:hover {
    background-color: #06BFBF;
    border: 2px solid #06BFBF;
}


@media screen and (max-width: 700px) {
    .supercontainer {
        flex-direction: column;
    }

    .controls {
        display: flex;
        flex-direction: row;
        width: 90%;
        border-right: none;
    }
}

h1,
h2 {
    font-weight: bold;
    color: #08cccc;
    margin: 2rem auto;

}

.infosesion {
    font-size: 0.8rem;
    color: #08cccc;
}

.fecha {
    font-size: .8rem;
}

img {
    max-width: 20px;
    max-height: 20px;
}

h3 {
    font-size: 1rem;
    font-weight: bold;
}

div span {
    font-size: .85rem;
}

h4 {
    color: #08cccccc;
}

.remitente {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    width: 90%;
    margin: 0 auto;
    gap: 1rem;
    padding: 1rem;
}

.mensaje {
    /* border: 2px solid gray; */
    border-radius: 8px;
    padding: 1.5rem;
    min-width: 300px;
    width: 30%;
    max-width: 30%;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
    flex-grow: 1;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}


.text-container {
    width: 90%;
    margin: 0px auto 3rem auto;
    text-align: start;
}

.active {
    background-color: #08cccc;
    transition: .1s ease-in-out all;
}
</style>