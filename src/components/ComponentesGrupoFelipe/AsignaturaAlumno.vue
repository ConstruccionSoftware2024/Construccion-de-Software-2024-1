<template>
    <div class="container">

        <div class="seccion1">

            <div class="containerTitle">
                <h2 class="title">Asignatura: {{ asignatura.nombre }}</h2>
                <p>Profesor: {{ asignatura.profesor }}</p>
                <hr>
            </div>

            <div class="sesiones">
                <h3 class="subtitulo">Listado de Sesiones</h3>
                <p>Sesion 1</p>
                <p>Sesion 2</p>
                <p>Sesion 3</p>
            </div>

            <div class="recursos">
                <h3 class="subtitulo">Recursos de la Asignatura</h3>
                <ul>
                    <li><a href="#">PDF de Estudio</a></li>
                    <li><a href="#">Video de Clase</a></li>
                    <li><a href="#">Enlace Externo</a></li>
                </ul>
            </div>


            <div class="foro">
                <h3 class="subtitulo">Foro de Preguntas</h3>
                <p>Escribe tu pregunta aquí...</p>
                <button @click="publicarPregunta">Publicar Pregunta</button>
            </div>

            <div class="actividades">
                <h3 class="subtitulo">Actividades Recientes</h3>
                <ul>
                    <li>Entrega Tarea 1</li>
                    <li>Participación en Foro</li>
                    <li>Acceso a PDF de Estudio</li>
                </ul>
            </div>

        </div>

        <div class="seccion2">
            <div class="faltas">
                <h3 class="subtitulo">Listado de Faltas</h3>
                <p>Resumen de Faltas: [Número de Faltas]</p>
                <button>Ver Detalles</button>
            </div>

            <div class="fechas">
                <h3 class="subtitulo">Tareas y Exámenes</h3>
                <p>Próxima Tarea: [Fecha]</p>
                <p>Próximo Examen: [Fecha]</p>
                <button>Ver Calendario</button>
            </div>


            <div class="acciones">
                <h3 class="subtitulo">Acciones Rápidas</h3>
                <button>Contactar al Profesor</button>
                <button>Reportar un Problema</button>
            </div>

            <div class="participantes">
                <h3 class="subtitulo">Participantes</h3>
                <div class="team-members">
                    <img v-for="member in asignatura.members" :key="member" :src="member" alt="Team member"
                        class="team-member">
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const asignatura = ref({
    nombre: 'Arquitectura de Software',
    profesor: 'Profesor Ejemplo',
    proximaTarea: '10/10/2021',
    proximoExamen: '15/10/2021',
    subjectName: 'Matemáticas',
    members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24', 'https://via.placeholder.com/24']
});

const faltas = ref([
    { fecha: '01/10/2021', motivo: 'Falta sin justificar' },
    { fecha: '03/10/2021', motivo: 'Retraso en la entrega de tarea' },
    { fecha: '05/10/2021', motivo: 'Falta sin justificar' },
    { fecha: '07/10/2021', motivo: 'Falta sin justificar' },
    { fecha: '09/10/2021', motivo: 'Falta sin justificar' }
]);

const publicarPregunta = () => {
    alert('Pregunta Publicada');
};

const verDetallesFaltas = () => {
    alert('Detalles de las Faltas');
};

const verCalendario = () => {
    alert('Calendario de Tareas y Exámenes');
};

const contactarProfesor = () => {
    alert('Contactar al Profesor');
};

const reportarProblema = () => {
    alert('Reportar un Problema');
};


</script>

<style scoped>
.container {
    margin: 40px 10%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

.containerTitle {
    margin-bottom: 20px;
}

.title {
    font-size: 24px;
    margin: 0;
    font-weight: bold;
}

.seccion1 {
    padding: 20px;
    width: 75%;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.seccion2 {
    padding: 20px;
    width: 20%;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.sesiones,
.recursos,
.foro,
.actividades,
.faltas,
.fechas,
.acciones {
    margin-bottom: 20px;
}

.subtitulo {
    font-size: 20px;
    margin: 0;
    font-weight: bold;
}

button {
    padding: 10px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: #08cccc;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.sesiones {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
}

.recursos {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
}

.foro {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
}

.actividades {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
}

.team-members {
    margin-top: 10px;
    display: flex;
}

.team-member {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 5px;
}
</style>