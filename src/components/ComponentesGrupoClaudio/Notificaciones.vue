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
            <ul class="lista1" v-for="mensaje in mensajes " :key="mensaje.id">

                <li :class="{ 'notificacion': !mensaje.visto, 'notificacionvista': mensaje.visto }">
                    <p style="">
                        {{ mensaje.mensaje }}
                    </p>
                    <div @click="marcarMensajeComoLeido(mensaje._id)" class="novisto" v-if="!mensaje.visto"
                        title="Marcar como visto">
                        <div class="puntito2"></div>
                    </div>

                    <!-- Icono para mensajes ya leidos -->

                    <!-- <div class="novisto">
                        <svg class="tick" v-if="mensaje.visto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="currentColor" className="size-6">
                            <path fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                clipRule="evenodd" />
                        </svg>
                    </div> -->



                </li>


            </ul>
        </div>
    </div>
</template>


<style scoped>
.tick {
    color: #08cccc;
    width: 20px;
    height: 20px;
}

ul.lista1 {
    padding-left: 0;
    list-style: none;
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
    max-height: 500px;
    overflow: scroll;
    z-index: 10;
    box-shadow: 0 4px 8px rgba(0, 0, 0, .4);
}

.dropdown::before {
    content: '';
    position: absolute;
    top: 10px;
    right: 5px;
    z-index: 20;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid var(--container-background-color);
    color: #08cccc;
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
    transition: all 0.3s;
    display: flex;
    transition: all .3s ease;
    border-radius: 15px;
    gap: .5rem;
    padding: 1rem;
}

.notificacion p {
    border-radius: 15px;
}

.notificacion:hover {
    background-color: #323233;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.notificacionvista {
    list-style-type: none;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
    transition: all 0.3s;
    display: flex;
    transition: all .3s ease;
    padding: 1rem;
    border-radius: 15px;
    gap: .5rem;
    background-color: #2B2B2D;
}
</style>
