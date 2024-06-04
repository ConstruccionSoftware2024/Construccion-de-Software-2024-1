<template>
  <div class="loginContainer">
    <div class="loginForm">
      <h2>{{ isLogin ? 'Bienvenido Utalino' : 'Registro' }}</h2>
      <transition name="fade" mode="out-in">
        <form v-if="isLogin" key="login">
          <div class="inputGroup">
            <label for="email">Correo Electrónico</label>
            <div class="inputWrapper">
              <i class="fas fa-at"></i>
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="Ingresa tu email"
                required
              />
            </div>
          </div>
          <div class="inputGroup">
            <label for="password">Contraseña</label>
            <div class="inputWrapper">
              <i class="fas fa-lock"></i>
              <input
                :type="passwordFieldType"
                id="password"
                v-model="password"
                placeholder="Ingresa tu contraseña"
                required
              />
              <i
                :class="passwordToggleIcon"
                class="togglePassword"
                @click="togglePasswordVisibility"
              ></i>
            </div>
          </div>
          <div class="options">
            <a href="#" class="forgotPassword">Olvidaste la contraseña?</a>
          </div>
          <button type="submit" class="loginButton" @click.prevent="login">Iniciar Sesión</button>
        </form>
        <form v-else key="register">
          <div class="formGrid">
            <div class="inputGroup">
              <label for="email">Correo Electrónico</label>
              <div class="inputWrapper">
                <i class="fas fa-at"></i>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  placeholder="Ingresa tu email"
                  required
                />
              </div>
            </div>
            <div class="inputGroup">
              <label for="username">Nombre de Usuario</label>
              <div class="inputWrapper">
                <i class="fas fa-user"></i>
                <input
                  type="text"
                  id="username"
                  v-model="username"
                  placeholder="Ingresa tu nombre de usuario"
                  required
                />
              </div>
            </div>
            <div class="inputGroup">
              <label for="firstName">Nombre</label>
              <div class="inputWrapper">
                <i class="fas fa-id-badge"></i>
                <input
                  type="text"
                  id="firstName"
                  v-model="firstName"
                  placeholder="Ingresa tu nombre"
                  required
                />
              </div>
            </div>
            <div class="inputGroup">
              <label for="lastName">Apellido</label>
              <div class="inputWrapper">
                <i class="fas fa-id-badge"></i>
                <input
                  type="text"
                  id="lastName"
                  v-model="lastName"
                  placeholder="Ingresa tu apellido"
                  required
                />
              </div>
            </div>
            <div class="inputGroup">
              <label for="secondLastName">Segundo Apellido</label>
              <div class="inputWrapper">
                <i class="fas fa-id-badge"></i>
                <input
                  type="text"
                  id="secondLastName"
                  v-model="secondLastName"
                  placeholder="Ingresa tu segundo apellido"
                  required
                />
              </div>
            </div>
            <div class="inputGroup">
              <label for="campus">Campus</label>
              <div class="inputWrapper">
                <i class="fas fa-university"></i>
                <input
                  type="text"
                  id="campus"
                  v-model="campus"
                  placeholder="Ingresa tu campus"
                  required
                />
              </div>
            </div>
            <div class="inputGroup">
              <label for="major">Carrera</label>
              <div class="inputWrapper">
                <i class="fas fa-graduation-cap"></i>
                <input
                  type="text"
                  id="major"
                  v-model="major"
                  placeholder="Ingresa tu carrera"
                  required
                />
              </div>
            </div>
            <div class="inputGroup">
              <label for="password">Contraseña</label>
              <div class="inputWrapper">
                <i class="fas fa-lock"></i>
                <input
                  :type="passwordFieldType"
                  id="password"
                  v-model="password"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <i
                  :class="passwordToggleIcon"
                  class="togglePassword"
                  @click="togglePasswordVisibility"
                ></i>
              </div>
            </div>
            <div class="inputGroup">
              <label for="confirmPassword">Confirmar Contraseña</label>
              <div class="inputWrapper">
                <i class="fas fa-lock"></i>
                <input
                  :type="passwordFieldType"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  placeholder="Confirma tu contraseña"
                  required
                />
                <i
                  :class="passwordToggleIcon"
                  class="togglePassword"
                  @click="togglePasswordVisibility"
                ></i>
              </div>
            </div>
          </div>
          <button type="submit" class="loginButton" @click.prevent="register">Registrarse</button>
        </form>
      </transition>
      <div class="signUp">
        <span>{{ isLogin ? 'No tienes una cuenta?' : 'Ya tienes una cuenta?' }}</span>
        <a href="#" @click.prevent="toggleForm">{{
          isLogin ? ' REGISTRARSE' : ' INICIAR SESIÓN'
        }}</a>
      </div>
    <div v-if="showPopup" class="error-popup">
      <div class="error-popup-content">
        {{ errorMessage }}
        <button @click="showPopup = false">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      firstName: '',
      lastName: '',
      secondLastName: '',
      campus: '',
      major: '',
      passwordVisible: false,
      isLogin: true,
      showPopup: false,
      errorMessage: ''
    }
  },
  computed: {
    passwordFieldType() {
      return this.passwordVisible ? 'text' : 'password'
    },
    passwordToggleIcon() {
      return this.passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'
    }
  },
  methods: {
    showError(message) {
      this.errorMessage = message;
      this.showPopup = true;
    },
    validateEmail() {
      const regex = /(^[a-zA-Z0-9_.+-]+@(alumnos\.)?utalca\.cl$)/;
      return regex.test(this.email);
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          email: this.email,
          password: this.password
        });

        if (response.data.success) {

          this.$router.push('/about'); //Cambiar '/about' por la ruta de la página a la que se redirigirá al iniciar sesión
        } else {
          this.showError('Correo electrónico o contraseña incorrectos');
        }
      } catch (error) {
        console.error(error);
      }
    },
    async register() {
    try {
      // Verificar si el correo electrónico ya existe
      const checkEmailResponse = await axios.post('http://localhost:8080/checkEmail', {
        email: this.email
      });

      if (checkEmailResponse.data.exists) {
        this.showError('El correo electrónico ya está en uso. Por favor, use un correo electrónico diferente.');
        return;
      }
      if (!this.validateEmail()) {
        this.showError('El correo electrónico debe ser un correo institucional de la UTalca.');
        return;
      }
      const response = await axios.post('http://localhost:8080/register', {
        email: this.email,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
        firstName: this.firstName,
        lastName: this.lastName,
        secondLastName: this.secondLastName,
        campus: this.campus,
        major: this.major
      });
      if (response.data.success) {
        this.email = '';
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
        this.firstName = '';
        this.lastName = '';
        this.secondLastName = '';
        this.campus = '';
        this.major = '';
      }
    } catch (error) {
      console.error('error in register function:', error);
    }
  },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible
    },
    toggleForm() {
      this.isLogin = !this.isLogin
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.error-popup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.error-popup-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2c2c2e;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  font-size: 16px;
}

