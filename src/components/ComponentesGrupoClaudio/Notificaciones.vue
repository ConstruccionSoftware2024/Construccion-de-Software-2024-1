<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../../../back-end/src/store.js'

let alertas = ref([]);
let idUsuario = ref(null)
let mensajes = ref([])
let mostrarDropdown = ref(false)
let puntito = ref(false)

const userStore = useUserStore()
const user = computed(() => userStore.user);

onMounted(async () => {
    await getUsers()

})

let interval = setInterval(() => {
    getUsers()
}, 5000);


const getUsers = async () => {
    try {
        //console.log('Obteniendo usuarios...');
        if (!user.value) {
            //console.log('No hay usuario', user);
            return
        }
        clearInterval(interval)
        idUsuario.value = user.value._id
        await getMensajes()

        //Lo que está a continuación es la forma anterior de traer el usuario, ahora se saca de la base de datos el usuario loggeado

        //console.log('valor del usuario', user.value._id)
        //let respuesta = await fetch('http://localhost:8080/users');
        //let usuarios = await respuesta.json();
        //console.log('Usuarios:', usuarios);
        // idUsuario = usuarios[3]._id;
        //este id de usuario deberia ser el del usuario loggeado
        //idUsuario = '666639f717785d6a01686d7c'
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
        console.log("valor data : ", data)
        mensajesPendientes(data)
        data = ordenarMensajes(data)
        console.log("valor mensajes : ", data)
        mensajes.value = data.filter(element => element.visto == false)

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
            <ul class="lista1" v-for="mensaje in mensajes " :key="mensaje.id">
                <!-- solo mostramos los mensajes que no han sido visto -->
                <li class="notificacion" v-if="!mensaje.visto">
                    <div class="info">
                        <div class="remitente">
                            <img src="/warning.svg" alt="advertencia" v-if="mensaje.alerta == 'Advertencia'">
                            <img src="/normal.svg" alt="normal" v-if="mensaje.alerta == 'Normal'">
                            <img src="/danger.svg" alt="peligro" v-if="mensaje.alerta == 'Peligro'">
                            <h3>{{ mensaje.remitenteNombre }}</h3>
                        </div>
                        <p style="">
                            {{ mensaje.mensaje }}
                        </p>
                        <p class="sesion">
                            {{ mensaje.sesion }}
                        </p>
                    </div>
                    <div @click="marcarMensajeComoLeido(mensaje._id)" class="novisto" v-if="!mensaje.visto"
                        title="Marcar como visto">
                        <div class="puntito2"></div>
                    </div>

                </li>




            </ul>
            <button class="vermas">
                <a href="/mensajes">
                    Ver todas las notificaciones

                </a>

            </button>
        </div>
    </div>
</template>


<style scoped>
a {
    text-decoration: none;
    color: white;
    height: 100%;
    width: 100%;
    padding: 1rem 3.3rem;
}

.sesion {
    font-size: .9rem;
}

.vermas {
    background-color: #2c2c2e;
    outline: none;
    border: none;
    border-top: 2px solid gray;
    color: white;
    width: 100%;
    padding: 1rem;
    transition: .3s all ease;
    cursor: pointer;
    border-radius: 15px;
}

.vermas:hover {
    background-color: #444446;
}

.tick {
    color: #08cccc;
    width: 20px;
    height: 20px;
}

ul.lista1 {
    padding-left: 0;
    list-style: none;
    width: 100%;
}

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

.supercontainer * {
    box-sizing: border-box;
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

.lista1 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.dropdown {
    position: absolute;
    top: 2rem;
    right: -5px;
    color: white;
    background-color: #2c2c2e;
    /* border: 1px solid black; */
    border-radius: 12px;
    border-top-right-radius: 0;
    padding: 10px;
    width: 400px;
    z-index: 10;
    overflow-y: scroll;
    max-height: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, .4);
    flex-direction: column;
    display: flex;
    align-items: center;
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    transition: all .3s ease;
    border-radius: 15px;
    padding: .8rem;
    width: 100%;
}

.notificacion p {
    border-radius: 15px;
}

.notificacion:hover {
    /* background-color: #323233; */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

img {
    max-width: 20px;
    max-height: 20px;
}

.remitente {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 200px;
}

.remitente h3 {
    width: 100%;
    font-size: 1.1rem;
    font-weight: bold;
}
</style>
