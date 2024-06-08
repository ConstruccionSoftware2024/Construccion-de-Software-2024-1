<template>

    <div class="container">
        <div class="alumno-container">
            <div class="alumno-info">
                <img class="alumno-img" />
                <div class="alumno-text">
                    <h2>Nombre Apellido</h2>
                    <p>Ciudad, Pais</p>
                    <p>Carrera</p>
                </div>
            </div>
        </div>

        <div class="detalle-container">
            <h2 class="titulo"> Información General </h2>
            <div class="detalle-info">
                <p>Matrícula:</p>
                <p>Rut:</p>
                <p>Correo: </p>
                <p>Fecha de Nacimiento: </p>
                <p>Teléfono: </p>
                <p>Dirección: </p>
            </div>
            <button class="editar-perfil-btn">Editar Perfil</button>
        </div>
    </div>
</template>


<style scoped>
.container {
    display: flex;
    flex-direction: row;
    /* Alinea los elementos hijos horizontalmente */
    justify-content: center;
    /* Centra los elementos hijos horizontalmente */
    align-items: stretch;
    /* Estira los elementos hijos para que coincidan en altura */
    gap: 3rem;
    /* Opcional: Añade espacio entre los elementos hijos */
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 2rem;

}

.alumno-container,
.detalle-container {
    /* Asegura que ambos contenedores tengan la misma altura */
    flex-grow: 1;
}

.alumno-container {
    flex-basis: 25%;
    /* Establece el tamaño base del alumno-container a 1/4 del contenedor padre, considerando que queremos 1/3 del tamaño del otro contenedor en un contexto de 4 partes */
    background-color: #08cccc;
    border-radius: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    flex-direction: row;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    /* Agrega sombra */
    padding: 3rem;
}

.detalle-container {
    flex-basis: 75%;
    /* Establece el tamaño base del detalle-container a 3/4 del contenedor padre */
    display: flex;
    border-radius: 1rem;
    margin-top: 1rem;
    padding: 1rem;
    flex-direction: column;
    background-color: #08cccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    /* Agrega sombra */
}

.alumno-info {
    display: flex;
    flex-direction: column;
    /* Cambia de row a column */
    align-items: center;
    /* Centra los elementos hijos horizontalmente */
    gap: 1rem;
    width: 100%;
    /* Asegura que .alumno-info ocupe todo el ancho disponible */
}

.alumno-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 2px solid #000000;
    /* Agrega un borde de 2px sólido y de color gris */
}

.alumno-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-top: 2px solid #000;
    /* Línea separadora */
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
    font-size: 1.5rem;
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
    /* Establece un borde inferior */
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
    background-color: black; /* Color de fondo */
    color: white; /* Color del texto */
    padding: 10px 20px; /* Padding alrededor del texto */
    margin: 10px 0; /* Margen exterior */
    border: none; /* Sin borde */
    cursor: pointer; /* Cursor en forma de mano al pasar por encima */
    border-radius: 5px; /* Bordes redondeados */
    font-size: 1.2rem; /* Tamaño de la fuente */
}

.editar-perfil-btn:hover {
    background-color: #333333; /* Cambia el color de fondo al pasar por encima */
}

</style>