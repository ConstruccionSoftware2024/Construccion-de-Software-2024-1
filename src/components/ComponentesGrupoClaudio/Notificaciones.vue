<script setup>
import { ref, onMounted } from 'vue';


let alertas = ref([]);
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
        console.log('Usuarios:', usuarios);
        // idUsuario = usuarios[3]._id;
        //este id de usuario deberia ser el del usuario loggeado
        idUsuario.value = '665e3a8c6e8ed7a9e8c359f3'
        //console.log('id Usuario:', idUsuario);
    }
    catch (error) {
        console.error('Error al obtener los usuarios:', error)
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


// const obtenerAlertas = async () => {
//     try {
//         let respuesta = await fetch(`http://localhost:8080/user/${idUsuario}/alertas`);
//         alertas = await respuesta.json();
//         //console.log('Alertas:', alertas);
//     }
//     catch (error) {
//         console.error('Error al obtener las alertas:', error)
//     }
// }

// setInterval(() => {
//     getMensajes()
// }, 8000)

const getMensajes = async () => {
    try {
        let respuesta = await fetch(`http://localhost:8080/message/${idUsuario.value}`);
        let data = await respuesta.json()
        mensajesPendientes(data)
        data = ordenarMensajes(data)
        console.log("valor mensajes : ", data)
        mensajes.value = data

    } catch {
        console.error("Error al obtener mensajes")
    }
}

//Logica de los mensajes 
const ordenarMensajes = (mensajes) => {
    return mensajes.sort((a, b) => {
        if (a.visto && !b.visto) {
            return 1;
        } else if (!a.visto && b.visto) {
            return -1;
        } else {
            return 0;
        }
    });

}

const mensajesPendientes = (mensajes) => {
    mensajes.forEach(element => {
        if (element.visto == false) {
            puntito.value = true
        }
    });

}


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
    top: 2rem;
    left: -150px;
    color: white;
    background-color: #2c2c2e;
    border: 1px solid black;
    border-radius: 12px;
    border-top-right-radius: 0;
    padding: 10px;
    width: 300px;
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

.puntito {
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
    left: 12px;
}

.notificacion {
    list-style-type: none;
    /* create a box shadow */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    margin-bottom: 5px;
    transition: all 0.3s;
}

.notificacion p {
    padding: .5rem;
    border-radius: 15px;
    transition: all .3s ease;
}

.notificacion p:hover {
    background-color: red;
}
</style>
