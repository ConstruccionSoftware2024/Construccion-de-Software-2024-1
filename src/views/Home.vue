<template>
  <div class="Home flex-1">
    <div class="title">Bienvenido a tu aplicación de monitoreo</div>
    <div class="content">
      <div class="card-container bg-navbar">
        <p>¡Hola nuevo usuario!</p>
        <p>Estamos encantados de tenerte con nosotros. En esta aplicación de monitoreo podrás:</p>
        <ul>
          <li>Seguir el rendimiento de tus sistemas.</li>
          <li>Visualizar datos en tiempo real.</li>
          <li>Recibir notificaciones importantes.</li>
          <li>Y mucho más.</li>
        </ul>
        <p>¡Explora todas las funcionalidades y no dudes en contactarnos si necesitas ayuda!</p>
      </div>
    </div>
  </div>
</template>

<style>
.Home {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* Esto hace que el contenedor ocupe el 100% de la altura de la ventana */
}

.title {
  margin-bottom: 20px;
}

.card-container {
  border: 1px solid #000000;
  padding: 15px;
  margin: 10px 0;
  width: 100%;
  max-width: 400px;
  text-align: left;
}
</style>
