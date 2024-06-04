<template>
    <div class="" v-if="finish.tried">
        <h1>{{ info.nombre }}</h1>
        <p>{{ info.descripcion }}</p>

        <div>
            <div class="border" v-for="(participante, index) in participantes" :key="index">
                <h2>
                    {{ participante.username }}
                </h2>
                <h3>
                    {{ participante.email }}
                </h3>
                <h3>
                    {{ participante.riesgo }}
                </h3>
                <div class="container-botones">
                    <button class="boton-expulsar" @click="expulsarParticipante(index)">Expulsar</button>
                    <button class="boton-alerta" @click="alertarParticipante(index)">Enviar Alerta</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//necesitamos traer los datos de la sesión desde la bd

import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
    setup() {

        let info = ref({})
        let finish = ref({
            tried: false,
            success: false
        })
        let participantes = ref([])


        const cargarSesion = async () => {
            console.log("cargando")
            try {
                const respuesta = await fetch('http://localhost:8080/sesion');

                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    info.value = datos[0]
                    console.log('Datos recibidos:', info.value);
                    finish.value.tried = true
                    finish.value.success = true
                    getParticipantes(info.value.participantes)
                } else {
                    console.error('Error al obtener los datos:', respuesta.statusText);
                    finish.tried = true
                    finish.success = false
                }
            } catch (error) {
                console.error('Error en la petición fetch:', error);
            }
        };

        /*
        const getParticipantes = async (arr) => {
            let array = []
            for (let i = 0; i < arr.length; i++) {
                let id = arr[i]
                let respuesta = await fetch(`http://localhost:8080/user/${id}`)
                let res = await respuesta.json()
                array.push(res)
            }
            console.log(array)
            participantes.value = array
        }
        */

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
                let respuesta = await fetch(`http://localhost:8080/sesion/${info.value.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        participantes: participantes.value.map(participante => participante.id),
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
                const idParticipante = participantes.value[index].id;

                // Envía una alerta al participante
                let respuesta = await fetch(`http://localhost:8080/user/${idParticipante}/alerta`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mensaje: `Tu valor de riesgo actual es ${participantes.value[index].riesgo}`,
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
            alertarParticipante
        }
    }
}
</script>


<style>
.border {
    border: 1px solid black;
}

.container-botones {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
}

.boton-expulsar {
    background-color: white;
    border: none;
    color: black;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    transition: background-color 0.3s;
}

.boton-expulsar:hover {
    background-color: red;
}

.boton-alerta {
    background-color: white;
    border: none;
    color: black;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    transition: background-color 0.3s;
}

.boton-alerta:hover {
    background-color: yellow;
}
</style>