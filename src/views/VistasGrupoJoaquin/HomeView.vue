<template>
  <div class="container">
    <div class="header">
      <div class="overlay"></div>
      <div class="content">
        <img src="@/assets/images/mainPage.svg" alt="mainPage" class="header-image" />
        <p class="subtitle">Garantiza la integridad y justicia en cada examen con nuestra tecnología avanzada.</p>
        <button class="action-button" @click="goToAbout">
          <span class="span-mother">
            <span>D</span>
            <span>e</span>
            <span>s</span>
            <span>c</span>
            <span>u</span>
            <span>b</span>
            <span>r</span>
            <span>e</span>
          </span>
          <span class="span-mother2">
            <span>D</span>
            <span>e</span>
            <span>s</span>
            <span>c</span>
            <span>u</span>
            <span>b</span>
            <span>r</span>
            <span>e</span>
          </span>
        </button>
      </div>
    </div>
    <div class="services">
      <h2 class="section-title">Nuestro Servicio</h2>
      <p class="section-subtitle">Ofrecemos la mejor tecnología para asegurar la integridad de las evaluaciones
        universitarias.</p>
      <div class="service-cards">
        <div class="service-card">
          <img src="@/assets/images/light.png" alt="Discussion for idea" class="service-icon" />
          <h3 class="service-title">Monitoreo en Tiempo Real</h3>
          <p class="service-description">Vigilancia constante durante los exámenes para garantizar la justicia.</p>
        </div>
        <div class="service-card">
          <img src="@/assets/images/stats.png" alt="Increase Discussion" class="service-icon" />
          <h3 class="service-title">Análisis de Comportamiento</h3>
          <p class="service-description">Analizamos el comportamiento de los estudiantes para detectar posibles fraudes.
          </p>
        </div>
        <div class="service-card">
          <img src="@/assets/images/magnifier.svg" alt="Idea & Research" class="service-icon" />
          <h3 class="service-title">Informes Detallados</h3>
          <p class="service-description">Proveemos informes detallados para la toma de decisiones.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToAbout() {
      this.$router.push('/about');
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background-color);
}

.header {
  position: relative;
  width: 100%;
  height: 95vh;
  background-image: url('@/assets/images/background.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--text-color);
  z-index: 2;
}

.header-image {
  width: auto;
  height: auto;
  max-width: 70%;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.5em;
  max-width: 600px;
  margin: 10px auto;
  color: #fff;
}

.action-button {
  margin-top: 20px;
  padding: 10px 20px;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  width: 140px;
  height: 43px;
  border: none;
  background-color: var(--button-background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
}

button .span-mother,
button .span-mother2 {
  display: flex;
  overflow: hidden;
  font-weight: bold;
}

button:hover .span-mother {
  position: absolute;
}

button:hover .span-mother span {
  transform: translateY(1.2em);
}

button .span-mother span:nth-child(1) {
  transition: 0.2s;
}

button .span-mother span:nth-child(2) {
  transition: 0.3s;
}

button .span-mother span:nth-child(3) {
  transition: 0.4s;
}

button .span-mother span:nth-child(4) {
  transition: 0.5s;
}

button .span-mother span:nth-child(5) {
  transition: 0.6s;
}

button .span-mother span:nth-child(6) {
  transition: 0.7s;
}

button .span-mother span:nth-child(7) {
  transition: 0.8s;
}

button .span-mother span:nth-child(8) {
  transition: 0.9s;
}

button .span-mother2 {
  display: flex;
  position: absolute;
  overflow: hidden;
}

button .span-mother2 span {
  transform: translateY(-1.2em);
}

button:hover .span-mother2 span {
  transform: translateY(0);
}

button .span-mother2 span {
  transition: 0.2s;
}

button .span-mother2 span:nth-child(2) {
  transition: 0.3s;
}

button .span-mother2 span:nth-child(3) {
  transition: 0.4s;
}

button .span-mother2 span:nth-child(4) {
  transition: 0.5s;
}

button .span-mother2 span:nth-child(5) {
  transition: 0.6s;
}

button .span-mother2 span:nth-child(6) {
  transition: 0.7s;
}

button .span-mother2 span:nth-child(7) {
  transition: 0.8s;
}

button .span-mother2 span:nth-child(8) {
  transition: 0.9s;
}

.services {
  text-align: center;
  color: var(--text-color);
  background-color: var(--background-color);
  padding: 50px 20px;
  width: 100%;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: var(--button-background-color);
  font-weight: bold;
  font-size: 3em;
  margin-bottom: 40px;
}

.section-subtitle {
  font-size: 1.2em;
  margin-bottom: 40px;
}

.service-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.service-card {
  background: var(--container-background-color);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  max-width: 300px;
  text-align: center;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
}

.service-icon {
  width: 60px;
  height: auto;
  margin-bottom: 10px;
}

.service-title {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.service-description {
  font-size: 1em;
}
</style>
