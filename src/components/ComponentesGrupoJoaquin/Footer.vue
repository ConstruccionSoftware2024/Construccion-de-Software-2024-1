<template>
  <footer class="footer">
    <div class="container">
      <div class="logo">
        <img src="../../assets/logo.svg" alt="Logo" />
        <h2>Cheat Detector</h2>
        <p>Transparencia Académica</p>
      </div>
      <p class="description">
        La herramienta esencial para garantizar la integridad académica en entornos virtuales,
        detectando cualquier intento de trampa y promoviendo así un ambiente de evaluación justo y
        honesto para todos los estudiantes.
      </p>
      <div class="contact-info">
        <div class="address">
          <p>Calle 123, Curicó, Chile 123</p>
          <p>Testing 123</p>
        </div>
        <div class="phone">
          <p>Teléfono: +56 9 1234 5678</p>
          <p>Fax: +56 9 1234 5678</p>
        </div>
      </div>
      <div class="social-media">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-linkedin-in"></i></a>
      </div>
      <div class="copyright">
        <p>©Powered by OnlyCars. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #2c2c2e;
  color: #fff;
  padding: 40px 0;
  text-align: center;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.logo img {
  width: 50px;
  margin-bottom: 10px;
}

.logo h2 {
  margin: 5px 0;
}

.logo p {
  font-size: 14px;
  color: #aaa;
}

.description {
  font-size: 14px;
  color: #aaa;
  margin: 20px 0;
}

.contact-info {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.contact-info div {
  text-align: left;
}

.contact-info p {
  margin: 5px 0;
}

.social-media {
  margin: 20px 0;
}

.social-media a {
  color: #fff;
  margin: 0 10px;
  font-size: 20px;
}

.social-media a:hover {
  color: #08cccc;
  transition: all 0.3s ease;
}

.copyright {
  margin-top: 20px;
  font-size: 14px;
  color: #aaa;
}

@media (max-width: 768px) {
  .contact-info {
    flex-direction: column;
    align-items: center;
  }

  .contact-info div {
    text-align: center;
  }

  .description {
    margin-bottom: 20px;
  }

  .address {
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .logo img {
    width: 40px;
  }

  .logo h2 {
    font-size: 18px;
  }

  .description {
    font-size: 12px;
  }

  .social-media a {
    font-size: 18px;
    margin: 0 5px;
  }
}
</style>
