<template>
    <div class="container">
        <h2>Copiar link de invitación</h2>
        <p>Comparte este link con tus alumnos para invitarlos a la sesión</p>
        <p class="link" v-if="linkGenerated">{{ link }} <font-awesome-icon class="icono-clipboard" :icon="['far', 'copy']" @click="copiarAlPortapapeles"/> </p>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';

const props = defineProps({
    datosSesion: String
});

const link = ref('');
const linkGenerated = ref(false);

const recuperarLinks = async () => {
    link.value = "http://localhost:5173/session/" + props.datosSesion;
    linkGenerated.value = true;
}

const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(link.value);
    Swal.fire({
            title: '¡Link copiado al portapapeles!',
            confirmButtonText: 'Cerrar',
            timer: 800,
        });
}

onMounted(recuperarLinks);

</script>

<style scoped>
.container{
    margin-top: 0.9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
}

.link{
    margin: 15px 5px;
    border: 1px solid #9a9a9a;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

h2{
    margin-top: 0.8rem;
}



.icono-clipboard{
    margin-left: 10px;
    cursor: pointer;
    font-size: 20px;
    padding: 5px;
    background-color: #08cccc;
    border-radius: 5px;
}

</style>