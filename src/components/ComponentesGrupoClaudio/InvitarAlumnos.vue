<template>
    <div class="container">
        <h1>Crear link de invitacion</h1>
        <p>Comparte este link con tus alumnos para invitarlos a la sesion</p>
        <button @click="generateLink">Generar link</button>
        <p class="link" v-if="linkGenerated">{{ link }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const link = ref('');
const linkGenerated = ref(false);

const generateLink = () => {
    link.value = "http://localhost:8080/invitar/" + uuidv4();
    linkGenerated.value = true;
}

</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
}

.link{
    margin-top: 20px;
    border: 1px solid #9a9a9a;
    padding: 10px;
    border-radius: 10px;
}

button{
    margin: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

</style>