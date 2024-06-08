<template>
    <div class="container">
        <div class="alumno-container">
            <div class="alumno-info">
                <img class="alumno-img" :src="alumno.imagen"/>
                <div class="alumno-text">
                    <h2>{{ alumno.nombre }} {{ alumno.apellido }}</h2>
                    <p class="texto-carrera"> {{ alumno.carrera }} </p>
                    <p class="texto-ciudad">{{ alumno.ciudad }}, {{ alumno.pais }} </p>
                </div>
            </div>
        </div>

        <div class="detalle-container">
            <h2 class="titulo"> Información General </h2>
            <div class="detalle-info">
                <p><span class="atributo-nombre">Matrícula</span><span class="dospuntos">:</span> {{ alumno.matricula }}</p>
                <p><span class="atributo-nombre">Rut</span><span class="dospuntos">:</span> {{ alumno.rut }}</p>
                <p><span class="atributo-nombre">Correo</span><span class="dospuntos">:</span> {{ alumno.correo }}</p>
                <p><span class="atributo-nombre">Fecha de Nacimiento</span><span class="dospuntos">:</span> {{ alumno.fechaNacimiento }}</p>
                <p><span class="atributo-nombre">Teléfono</span><span class="dospuntos">:</span> {{ alumno.telefono }}</p>
                <p><span class="atributo-nombre">Dirección</span><span class="dospuntos">:</span> {{ alumno.direccion }}</p>
            </div>
            <button class="editar-perfil-btn">Editar Perfil</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Obtener datos de la DB

// Datos de prueba

const alumno = {
    nombre: 'Nombre',
    apellido: 'Apellido',
    ciudad: 'Curico',
    pais: 'Chile',
    carrera: 'Ingenieria Civil en Computación',
    matricula: '2000000',
    rut: '111111111-1',
    correo: 'hola@gmail.com',
    fechaNacimiento: '01 Enero 2000',
    telefono: 'Telefono',
    direccion: 'Direccion',
};



</script>


<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    gap: 3rem;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 2rem;

}

.alumno-container,
.detalle-container {
    flex-grow: 1;
}

.alumno-container {
    flex-basis: 25%;
    background-color: #08cccc;
    border-radius: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    flex-direction: row;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    padding: 3rem;
}

.detalle-container {
    flex-basis: 75%;
    display: flex;
    border-radius: 1rem;
    margin-top: 1rem;
    padding: 1rem;
    flex-direction: column;
    background-color: #08cccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.alumno-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.alumno-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 2px solid #000000;
}

.alumno-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-top: 2px solid #000;
    padding-top: 1rem;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.alumno-text>h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #000;
    font-weight: bold;
}

.alumno-text>p {
    margin: 0;
    color: #000;
    margin-top: 0.8rem;
}

.detalle-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    width: 100%;
    justify-content: center;
}

.detalle-info>p {
    margin: 0.5rem 0;
    font-size: 1.3rem;
    color: #000;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid grey;
}

.titulo {
    text-align: start;
    font-size: 1.8rem;
    color: #000;
    font-weight: bold;
    padding-left: 1rem;
    padding-bottom: 1.5rem;
}

.editar-perfil-btn {
    background-color: black;
    color: white;
    padding: 10px 20px;
    margin: 10px 0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1.2rem;
}

.editar-perfil-btn:hover {
    background-color: #333333;
}

.dospuntos {
    margin-right: 6px;
}

.atributo-nombre {
    font-weight: 600;
}

.texto-ciudad{
    font-size: 1.2rem;
    color: #000;
}

.texto-carrera{
    font-size: 1.2rem;
    color: #000;
    margin-top: 0.8rem;
}

</style>