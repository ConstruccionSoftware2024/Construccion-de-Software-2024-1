<template>
  <section class="hero-section">
    <div class="hero-content">
      <span class="subtitle">Evita las copias en las evaluaciones</span>
      <div class="hero-text">
        <h1 id="title">Cheat Detector</h1>
      </div>
      <p class="description">Tu plataforma confiable para monitorear alumnos</p>
      <router-link to="/login" class="button">
        <span>Comenzar</span>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  z-index: 2;
}

.description {
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 1em;
}

.hero-text {
  font-weight: bold;
}

.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url("../../assets/images/prueba.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: var(--text-color-dark);
  height: 92.7vh;
  width: 100%;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.84);
  z-index: 0;
  height: 100vh;
  width: 100%;
}

.hero-content {
  position: relative;
  top: -10%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  height: 100vh;
  width: 100%;
  margin-right: 55em;
  margin-top: 5em;
}

.subtitle {
  font-size: 1.8rem;
  margin-top: 1rem;
  margin-bottom: 2em;
}

.hero-text>span {
  font-size: 4rem;
  line-height: 1.2;
}

#title {
  font-size: 6rem;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 0;
  font-weight: bold;
}

p {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.button {
  margin-top: 2em;
  width: 150px;
  height: 60px;
  border: 3px solid var(--button-background-color-light);
  text-decoration: none;
  border-radius: 45px;
  transition: all 0.3s;
  cursor: pointer;
  background: white;
  display: flex;
  align-items: center;
  color: black;
  justify-content: center;
  font-size: 1.2em;
  font-weight: 550;
}

.button:hover {
  background: var(--button-background-color-light);
  color: white;
  font-size: 1.5em;
}

@media (max-width: 768px) {
  .hero-text>span {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }

  .hero-section {
    height: 100vh;
  }
}

@media (max-width: 480px) {
  .hero-text>span {
    font-size: 2rem;
  }

  .hero-section {
    height: 100vh;
  }

  .button {
    font-size: 14px;
    padding: 8px 15px;
  }
}
</style>
