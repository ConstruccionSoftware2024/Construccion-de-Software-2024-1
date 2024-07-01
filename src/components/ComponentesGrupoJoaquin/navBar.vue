<template>
  <div>
    <nav class="navbar">
      <div class="container">
        <div class="navbarLeft">
          <img src="@/assets/logo.svg" alt="Logo" class="logo" />
          <span class="text">Cheat Detector</span>
        </div>
        <div class="navbarRight" :class="{ open: isOpen }">
          <RouterLink to="/" class="navLink" @click.native="closeMenu">Inicio</RouterLink>

          <template v-if="isAuthenticated && user && user.role === 'alumno'">
            <RouterLink to="/listaAsignaturas" class="navLink" @click.native="closeMenu">Asignaturas</RouterLink>
          </template>

          <template v-if="isAuthenticated && user && user.role === 'profesor'">
            <RouterLink to="/listaAsignaturas" class="navLink" @click.native="closeMenu">Asignaturas</RouterLink>
            <RouterLink to="/lista-alumnos" class="navLink" @click.native="closeMenu">Alumnos</RouterLink>
          </template>

          <RouterLink to="/about" class="navLink" @click.native="closeMenu">Nosotros</RouterLink>
          <RouterLink to="/contact" class="navLink" @click.native="closeMenu">Contacto</RouterLink>

          <template v-if="isAuthenticated && (user && user.role === 'alumno' || user.role === 'profesor')">
            <template v-if="isOpen">
              <RouterLink to="/notificaciones" class="navLink" @click.native="closeMenu">Notificaciones
              </RouterLink>
            </template>
            <template v-else>
              <Notificaciones />
            </template>
          </template>

          <template v-if="isAuthenticated">
            <div class="dropwdown-container">
              <button class="loginButtonLogged" @click="toggleDropwDown">
                <div class="sign"><i class="fa-solid fa-user" id="icon"></i></div>
              </button>
              <div v-if="showDropDown" class="dropDownMenu">
                <RouterLink to="/perfil" class="dropdownOption" @click="closeMenu"><font-awesome-icon
                    :icon="['fas', 'user']" class="dropDownIcon" /> Perfil</RouterLink>
                <RouterLink to="/settings" class="dropdownOption" @click="closeMenu"><font-awesome-icon
                    :icon="['fas', 'gear']" class="dropDownIcon" /> Configuración</RouterLink>
                <RouterLink to="/" class="dropdownOption" @click="logout"><font-awesome-icon
                    :icon="['fas', 'right-from-bracket']" class="dropDownIcon" /> Cerrar Sesión</RouterLink>
              </div>
            </div>
          </template>

          
          <template v-else>
            <button class="loginButton" @click="goLogin">
              <div class="sign"><i class="fa-solid fa-right-to-bracket" id="icon"></i></div>
              <div class="loginText">Login</div>
            </button>
          </template>
        </div>
        <label class="hamburger">
          <input type="checkbox" v-model="isOpen" @change="toggleMenu" />
          <svg viewBox="0 0 32 32">
            <path class="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22">
            </path>
            <path class="line" d="M7 16 27 16"></path>
          </svg>
        </label>
      </div>
    </nav>
    <main class="main-content">
      <slot></slot>
    </main>
    <div v-if="isOpen" class="mobileLoginButtonContainer">
      <button class="mobileLoginButton" @click="goProfile">{{ isAuthenticated ? 'Mi perfil' : 'Login' }}</button>
    </div>
  </div>
</template>


<script setup>
import Notificaciones from '../ComponentesGrupoClaudio/Notificaciones.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../back-end/src/store.js'

const router = useRouter()
const isOpen = ref(false)
const userStore = useUserStore()
const showDropDown = ref(false)

const isAuthenticated = computed(() => userStore.isAuthenticated)
const user = computed(() => userStore.user)

const goLogin = () => {
  router.push('/login')
  closeMenu()
}

