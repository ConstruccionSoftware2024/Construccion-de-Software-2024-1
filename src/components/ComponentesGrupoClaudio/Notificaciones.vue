<script setup>

import { ref } from 'vue'

let idUsuario = ref([])
let alertas = ref([])
let mostrarDropdown = ref(false)

/*
const getUsers = async () => {
    try {
        let respuesta = await fetch('http://localhost:8080/users');
        usuario = await respuesta.json();
        console.log(usuario.id); // Aquí está el ID del usuario
    }
    catch (error) {
        console.error('Error al obtener las usuarios:', error)
    }
}
*/

const obtenerAlertas = async () => {
    try {
        let respuesta = await fetch(`http://localhost:8080/user/${idUsuario}/alertas`)
        alertas = await respuesta.json()
        console.log('Alertas:', alertas)
    }
    catch (error) {
        console.error('Error al obtener las alertas:', error)
    }
}

// Se llama a obtenerAlertas cada 5 segundos
//setInterval(obtenerAlertas, 5000)

const toggleNotifications = () => {
    mostrarDropdown.value = !mostrarDropdown.value
}

</script>

<template>
    <div class="container">
        <i class="fa-solid fa-bell icon" @click="toggleNotifications"></i>
    </div>
    <div class="dropdown" v-show="mostrarDropdown">
        <h1>Notificaciones</h1>
        <!--
        <ul>
            <li v-for="alerta in alertas" :key="alerta.id">
                {{ alerta.mensaje }}
            </li>
        </ul>
        -->
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon {
    font-size: 1.2rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
}

.icon:hover {
    color: #08cccc;
}

.dropdown {
    position: absolute;
    top: 74px;
    right: 2px;
    color: white;
    background-color: #2c2c2e;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
}
</style>