<template>
    <button class="btn" @click="toggleModal()">Notificar</button>
    <div v-if="showModal" class="modal">
        <div class="modal-content">
            <h2>Notificar al Estudiante {{ alumno.firstName }} {{ alumno.lastName }}</h2>
            <div class="container-start">
                <div class="container-cbox">
                    <input type="checkbox" id="cboxalerta" v-model="showAlerta">
                    <label for="cboxalerta"> Incluir Alerta</label>
                </div>
                <span class="text" v-if="showAlerta">Se mostrará al estudiante su estado: {{ alumno.status }}</span>
                <div class="container-cbox">
                    <input type="checkbox" id="cboxmensaje" v-model="showMensaje">
                    <label for="cboxmensaje"> Incluir Mensaje</label>
                </div>
                <textarea v-if="showMensaje" id="mensaje" class="textarea" placeholder="Ingrese aquí su mensaje"
                    v-model="mensaje"></textarea>
            </div>
            <div class="container-botones">
                <button class="btn"
                    @click="notificar(showAlerta, showMensaje, mensaje, alumno._id, alumno.status)">Enviar</button>
                <button class="btn" @click="toggleModal()">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from '../../../back-end/src/store'

export default {
    props: {
        participante: Object,
        ocultado: Boolean,
        session: String
    },
    setup(props) {

        const userStore = useUserStore()
        const remitenteId = userStore.user._id

        let alumno = ref(props.participante)
        let sesion = ref(props.session)
        let showModal = ref(false)
        let showAlerta = ref(false)
        let showMensaje = ref(false)
        let mensaje = ref('')


        const toggleModal = () => {
            showModal.value = !showModal.value
        }


        const notificar = async (includeAlerta, includeMensaje, mensaje, destinatario, estado) => {
            if (includeAlerta && includeMensaje) {
                await enviarTodo(mensaje, destinatario, estado)
            }
            else if (includeAlerta) {
                await enviarAlerta(destinatario, estado)
            }
            else if (includeMensaje) {
                await enviarMensaje(mensaje, destinatario)
            }
            toggleModal()
        }

        const enviarTodo = async (mensaje, alumnoId, estado) => {
            try {
                let respuesta = await fetch('http://localhost:8080/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        destinatario: alumnoId,
                        mensaje: mensaje,
                        remitente: remitenteId,
                        visto: false,
                        alerta: estado,
                        sesion: sesion.value

                    }),
                })
                if (!respuesta.ok) {
                    throw new Error('Error al enviar el mensaje')
                }
            } catch (error) {
                console.error('Error al enviar el mensaje:', error)
            }
        }

        const enviarAlerta = async (alumnoId, estado) => {
            try {
                let respuesta = await fetch('http://localhost:8080/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        destinatario: alumnoId,
                        mensaje: '',
                        remitente: remitenteId,
                        visto: false,
                        alerta: estado,
                        sesion: sesion.value
                    }),
                })
                if (!respuesta.ok) {
                    throw new Error('Error al enviar el mensaje')
                }
            } catch (error) {
                console.error('Error al enviar el mensaje:', error)
            }
        }

        const enviarMensaje = async (mensaje, alumnoId) => {
            try {
                let respuesta = await fetch('http://localhost:8080/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        destinatario: alumnoId,
                        mensaje: mensaje,
                        remitente: remitenteId,
                        visto: false,
                        alerta: '',
                        sesion: sesion.value
                    }),
                })
                if (!respuesta.ok) {
                    throw new Error('Error al enviar el mensaje')
                }
            } catch (error) {
                console.error('Error al enviar el mensaje:', error)
            }
        }

        return {
            notificar,
            toggleModal,
            alumno,
            showModal,
            showAlerta,
            showMensaje,
            mensaje,
        }
    }
}
</script>

<style scoped>
h2 {
    font-weight: bold;
}

.text {
    margin-left: 3px;
    margin-bottom: 8px;
    font-size: 1rem;
}

.container-botones {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.btn {
    border: none;
    text-align: center;
    text-decoration: none;
    font-size: .9rem;
    margin: 5px 5px 5px 0;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    max-width: 100px;
    background-color: #08cccc;
    color: black;
    transition: background-color 0.3s ease;
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

.container-start {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 4px;
}

.container-cbox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
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