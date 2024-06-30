<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../../../back-end/src/store.js'

let info = ref([])

let finish = ref({
    tried: false,
    success: false
})

const userStore = useUserStore()
const user = computed(() => userStore.user);
let usuario = ref(user.value.firstName + ' ' + user.value.lastName)

onMounted(async () => {
    await cargarMensajes()
})



const cargarMensajes = async () => {
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
// const getStatus = (mensaje) => {
//     if (mensaje.alerta == "Peligro") {
//         return 'danger'
//     }
//     if (mensaje.alerta == "Advertencia") {
//         return 'warning'
//     }
//     if (mensaje.alerta == "Normal") {
//         return 'ok'
//     }

//     return ''
// }

const formatearFecha = (fecha) => {
    if (!fecha) {
        return ''
    }
    let formato = fecha.split('T')
    let dia = formato[0]
    let hora = formato[1].split('.')[0]
    return hora + ' --  ' + dia
}

</script>

<template>

    <div class="text-container">
        <h1 class="greeting">Hola {{ userStore.user.firstName }} {{ userStore.user.lastName }}!</h1>
        <p class="description">¡Bienvenido/a a tu lista de mensajes! Aquí puedes ver todas las notificaciones que has
            recibido.</p>
    </div>
    <div class="container">

        <div class="mensaje" v-if="info.length === 0">
            No tienes notificaciones
        </div>
        <div class="mensaje" v-for="mensaje in info">
            <h3 class="remitente">
                <img src="/warning.svg" alt="advertencia" v-if="mensaje.alerta == 'Advertencia'">
                <img src="/normal.svg" alt="normal" v-if="mensaje.alerta == 'Normal'">
                <img src="/danger.svg" alt="peligro" v-if="mensaje.alerta == 'Peligro'">
                {{ mensaje.remitenteNombre }}
            </h3>
            <p class="infosesion">
                <span v-if="mensaje.asignatura">{{ mensaje.asignatura }}, </span>{{ mensaje.sesion }}
            </p>
            <p>
                {{ mensaje.mensaje }}
            </p>

            <p class="fecha">{{ formatearFecha(mensaje.fecha) }}</p>

        </div>


    </div>

</template>

<style scoped>
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

h4 {
    color: #08cccccc;
}

.remitente {
    display: flex;
    align-items: center;
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
    border: 2px solid gray;
    border-radius: 15px;
    padding: 1.5rem;
    min-width: 300px;
    width: 30%;
    max-width: 30%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-grow: 1;
}


.text-container {
    width: 90%;
    margin: 0px auto 3rem auto;
    text-align: start;
}
</style>