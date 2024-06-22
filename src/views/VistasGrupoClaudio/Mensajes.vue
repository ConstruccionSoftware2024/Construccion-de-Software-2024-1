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


onMounted(async () => {
    await cargarMensajes()
})



const cargarMensajes = async () => {
    try {
        console.log('props', user.value._id)
        const respuesta = await fetch('http://localhost:8080/message/' + user.value._id);

        if (respuesta.ok) {
            const datos = await respuesta.json();
            info.value = datos
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

</script>

<template>

    <div class="container">

        <div v-for="mensaje in info">
            {{ mensaje.mensaje }}
        </div>


    </div>

</template>