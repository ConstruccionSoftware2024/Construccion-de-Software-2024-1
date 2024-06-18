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

})

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
    <div class="supercontainer">

        <div class="container">
            <i class="fa-solid fa-bell icon" @click="toggleNotifications"></i>
        </div>
        <div class="puntito" v-if="puntito"></div>
        <div class="dropdown" v-show="mostrarDropdown">
            <ul class="lista" v-for="mensaje in mensajes " :key="mensaje.id">
                <!-- mensajes leidos -->
                <li class="notificacion" v-if="mensaje.visto">
                    <p style="">
                        {{ mensaje.mensaje }}
                    </p>
                </li>
                <!-- mensajes no leidos -->
                <li class="notificacion" v-else>
                    <p style="background-color: #424242;">
                        {{ mensaje.mensaje }}
                    </p>
                </li>


            </ul>
        </div>
    </div>
</template>

<style scoped>
.supercontainer {
    position: relative;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
    z-index: 10;
    top: 0;
    background-color: rgb(189, 54, 20);
    width: 10px;
    height: 10px;
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
