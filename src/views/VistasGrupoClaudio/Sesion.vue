<template>
    <div class="container2" v-if="finish.tried">
        <div>
            <h1>{{ info.nombre }}</h1>
            <p>{{ info.descripcion }}</p>
        </div>
        <h2>Participantes</h2>
        <div class="container">
            <div class="card" v-for="(participante, index) in participantes" :key="index">
                <h3>
                    {{ participante.username }}
                </h3>
                <h4>
                    {{ participante.email }}
                </h4>
                <h4>
                    {{ participante.riesgo }}
                </h4>
                <div class="container-botones">
                    <button class="btn boton-alerta" @click="alertarParticipante(index)">Alertar</button>
                    <button class="btn boton-expulsar" @click="expulsarParticipante(index)">Expulsar</button>
                    <!-- Implementar logica para banear -->
                    <button class="btn boton-ban" @click="">Banear</button>
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
                    finish.tried = true
                    finish.success = false
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
            banlist
        }
    }
}
</script>


<style scoped>
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
    color: #08CCCC;
    font-weight: bold;
}

.card {
    display: flex;
    flex-direction: column;
    gap: .2rem;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    width: 20rem;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

}

.container-botones {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
}

.btn {
    border: none;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    transition: background-color 0.3s;
}

.boton-expulsar {
    background-color: #ccc;
    color: black;

}

.boton-expulsar:hover {
    background-color: red;
}

.boton-alerta {
    background-color: #ccc;
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
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.container2 {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
}
</style>