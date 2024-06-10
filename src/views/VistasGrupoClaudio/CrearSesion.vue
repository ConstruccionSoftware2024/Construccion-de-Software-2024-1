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

        <div class=" ar_form formcont">
            <h1>Crear una nueva sesión de monitoreo </h1>
            <form @submit.prevent="enviarFormulario">
                <div>
                    <!-- <label for="nombre">Nombre de la sesión</label> -->
                    <input placeholder="nombre sesion" type="text" id="nombre" v-model="formulario.nombre">
                    <!-- <label for="mensaje">Descripción</label> -->
                    <input placeholder="descripcion" type="text" id="mensaje" v-model="formulario.descripcion"></input>
                </div>

                <input type="submit" v-if="!enviado" class="btn" value="Crear sesion">
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
                <InvitarAlumnos :datosSesion="sesion._id" />
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
    width: 100%;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    /* border: 1px solid rgb(46, 46, 46); */
    /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
    color: #1C1C1C;
    text-decoration: none;
    transition: all .3s ease;
}

.card:hover {
    background-color: #efefef;
}

.card>div>h2 {
    text-align: center;
    font-weight: bold;
    color: #08CCCC;
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
    gap: 1rem;
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
    margin: 0 auto;
}


.cont {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    width: 95%;
    margin: auto auto;
    justify-content: center;
    padding: 1rem;
}

.session-container {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border: 2px solid #08cccc;
    border-radius: 1rem;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ar_form * {
    transition: .3s ease-in-out;
    box-sizing: border-box;
}

.ar_form form input {
    width: 90%;
    /* margin: .6em 0; */
    margin: 0 auto;
    padding: 10px 10px;
    border: 0;
    font-weight: 700;
    background-color: transparent;
    outline: none;
    border-color: #08CCCC;
    border-radius: 20px;
    /* margin-left: 50%; */
    /* transform: translateX(-50%); */
}

.ar_form form input[type="text"] {
    border: 2px solid gray;
    color: black;
}

/* #03273D; */
.ar_form form input[type="text"]:focus {
    border-color: #08CCCC;
    width: 100%
}

.ar_form form input[type="submit"] {
    background-color: #06a0a0;
    color: white;
    width: 70%;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.ar_form form input[type="submit"]:hover {
    width: 80%;
    background-color: #08CCCC;
}
</style>
