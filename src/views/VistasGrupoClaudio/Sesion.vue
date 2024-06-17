<template>
    <div class="container2" v-if="finish.tried">
        <div class="titlecontainer">
            <h1>{{ info.nombre }}</h1>
            <h2>creador: {{ info.creador }}</h2>
            <p>{{ info.descripcion }}</p>
        </div>
        <h2>Participantes</h2>
        <div class="container">
            <div class="card" v-for="(participante, index) in participantes" :key="index">
                <div>
                    <h3>
                        {{ participante.username }}
                    </h3>
                    <h4>
                        {{ participante.email }}
                    </h4>
                    <h4>
                        {{ participante.riesgo }}
                    </h4>
                </div>
                <div class="container-botones">
                    <button class="btn boton-alerta"
                        @click="openModal(participante.username, participante.riesgo, index)">Alertar</button>
                    <button class="btn boton-expulsar" @click="expulsarParticipante(index)">Expulsar</button>
                    <!-- Implementar logica para banear -->
                    <button class="btn boton-ban" @click="">Banear</button>
                </div>
            </div>
            <div v-if="showModal" class="modal">
                <div class="modal-content">
                    <h2>Notificar al Estudiante {{ nombreParticipanteActual }}</h2>
                    <div class="container-cbox">
                        <label>
                            <input type="checkbox" id="cboxalerta" v-model="showAlerta"> Incluir Alerta
                        </label>
                        <span v-if="showAlerta">Se mostrará al estudiante su estado: {{ estadoParticipanteActual
                            }}</span>
                        <label>
                            <input type="checkbox" id="cboxmensaje" v-model="showMensaje"> Incluir Mensaje
                        </label>
                        <textarea v-if="showMensaje" id="mensaje" class="textarea" placeholder="Ingrese aquí su mensaje"
                            v-model="mensaje"></textarea>
                    </div>
                    <div class="container-botones2">
                        <button class="btn"
                            @click="notificarParticipante(idParticipanteActual, showAlerta, estadoParticipanteActual, showMensaje, mensaje)">Enviar</button>
                        <button class="btn" @click="closeModal()">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Implementé esto y despues me di cuenta que no era parte de mi tarea xd -->
        <!-- <h2>Lista de baneados de la sesion</h2>
        <div class="container">
            <div class="card" v-for="(baneado, index) in banlist" :key="index">
                <h3>
                    {{ baneado.username }}
                </h3>
                <h4>
                    {{ baneado.email }}
                </h4>
            </div>
        </div> -->

    </div>
</template>

<script>
//necesitamos traer los datos de la sesión desde la bd

