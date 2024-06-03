<script>

import { ref, reactive } from 'vue'

export default {

    setup() {
        const formulario = reactive({
            nombre: '',
            mensaje: ''
        })

        const enviarFormulario = async () => {


            console.log(formulario.nombre, formulario.mensaje)
            return
            try {
                const respuesta = await fetch('http://locahost:8080/probarcuandonosecaigalabd', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formulario)
                });

                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    console.log('Datos enviados:', datos);
                } else {
                    console.error('Error al enviar los datos:', respuesta.statusText);
                }
            } catch (error) {
                console.error('Error en la petición fetch:', error);
            }
        };

        return {
            formulario,
            enviarFormulario
        };
    }


}

</script>


<template>
    <div class="">
        <h1>Crear una nueva sesión de monitoreo </h1>
        <form @submit.prevent="enviarFormulario">
            <div>
                <label for="nombre">Nombre de la sesión:</label>
                <input type="text" id="nombre" v-model="formulario.nombre">
            </div>
            <div>
                <label for="mensaje">Descripción:</label>
                <textarea id="mensaje" v-model="formulario.mensaje"></textarea>
            </div>
            <button type="submit">Crear</button>
        </form>
    </div>

</template>

<style scoped>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
