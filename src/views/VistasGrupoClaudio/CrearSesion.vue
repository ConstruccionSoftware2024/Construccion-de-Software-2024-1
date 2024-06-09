<script>

import { ref, reactive, onMounted } from 'vue'
import InvitarAlumnos from '@/components/ComponentesGrupoClaudio/InvitarAlumnos.vue';

export default {

    components: {
        InvitarAlumnos
    },

    setup() {
        const formulario = reactive({
            nombre: '',
            descripcion: ''
        })
        let info = ref({})
        let finish = ref({
            tried: false,
            success: false
        })
        let enviado = ref(false)

        const enviarFormulario = async () => {

            console.log(formulario.nombre, formulario.descripcion)
            try {
                const respuesta = await fetch('http://localhost:8080/sesion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formulario)
                });

                if (respuesta.ok) {
                    //const datos = await respuesta.json();
                    console.log('Datos enviados y subidos');
                    //refrescamos los datos
                    enviado.value = true
                    cargarSesiones()
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
            finish,
            enviado
        };
    }


}

</script>


<template>
    <div class="container">

        <div class="formcont">
            <h1>Crear una nueva sesión de monitoreo </h1>
            <form @submit.prevent="enviarFormulario">
                <div>
                    <label for="nombre">Nombre de la sesión</label>
                    <input type="text" id="nombre" v-model="formulario.nombre">
                </div>
                <div>
                    <label for="mensaje">Descripción</label>
                    <textarea id="mensaje" v-model="formulario.descripcion"></textarea>
                </div>

                <button v-if="!enviado" class="btn" type="submit">Crear</button>
                <p>{{ enviado ? 'Sesión creada con exito' : '' }}</p>
            </form>
        </div>
        <h2>Lista de sesiones </h2>
        <div class="cont" v-if="finish">
            <div v-for="(sesion, index) in info" :key="index" class="session-container">
                <a :href="'/session/' + sesion._id" class="card">
                    <div>

                        <h2>
                            {{ sesion.nombre }}
                        </h2>
                        <!-- <p>
                            Id: {{ sesion._id }}
                        </p> -->
                    </div>
                    <p>
                        {{ sesion.descripcion }}
                    </p>
                </a>
                <InvitarAlumnos :datosSesion="sesion._id"/>
            </div>

        </div>

    </div>

</template>

<style scoped>
h1 {
    font-size: 2rem;
    font-weight: bolder;

}

@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}

.formcont {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 2rem auto;
}

.card {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 20rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    /* create a property to remove color to anchors*/
    border: 1px solid rgb(46, 46, 46);
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    color: #1C1C1C;
    text-decoration: none;
}

.card>div>h2 {
    text-align: center;
    font-weight: bold;
    color: #08CCCC;
}

.btn {
    background-color: #08CCCC;
    width: 95%;
    border-radius: 15px;
    transition: all .3s ease;
}

.btn:hover {
    cursor: pointer;
    background-color: #05a5a5;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid gray;
    border-radius: 1rem;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    width: 30rem;
    padding: 1rem;
    height: 20rem;
    margin: 0 auto;
    overflow: hidden;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
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

.cont {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    width: 95%;
    margin: auto auto;
    justify-content: center;
    padding: 1rem;

.session-container{
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border: 2px solid #08cccc;
}
</style>
