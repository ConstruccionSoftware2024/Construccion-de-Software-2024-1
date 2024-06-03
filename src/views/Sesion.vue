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

        onMounted(cargarSesion)

        return {
            info,
            finish,
            participantes
        }
    }
}
</script>


<style>
.border {
    border: 1px solid black;
}
</style>