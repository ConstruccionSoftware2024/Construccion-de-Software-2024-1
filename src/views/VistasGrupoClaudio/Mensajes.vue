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
const getStatus = (mensaje) => {
    if (mensaje.alerta == "Peligro") {
        return 'danger'
    }
    if (mensaje.alerta == "Advertencia") {
        return 'warning'
    }
    if (mensaje.alerta == "Normal") {
        return 'ok'
    }

    return ''
}
</script>

<template>

    <h1>Mensajes</h1>
    <h2>{{ usuario }} </h2>
    <div class="container">

        <div class="mensaje" v-if="info.length === 0">
            No tienes notificaciones
        </div>
        <div class="mensaje" v-for="mensaje in info">
            <p :class="getStatus(mensaje)">
                {{ mensaje.alerta }}
            </p>
            <h3>
                {{ mensaje.mensaje }}
            </h3>
            <h4>
                {{ mensaje.sesion }}
            </h4>
            <p v-if="mensaje.visto">visto</p>
            <p v-else>pendiente</p>

        </div>


    </div>

</template>

<style scoped>
h1,
h2 {
    text-align: center;
    font-weight: bold;
    margin: 2rem auto;

}

h3 {
    font-size: 1rem;
    font-weight: bold;
}

h4 {
    color: #08cccccc;
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
    padding: 1rem;
    min-width: 300px;
    width: 30%;
    max-width: 30%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-grow: 1;
}

.danger {
    color: rgb(156, 15, 15);
    font-weight: bold;
}

.warning {
    font-weight: bold;
    color: rgb(224, 146, 0);
}

.ok {
    color: rgb(18, 105, 18);
    font-weight: bold;
}
</style>