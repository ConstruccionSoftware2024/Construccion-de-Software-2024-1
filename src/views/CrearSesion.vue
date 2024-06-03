<script>

import { ref, reactive, onMounted } from 'vue'

export default {

    setup() {
        const formulario = reactive({
            nombre: '',
            mensaje: ''
        })
        let info = ref({})
        let finish = ref({
            tried: false,
            success: false
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

        const cargarSesiones = async () => {
            console.log("cargando")
            try {
                const respuesta = await fetch('http://localhost:8080/sesion');

                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    info.value = datos
                    console.log('Datos recibidos:', info.value);
                    finish.value.tried = true
                    finish.value.success = true
                } else {
                    console.error('Error al obtener los datos:', respuesta.statusText);
                    finish.tried = true
                    finish.success = false
                }
            } catch (error) {
                console.error('Error en la petición fetch:', error);
            }
        };

        onMounted(cargarSesiones)

        return {
            formulario,
            enviarFormulario,
            info,
            finish
        };
    }


}

</script>


<template>
    <div class="container">

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

        <h2>Lista de sesiones </h2>
        <div v-if="finish">
            <div v-for="(sesion, index) in info" :key="index">
                <a :href="'/session/' + sesion._id" class="card">
                    <div>

                        <h2>
                            {{ sesion.nombre }}
                        </h2>
                        <p>
                            Id: {{ sesion._id }}
                        </p>
                    </div>
                    <p>
                        {{ sesion.descripcion }}
                    </p>
                </a>
            </div>
        </div>
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

.card {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    width: 20rem;
    padding: .2rem;
    justify-content: center;
    align-items: center;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid coral;
    border-radius: 1rem;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    width: f20rem;
    padding: 1rem;
    height: 20rem;
    margin: 0 auto;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

form>div {
    display: flex;
    flex-direction: column;
    padding: .5rem;
    width: 100%;
    gap: .5rem;
}

form>div>input {
    padding: .5rem;
}

form>button {
    padding: .5rem 1rem;
    width: 100%;
}
</style>
