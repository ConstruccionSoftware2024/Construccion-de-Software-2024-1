<template>
  <div class="container">
    <h1 class="title">Crear Evaluación</h1>
    <div class="form-group">
      <label for="nombre">Nombre de la Evaluación:</label>
      <input v-model="nombre" id="nombre" type="text" placeholder="Ingrese el nombre" />
    </div>
    <div class="form-group">
      <label for="descripcion">Descripción:</label>
      <textarea v-model="descripcion" id="descripcion" placeholder="Ingrese la descripción"></textarea>
    </div>
    <div class="form-group">
      <label for="fechaApertura">Fecha de Apertura:</label>
      <input v-model="fechaApertura" id="fechaApertura" type="datetime-local" />
    </div>
    <div class="form-group">
      <label for="fechaCierre">Fecha de Cierre:</label>
      <input v-model="fechaCierre" id="fechaCierre" type="datetime-local" />
    </div>
    <div class="questions">
      <h2>Preguntas</h2>
      <div v-for="(pregunta, index) in preguntas" :key="index" class="pregunta">
        <div class="form-group">
          <label :for="'pregunta-' + index">Pregunta {{ index + 1 }}:</label>
          <div contenteditable="true" class="editor" @input="updatePregunta($event, index)">
          </div>
          <input type="file" :id="'image-input-pregunta-' + index" @change="uploadImage($event, index, 'pregunta')" />
          <div v-if="pregunta.imagen" class="image-preview">
            <img :src="pregunta.imagen" alt="Imagen de la pregunta">
          </div>
        </div>
        <div class="form-group opcion">
          <label>
            Opción A:
            <input class="correcta-radio" type="radio" :name="'correcta-' + index" :value="0"
              v-model="pregunta.correcta" />
          </label>
        </div>
        <div class="form-group opcion">
          <label>
            Opción B:
            <input class="correcta-radio" type="radio" :name="'correcta-' + index" :value="1"
              v-model="pregunta.correcta" />
          </label>
        </div>
        <div class="form-group opcion">
          <label>
            Opción C:
            <input class="correcta-radio" type="radio" :name="'correcta-' + index" :value="2"
              v-model="pregunta.correcta" />
          </label>
        </div>
        <div class="form-group opcion">
          <label>
            Opción D:
            <input class="correcta-radio" type="radio" :name="'correcta-' + index" :value="3"
              v-model="pregunta.correcta" />
          </label>
        </div>
      </div>
      <div class="button-container">
        <button class="btn-add" @click="agregarPregunta">Agregar Pregunta</button>
        <button class="btn-save" @click="guardarEvaluacion">Guardar Evaluación</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  setup() {
    const route = useRoute();
    const nombre = ref('');
    const descripcion = ref('');
    const fechaApertura = ref('');
    const fechaCierre = ref('');
    const preguntas = ref([
      {
        texto: '',
        opciones: ['', '', '', ''],
        correcta: null,
        imagen: ''
      }
    ]);

    const sesionId = route.params.sesionId;
    const storage = inject('storage');

    const agregarPregunta = () => {
      preguntas.value.push({
        texto: '',
        opciones: ['', '', '', ''],
        correcta: null,
        imagen: ''
      });
    };

    const updatePregunta = (event, index) => {
      preguntas.value[index].texto = event.target.innerText;
    };

    const uploadImage = (event, index, tipo) => {
      const file = event.target.files[0];
      const uniqueId = uuidv4();
      const storageReference = storageRef(storage, `images/${uniqueId}`);
      uploadBytes(storageReference, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          if (tipo === 'pregunta') {
            preguntas.value[index].imagen = url;
          }
        });
      }).catch(error => {
        console.error('Error al subir la imagen:', error);
      });
    };

    const guardarEvaluacion = async () => {
      const evaluacion = {
        nombre: nombre.value,
        descripcion: descripcion.value,
        fechaApertura: fechaApertura.value,
        fechaCierre: fechaCierre.value,
        preguntas: preguntas.value
      };

      // Imprimir la evaluación en la consola
      //console.log('Evaluación a enviar:', JSON.stringify(evaluacion, null, 2));

      try {
        const response = await axios.post('http://localhost:8080/guardarEvaluacion', { evaluacion, sesionId });
        if (response.data.success) {
          alert('Evaluación guardada exitosamente');
          // Limpiar el formulario después de guardar
          nombre.value = '';
          descripcion.value = '';
          fechaApertura.value = '';
          fechaCierre.value = '';
          preguntas.value = [
            {
              texto: '',
              opciones: ['', '', '', ''],
              correcta: null,
              imagen: ''
            }
          ];
        } else {
          alert('Error al guardar la evaluación');
        }
      } catch (error) {
        console.error('Error al guardar la evaluación:', error);
        alert('Error al guardar la evaluación');
      }
    };

    return {
      nombre,
      descripcion,
      fechaApertura,
      fechaCierre,
      preguntas,
      agregarPregunta,
      guardarEvaluacion,
      updatePregunta,
      uploadImage
    };
  }
};
</script>

<style scoped>
input {
  background-color: var(--input-background-color);
  color: var(--text-color)
}

.container {
  max-width: 800px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 20px;
  background: var(--container-background-color);
  color: var(--text-color);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: var(--text-color);
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--text-color);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  background-color: var(--input-background-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.form-group textarea {
  resize: vertical;
}

.editor {
  min-height: 100px;
  border: 1px solid var(--border-color);
  padding: 10px;
  border-radius: 4px;
  background: var(--input-background-color);
  resize: vertical;
}

.questions {
  margin-top: 20px;
}

.pregunta {
  margin-bottom: 20px;
  padding: 15px;
  background: var(--gray-text-color);
  border: 1px solid var(--grey-hover-color);
  border-radius: 4px;
}

.pregunta .form-group.opcion {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.pregunta .form-group.opcion label,
.pregunta .form-group label {
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
}

.correcta-radio {
  margin-left: 25px;
  transform: scale(1.5);
}

.editable-container {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.image-preview img {
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

input[type="file"] {
  margin-top: 10px;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-add,
.btn-save {
  display: inline-block;
  padding: 10px 20px;
  margin: 10px 5px;
  border: none;
  background-color: var(--button-background-color);
  color: var(--text-color);
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-add:hover,
.btn-save:hover {
  background-color: var(--button-hover-background-color);
}

.btn-add:active,
.btn-save:active {
  transform: scale(0.98);
}

.btn-add:focus,
.btn-save:focus {
  outline: none;
}
</style>
