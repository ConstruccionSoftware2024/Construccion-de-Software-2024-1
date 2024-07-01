<template>
  <div class="alumno-page">
    <div class="vista-evaluacion">
      <h1 class="titulo">{{ nombreEvaluacion }}</h1>
      <p class="titulo">{{descripcionEvaluacion}}</p>
    </div>
      <div class="listaEvaluaciones" >
        <div @change="guardarRespuesta(index, $event.target.value)" v-for="(ask, index) in preguntas" :key="ask.texto" class="evaluations box-shadow">
          <p>{{ index + 1 }}. {{ ask.texto }}</p>  
          <img :src="ask.imagen" alt="Imagen de pregunta" class="img-pregunta">   
          <div v-for="opcion in ask.opciones" :key="opcion" class="opcion">
            <input type="radio" :name="ask.texto" :value="opcion" :id="opcion">
            <label :for="opcion">{{ opcion }}</label>
          </div>
        </div>
        <button class="boton-centrado" @click="verificarRespuestas">Terminar evaluación</button>
      </div>
  </div>
  
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
        nombreEvaluacion: '',
        descripcionEvaluacion: '',
        fechaInicio: '',
        fechaTermino: '',
        preguntas: [],
        opciones: [],
        respuestas: [] // aqui se guardan las respuestas del alumno, falta el método para enviarlas a la BD
    };
  },
  mounted() {
    this.obtenerDatosEvaluacion();
  },
  methods: {
    guardarRespuesta(indicePregunta, respuestaUsuario) {
      const indiceExistente = this.respuestas.findIndex(respuesta => respuesta.indicePregunta === indicePregunta);
      if (indiceExistente !== -1) {
        this.respuestas[indiceExistente].respuesta = respuestaUsuario;
        console.log(this.respuestas);
      } else {
        this.respuestas.push({ indicePregunta, respuesta: respuestaUsuario });
        console.log(this.respuestas);
      }
    },
    verificarRespuestas() {
      const todasRespondidas = this.respuestas.length === this.preguntas.length;
      if (!todasRespondidas) {
        alert('Por favor, responde todas las preguntas antes de terminar la evaluación.');
      } else {

        console.log('Evaluación completada');
      }
    },
    async obtenerDatosEvaluacion() {
        const route = useRoute();
        const id = route.params.id;
        await axios.get(`http://localhost:8080/name/${id}`)
            .then(async response => {
                this.nombreEvaluacion = response.data.nombre;
                this.descripcionEvaluacion = response.data.descripcion;
                this.fechaInicio = response.data.fechaApertura;
                this.fechaTermino = response.data.fechaCierre;
                this.preguntas = response.data.preguntas;
                this.opciones = response.data.opciones;
            })
            .catch(error => {
                console.error(error);
            });
    },
  },
};
</script>

<style scoped>
.titulo{
    text-align: center;
    font-weight: bold;
    margin-top: 40px;
}

.evaluations {
    margin-bottom: 20px;
    margin-top: 20px;
    padding: 20px;
    background-color: var(--container-background-color);
    border-radius: 10px;
}

.box-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.listaEvaluaciones{
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
}

.alumno-page {
    padding: 2rem;
    margin: 20px auto;
    background-color: var(--background-color);
    color: var(--text-color);
    width: 80%;
    max-width: 1200px;
}

.img-pregunta {
  margin-bottom: 20px;
}

.opcion {
  margin-bottom: 10px;
}

.boton-centrado {
  display: block;
  margin: 0 auto;
}

button {
    padding: 10px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
}

button:hover {
    background-color: var(--button-hover-background-color);
}
</style>