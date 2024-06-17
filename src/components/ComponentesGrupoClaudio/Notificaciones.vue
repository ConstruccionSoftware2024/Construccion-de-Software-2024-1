<script setup>
import { ref, onMounted } from 'vue';

let idUsuario = ref(null)
let mensajes = ref([])
let mostrarDropdown = ref(false)
let puntito = ref(false)

onMounted(async () => {
    await getUsers()
    await getMensajes()
    let idUsuario = ref(null);
    let alertas = ref([]);
    let mostrarDropdown = ref(false);

})
onMounted(() => {
    getUsers();
});

const getUsers = async () => {
    try {
        let respuesta = await fetch('http://localhost:8080/users');
        let usuarios = await respuesta.json();
        idUsuario.value = usuarios[0]._id;
        obtenerAlertas();
    } catch (error) {
        //console.error('Error al obtener los usuarios:', error);
    }
};

const obtenerAlertas = async () => {
    try {
        let respuesta = await fetch(`http://localhost:8080/user/${idUsuario.value}/alertas`);
        alertas.value = await respuesta.json();
    } catch (error) {
        //console.error('Error al obtener las alertas:', error);
    }
};

setInterval(obtenerAlertas, 5000);

const toggleNotifications = () => {
    mostrarDropdown.value = !mostrarDropdown.value;
};
</script>

<template>
    <div class="notifications-container">
        <i class="fa-solid fa-bell icon" @click="toggleNotifications"></i>
        <div class="dropdown" v-show="mostrarDropdown">
            <div class="notification" v-for="alerta in alertas" :key="alerta.id">
                <img :src="'https://professional.mit.edu/sites/default/files/styles/person_photo/public/2022-11/Erdin-Beshimov.png?h=5f8472e3&itok=8JV2nGFp'"
                    alt="icon" class="icono">
                <div class="texto">
                    <p class="titulo">{{ alerta.title }}</p>
                    <p class="descripcion">{{ alerta }}</p>
                </div>
                <span :class="['estado', alerta.status === 'Success' ? 'success' : 'failed']">{{ alerta.status }}</span>
            </div>
            <a href="#" class="show-all">Ver todas las notificaciones</a>
        </div>
    </div>
</template>

<style scoped>
.notifications-container {
    position: relative;
    display: inline-block;
}

.icon {
    font-size: 1.3rem;
    color: white;
    cursor: pointer;
    transition: color 0.3s;
    user-select: none;
    position: relative;
}

.icon:hover {
    color: #08cccc;
}

.dropdown {
    position: absolute;
    top: 180%;
    right: 0;
    width: 300px;
    background-color: var(--container-background-color);
    border-radius: 12px;
    border-top-right-radius: 0;
    padding: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    user-select: none;
}

.dropdown::before {
    content: '';
    position: absolute;
    top: -10px;
    right: 0px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid var(--container-background-color);
}

.notification {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid var(--border-color);
}

.icono {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
}

.texto {
    flex-grow: 1;
}

.titulo {
    font-weight: bold;
    margin: 0;
}

.descripcion {
    margin: 0;
    color: var(--text-color);
}

.estado {
    font-size: 0.8rem;
    font-weight: bold;
}

.success {
    color: green;
}

.failed {
    color: red;
}

.show-all {
    display: block;
    text-align: center;
    margin-top: 10px;
    color: #08cccc;
    text-decoration: none;
    user-select: none;
}

.show-all:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .icon {
        display: none;
    }
}
</style>