const goProfile = () => {
  router.push('/perfil')
  closeMenu()
}

const toggleMenu = () => {
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}


const closeMenu = () => {
  isOpen.value = false
  document.body.style.overflow = 'auto'
  showDropDown.value = false
}

const toggleDropwDown = () => {
  showDropDown.value = !showDropDown.value
}

const logout = () => {
  userStore.logout()
  showDropDown.value = false
  router.push('/')
}

const closeDropDown = (event) => {
  if (!event.target.closest('.dropDownMenu') && !event.target.closest('.loginButtonLogged')) {
    showDropDown.value = false;
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropDown);
});

onUnmounted(() => {
  window.removeEventListener('click', closeDropDown);
});

</script>

<style scoped>
.dropDownIcon {
  margin-right: 0.2rem;
}

.dropDownMenu {
  position: absolute;
  top: 75%;
  background-color: var(--container-background-color);
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1000;
}

.logoutButton {
  color: white;
  background-color: #2c2c2e;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: start;
  align-items: start;
}

.logoutButton:hover {
  color: #08cccc;
  border-radius: 4px;
  transition: all 0.3s ease;
}


.navbar {
  position: fixed;
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
  align-items: center;
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

.dropdownOption {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.dropdownOption:hover {
  color: var(--button-hover-background-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.loginButton {
  position: relative;
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

.loginButtonLogged {
  position: relative;
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

.loginButtonActive {
  width: 100px;
  border-radius: 40px;
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

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 40px;
  height: 30px;
  cursor: pointer;
  position: relative;
  z-index: 1100;
}

.hamburger input {
  display: none;
}

.hamburger svg {
  height: 3em;
  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line {
  fill: none;
  stroke: white;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
  transition:
    stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line-top-bottom {
  stroke-dasharray: 12 63;
}

.hamburger input:checked+svg {
  transform: rotate(-45deg);
}

.hamburger input:checked+svg .line-top-bottom {
  stroke-dasharray: 20 300;
  stroke-dashoffset: -32.42;
}

.main-content {
  margin-top: 70px;
}

@media (max-width: 1024px) {
  .loginButtonLogged {
    display: none;
  }

  .navbarRight {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    background-color: #2c2c2e;
    align-items: flex-start;
    padding-top: 4rem;
    padding-left: 1rem;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition:
      max-height 0.3s ease-in-out,
      opacity 0.3s ease-in-out;
    z-index: 1000;
  }

  .navbarRight.open {
    max-height: 100%;
    opacity: 1;
  }

  .hamburger {
    display: flex;
  }

  .navLink {
    width: 100%;
    padding: 1.5rem;
    font-size: 1.5rem;
    text-align: left;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  .navbarRight.open .navLink {
    transform: translateX(0);
    opacity: 1;
  }

  .navLink {
    transform: translateX(-100%);
    opacity: 0;
  }

  .navLink:nth-child(1) {
    transition-delay: 0.1s;
  }

  .navLink:nth-child(2) {
    transition-delay: 0.2s;
  }

  .navLink:nth-child(3) {
    transition-delay: 0.3s;
  }

  .navLink:nth-child(4) {
    transition-delay: 0.4s;
  }

  .loginButton {
    display: none;
  }

  .mobileLoginButtonContainer {
    position: fixed;
    bottom: 2rem;
    left: 1rem;
    right: 1rem;
    text-align: center;
    z-index: 1001;
  }

  .mobileLoginButton {
    width: 100%;
    padding: 1rem;
    font-size: 1.5rem;
    background-color: #08cccc;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.3s ease,
      opacity 0.3s ease;
    transition-delay: 0.5s;
  }

  .mobileLoginButton:hover {
    background-color: #06b6b6;
  }

  .mobileLoginButton:active {
    transform: translateY(2px);
  }
}

@media (min-width: 1024px) {
  .mobileLoginButtonContainer {
    display: none;
  }
}
</style>