.error-popup button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #08cccc;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}

.loginContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1c1c1c;
}

.loginForm {
  background-color: #2c2c2e;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 700px;
  transition: all 0.3s ease;
}

input[type='password']::-ms-reveal,
input[type='password']::-ms-clear {
  display: none;
}

h2 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.inputGroup {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: #ccc;
  margin-bottom: 0.5rem;
}

.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.inputWrapper i {
  position: absolute;
  margin-left: 0.5rem;
  color: #ccc;
}

input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2rem;
  border: none;
  border-radius: 5px;
  background-color: #3a3a3c;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #08cccc;
}

.togglePassword {
  right: 10px;
  cursor: pointer;
  color: #ccc;
  position: absolute;
}

.options {
  text-align: right;
  margin-bottom: 1.5rem;
}

.forgotPassword {
  color: #08cccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgotPassword:hover {
  color: #06bfbf;
  text-decoration: underline;
}

.loginButton {
  width: calc(100% - 1rem);
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #08cccc;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.loginButton:hover {
  background-color: #06bfbf;
}

.signUp {
  margin-top: 1.5rem;
  color: #ccc;
}

.signUp span {
  color: #ccc;
}

.signUp a {
  color: #08cccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.signUp a:hover {
  color: #06bfbf;
  text-decoration: underline;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.formGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>
