<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbarLeft">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <span class="text">UTAL</span>
      </div>
      <div class="navbarRight">
        <RouterLink to="/" class="navLink">Home</RouterLink>
        <RouterLink to="/about" class="navLink">About</RouterLink>
        <RouterLink to="/contact" class="navLink">Contact</RouterLink>
        <RouterLink to="/settings" class="navLink">Settings</RouterLink>
        <Notificaciones />
        <button class="loginButton" @click="goLogin">
          <div class="sign"><i class="fa-solid fa-right-to-bracket" id="icon"></i></div>

          <div class="loginText">Login</div>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import Notificaciones from '../ComponentesGrupoClaudio/Notificaciones.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  position: flex;
  top: 0;
  width: 100%;
  background-color: #2c2c2e;
  color: white;
  padding: 1rem 2rem;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.navbarLeft {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.text {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbarRight {
  display: flex;
  gap: 1.5rem;
}

.navLink {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.navLink:hover {
  color: #08cccc;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.loginButton {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: #08cccc;
}

.sign {
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.loginText {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: #fff;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: 0.3s;
}

.loginButton:hover {
  width: 100px;
  border-radius: 40px;
  transition-duration: 0.3s;
}

.loginButton:hover .sign {
  width: 30%;
  transition-duration: 0.3s;
  padding-left: 20px;
}

.loginButton:hover .loginText {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 10px;
  color: #fff;
}

.loginButton:active {
  transform: translate(2px, 2px);
}

#icon {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 17px;
  height: 17px;
  line-height: 17px;
}
</style>