import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
    props: ['id'],
    setup(props) {

        let info = ref({})
        let finish = ref({
            tried: false,
            success: false
        })
        let participantes = ref([])
        let banlist = ref([])

        let showModal = ref(false)
        let showAlerta = ref(false)
        let showMensaje = ref(false)
        let mensaje = ref('')

        let nombreParticipanteActual = ref('')
        let estadoParticipanteActual = ref('')
        let idParticipanteActual = ref('')

        const openModal = (nombre, estado, id) => {
            showModal.value = true
            nombreParticipanteActual.value = nombre
            estadoParticipanteActual.value = estado
            idParticipanteActual.value = id
        }

        const closeModal = () => {
            showModal.value = false
            nombreParticipanteActual.value = ref('')
            estadoParticipanteActual.value = ref('')
            idParticipanteActual.value = ref('')
        }

        const cargarSesion = async () => {
            console.log(props.id)
            try {
                const respuesta = await fetch('http://localhost:8080/sesion/' + props.id);

                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    info.value = datos
                    console.log('Datos recibidos:', info.value);
                    finish.value.tried = true
                    finish.value.success = true
                    getParticipantes(info.value.participantes)
                    // getBanlist(info.value.banlist)
                    //updateInfo(info.value.participantes, info.value.banlist)
                } else {
                    console.error('Error al obtener los datos:', respuesta.statusText);
                    finish.value.tried = true
                    finish.value.success = false
                }
            } catch (error) {
                console.error('Error en la petición fetch:', error);
            }
        };

        // const updateInfo = async (arrPartipantes, arrBaneados) => {
        //     getParticipantes(arrPartipantes)
        //     // getBanlist(arrBaneados)
        // }

        // const getBanlist = async (arr) => {
        //     let array = []
        //     for (let i = 0; i < arr.length; i++) {
        //         let id = arr[i]
        //         let respuesta = await fetch(`http://localhost:8080/user/${id}`)
        //         let res = await respuesta.json()
        //         array.push(res)
        //     }
        //     console.log(array)
        //     banlist.value = array
        // }


        const getParticipantes = async (arr) => {
            try {
                // Arreglo en el que se guardarán los alumnos participantes
                let alumnosParticipantes = []

                // Se recorre con un ciclo el arreglo de id's de los participantes
                for (let id of arr) {

                    // Se hace la petición para obtener los datos del alumno si es que existe el id
                    let respuesta = await fetch(`http://localhost:8080/user/${id}`)
                    let alumno = await respuesta.json()

                    // Se agrega el alumno al arreglo de alumnos participantes
                    alumnosParticipantes.push(alumno)
                }

                // Se guarda el arreglo de alumnos participantes a los participantes de la sesión
                console.log(alumnosParticipantes)
                participantes.value = alumnosParticipantes

            }
            catch (error) {
                console.error('Error en la petición fetch:', error);
            }
        }

        const expulsarParticipante = async (index) => {
            try {
                // Se quita al participante de la lista en el frontend
                participantes.value.splice(index, 1)

                // Se actualiza la lista de participantes en la base de datos
                let respuesta = await fetch(`http://localhost:8080/sesion/${info.value._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        participantes: participantes.value.map(participante => participante._id),
                    }),
                })

                if (!respuesta.ok) {
                    throw new Error('Error al actualizar la lista de participantes')
                }
            }
            catch (error) {
                console.error('Error al quitar al participante:', error)
            }
        }

        const notificarParticipante = async (index, includeAlerta, estado, includeMensaje, mensaje) => {
            if (includeAlerta) {
                alertarParticipante(index)
            }

        }

        const alertarParticipante = async (index) => {
            try {
                // Se obtiene el id del participante
                const idParticipante = participantes.value[index]._id;

                // Envía una alerta al participante
                let respuesta = await fetch(`http://localhost:8080/user/${idParticipante}/alerta`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mensaje: `Tu valor de riesgo actual es: ${participantes.value[index].riesgo}`,
                    }),
                })

                if (!respuesta.ok) {
                    throw new Error('Error al enviar la alerta al participante')
                }
            }
            catch (error) {
                console.error('Error al alertar al participante:', error)
            }
        }

        onMounted(cargarSesion)

        return {
            info,
            finish,
            participantes,
            expulsarParticipante,
            alertarParticipante,
            banlist,
            showModal,
            showAlerta,
            showMensaje,
            mensaje,
            nombreParticipanteActual,
            estadoParticipanteActual,
            idParticipanteActual,
            openModal,
            closeModal,
        }
    }
}
</script>


<style scoped>
.titlecontainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .3rem;
}

h1 {
    font-size: 3rem;
    font-weight: bolder;
}

p {
    text-align: center;
    font-size: 1.2rem;
}

h2 {
    font-weight: bold;
}

h3 {
    /* color: #08CCCC; */
    font-weight: bold;
}

.card {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 22rem;
    padding: 1rem;
    border-radius: 0.3rem;
    border: 1px solid;
    line-height: 1.5;
    border-radius: 0.3rem;
    box-shadow: 3px 3px 0 3px #222;
    overflow: hidden;

}

.card h4 {
    color: #2c2c2e;

}

.container-botones {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* gap: 8px; */
}

.container-botones2 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.btn {
    border: none;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: .8rem;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    width: 100%;
    max-width: 100px;
    background-color: #08cccc;
    transition: background-color 0.3s;
}

.boton-expulsar {
    color: black;
}

.boton-expulsar:hover {
    background-color: red;
}

.boton-alerta {
    color: black;
}

.boton-alerta:hover {
    background-color: yellow;
}

.boton-ban {
    color: white;
    background-color: rgb(117, 0, 0);
}

.boton-ban:hover {
    background-color: rgb(94, 1, 1);
}

.container {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    width: 90%;
}

.container2 {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
    padding: 1rem 1rem 4rem 1rem;
}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: white;
    margin: auto;
    padding: 20px;
    width: 80%;
    max-width: 600px;
    border-radius: 10px;
    text-align: center;
}

.container-cbox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 4px;
}

.textarea {
    field-sizing: content;
    outline: none;
    min-width: 100%;
    max-width: 100%;
    min-height: 80px;
    max-height: 120px;
    border-radius: 10px;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #08cccc;
}
</style>