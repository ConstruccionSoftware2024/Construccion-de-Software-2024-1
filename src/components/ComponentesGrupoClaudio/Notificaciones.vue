<script setup>

import { ref, onMounted } from 'vue'

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
        idUsuario = '666639f717785d6a01686d7c'
        //console.log('id Usuario:', idUsuario);
    }
    catch (error) {
        console.error('Error al obtener las usuarios:', error)
    }
}


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
        let respuesta = await fetch(`http://localhost:8080/message/${idUsuario}`);
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
    mostrarDropdown.value = !mostrarDropdown.value
}

const marcarMensajeComoLeido = async (idMensaje) => {
    try {
        let respuesta = await fetch(`http://localhost:8080/message/${idMensaje}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (respuesta.ok) {
            console.log("marcado como visto")
            getMensajes()
        }
        else {
            console.error("Error al marcar como visto")
        }

    } catch {
        console.error("Error al obtener mensajes")
    }
}

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
                <li :class="{ 'notificacion': !mensaje.visto, 'notificacionvista': mensaje.visto }">
                    <p style="">
                        {{ mensaje.mensaje }}
                    </p>
                    <div @click="marcarMensajeComoLeido(mensaje._id)" class="novisto" v-if="!mensaje.visto"
                        title="Marcar como visto">
                        <div class="puntito2"></div>
                    </div>
                </li>
                <!-- mensajes no leidos -->
                <!-- <li class="notificacion" v-else> -->
                <!-- <p style="">
                        {{ mensaje.mensaje }}
                    </p>
                </li> -->



            </ul>
        </div>
    </div>
</template>


<style scoped>
.novisto {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem;
    border-radius: 15px;
    transition: .3s ease all;
}

.novisto:hover {
    background-color: #444446;
}

.confirmicon {
    width: 25px;
    height: 25px;
    color: white;
}

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
    top: 2rem;
    left: -150px;
    color: white;
    background-color: #2c2c2e;
    /* border: 1px solid black; */
    border-radius: 12px;
    padding: 10px;
    width: 400px;
    max-height: 500px;
    overflow: hidden;
}

.lista {
    margin-top: 5px;
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

.puntito2 {
    background-color: #08cccc;
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.notificacion {
    list-style-type: none;
    /* create a box shadow */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    margin-bottom: 5px;
    transition: all 0.3s;
    display: flex;
    transition: all .3s ease;
    padding: .5rem;
    border-radius: 15px;
    gap: .5rem;
}

.notificacion p {
    padding: .5rem;
    border-radius: 15px;
}

.notificacion:hover {
    background-color: #323233;
}

.notificacionvista {
    list-style-type: none;
    /* create a box shadow */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
    transition: all 0.3s;
    display: flex;
    transition: all .3s ease;
    padding: .5rem;
    border-radius: 15px;
    gap: .5rem;
    background-color: #2B2B2D;
}
</style>