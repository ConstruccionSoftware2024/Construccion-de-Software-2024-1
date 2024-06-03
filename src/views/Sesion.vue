<template>
    <div class="container2" v-if="finish.tried">
        <div style="">
            <h1>{{ info.nombre }}</h1>
            <p>{{ info.descripcion }}</p>
        </div>
        <h2>Participantes</h2>
        <div class="container">
            <div class="card" v-for="(participante, index) in participantes" :key="index">
                <h2 style="color: coral;">
                    {{ participante.username }}
                </h2>
                <p>
                    {{ participante.email }}
                </p>
            </div>
        </div>
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


<style scoped>
.card {
    border: 1px solid black;
    width: 20rem;

    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

}

.container {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.container2 {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
}
</style>