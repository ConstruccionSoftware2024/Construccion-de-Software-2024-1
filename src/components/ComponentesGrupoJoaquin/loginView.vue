<template>
  <div class="loginContainer">
    <div :class="['loginForm', { login: isLogin, register: !isLogin }]">
      <h2>{{ isLogin ? 'Bienvenido Utalino' : 'Registro' }}</h2>
      <transition name="fade" mode="out-in">
        <form v-if="isLogin" key="login">
          <div class="inputGroup">
            <label for="email">Correo Electrónico</label>
            <div class="inputWrapper">
              <i class="fas fa-at"></i>
              <input type="email" id="email" v-model="email" placeholder="Ingresa tu email" required />
            </div>
          </div>
          <div class="inputGroup">
            <label for="password">Contraseña</label>
            <div class="inputWrapper">
              <i class="fas fa-lock"></i>
              <input :type="passwordFieldType" id="password" v-model="password" placeholder="Ingresa tu contraseña"
                required />
              <i :class="passwordToggleIcon" class="togglePassword" @click="togglePasswordVisibility"></i>
            </div>
          </div>
          <div class="options">
            <a href="#" class="forgotPassword" @click.prevent="showResetPassword">Olvidaste la contraseña?</a>
          </div>
          <button type="submit" class="loginButton" @click.prevent="login">Iniciar Sesión</button>
        </form>
        <form v-else-if="isResetPassword" class="" key="">
          <div class="">
            <div class="inputGroup">
              <div class="inputWrapper">
                <i class="fas fa-at"></i>
                <input type="email" id="email" v-model="email" placeholder="Ingresa tu email" required />
              </div>
            </div>
          </div>
          <button class="loginButton" @click="submitResetPassword">Enviar</button>
        </form> 
        <form v-else key="register">
          <div class="formGrid">
            <div class="inputGroup">
              <label for="email">Correo Electrónico</label>
              <div class="inputWrapper">
                <i class="fas fa-at"></i>
                <input type="email" id="email" v-model="email" placeholder="Ingresa tu email" required />
              </div>
            </div>
            <div class="inputGroup">
              <label for="username">Nombre de Usuario</label>
              <div class="inputWrapper">
                <i class="fas fa-user"></i>
                <input type="text" id="username" v-model="username" placeholder="Ingresa tu nombre de usuario"
                  required />
              </div>
            </div>
            <div class="inputGroup">
              <label for="firstName">Nombre</label>
              <div class="inputWrapper">
                <i class="fas fa-id-badge"></i>
                <input type="text" id="firstName" v-model="firstName" placeholder="Ingresa tu nombre" required />
              </div>
            </div>
            <div class="inputGroup">
              <label for="lastName">Apellido</label>
              <div class="inputWrapper">
                <i class="fas fa-id-badge"></i>
                <input type="text" id="lastName" v-model="lastName" placeholder="Ingresa tu apellido" required />
              </div>
            </div>
            <div class="inputGroup">
              <label for="secondLastName">Segundo Apellido</label>
              <div class="inputWrapper">
                <i class="fas fa-id-badge"></i>
                <input type="text" id="secondLastName" v-model="secondLastName"
                  placeholder="Ingresa tu segundo apellido" required />
              </div>
            </div>
            <div class="inputGroup">
              <label for="rut">RUT</label>
              <div class="inputWrapper">
                <i class="fas fa-lock"></i>
                <input type="text" id="rut" v-model="rut" placeholder="Ingresa tu RUT" required />
              </div>
            </div>
            <div class="inputGroup">
              <label for="matricula">Matricula</label>
              <div class="inputWrapper">
                <i class="fas fa-lock"></i>
                <input type="text" id="matricula" v-model="matricula" placeholder="Ingresa tu matricula" required />
              </div>
            </div>
            <div class="inputGroup">
              <label for="campus">Campus</label>
              <div class="inputWrapper">
                <i class="fas fa-university"></i>
                <input type="text" id="campus" v-model="campus" placeholder="Ingresa tu campus" required />
              </div>
            </div>
            <div class="inputGroup">
              <label for="major">Carrera</label>
              <div class="inputWrapper">
                <i class="fas fa-graduation-cap"></i>
                <input type="text" id="major" v-model="major" placeholder="Ingresa tu carrera" required />
              </div>
            </div>
            <div class="inputGroup">
              <label for="password">Contraseña</label>
              <div class="inputWrapper">
                <i class="fas fa-lock"></i>
                <input :type="passwordFieldType" id="password" v-model="password" placeholder="Ingresa tu contraseña"
                  required />
                <i :class="passwordToggleIcon" class="togglePassword" @click="togglePasswordVisibility"></i>
              </div>
            </div>
            <div class="inputGroup">
              <label for="confirmPassword">Confirmar Contraseña</label>
              <div class="inputWrapper">
                <i class="fas fa-lock"></i>
                <input :type="passwordFieldType" id="confirmPassword" v-model="confirmPassword"
                  placeholder="Confirma tu contraseña" required />
                <i :class="passwordToggleIcon" class="togglePassword" @click="togglePasswordVisibility"></i>
              </div>
            </div>
          </div>
          <button type="submit" class="loginButton" @click.prevent="register">Registrarse</button>
        </form>
      </transition>
      <div class="signUp">
        <span>{{ isLogin ? 'No tienes una cuenta? ' : 'Ya tienes una cuenta? ' }}</span>
        <a href="#" @click.prevent="toggleForm">{{ isLogin ? 'REGISTRARSE' : 'INICIAR SESIÓN' }}</a>
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
import { useUserStore } from '../../../back-end/src/store.js';

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
      rut: '',
      matricula: '',
      role: '',
      passwordVisible: false,
      isLogin: true,
      isResetPassword: false,
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
    validaRut(rutCompleto) {
      rutCompleto = rutCompleto.replace("‐","-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
          return false;
      let tmp = rutCompleto.split('-');
      let digv = tmp[1];
      let rut = tmp[0];
      if (digv == 'K') digv = 'k' ;

      return (this.dv(rut) == digv );
    },
    dv(T) {
      let M = 0, S = 1;
      for (; T; T = Math.floor(T / 10))
          S = (S + T % 10 * (9 - M++ % 6)) % 11;
      return S ? S - 1 : 'k';
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          email: this.email,
          password: this.password
        });

        if (response.data.success) {
          const userStore = useUserStore();
          userStore.setUser(response.data.user);  // Almacenar los datos del usuario
          console.log('user:', response.data.user);
          this.$router.push('/sesionesAlum'); // Cambiar '/modulosAlum' por la ruta de la página a la que se redirigirá al iniciar sesión
        } else {
          this.showError('Correo electrónico o contraseña incorrectos');
        }
      } catch (error) {
        console.error(error);
      }
    },
    showResetPassword() {
      this.isResetPassword = true;
      this.isLogin = false;
    },
    async submitResetPassword() {
      if (this.email) {
        try {
          const response = await axios.post('http://localhost:8080/resetPassword', { email: this.email });
          if (response.data.success) {
            alert('Revisa tu correo electrónico para las instrucciones de restablecimiento de contraseña.');
            this.showResetForm = false; // Opcional: Volver al inicio de sesión después de enviar el correo
          } else {
            this.showError('No se pudo enviar el correo de restablecimiento de contraseña.');
          }
        } catch (error) {
          console.error(error);
          this.showError('Error al intentar restablecer la contraseña.');
        }
      }
    },
    async register() {
      try {

        const checkEmailResponse = await axios.post('http://localhost:8080/checkEmail', {
          email: this.email
        });
        if (!this.validaRut(this.rut)) {
          this.showError('El RUT no es válido.');
          return;
        }
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
          rut: this.rut,
          matricula: this.matricula,
          role: 'Estudiante',
          campus: this.campus,
          major: this.major,
        });
        if (response.data.success) {
          const userStore = useUserStore();
          userStore.setUser(response.data.user);
          this.email = '';
          this.username = '';
          this.password = '';
          this.confirmPassword = '';
          this.firstName = '';
          this.lastName = '';
          this.secondLastName = '';
          this.rut = '';
          this.matricula = '';
          this.campus = '';
          this.major = '';
          this.$router.push('/about');
        }
        this.showError('Revise su correo ingresado para confirmar el registro.');
      } catch (error) {
        console.error('error in register function:', error);
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible
    },
    toggleForm() {
      this.isLogin = !this.isLogin
      this.isResetPassword = false
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.recovery{
  width: 400px;
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
  min-height: 90vh;
  padding-top: 20px;
  padding-bottom: 50px;
}


.loginForm {
  background-color: var(--container-background-color);
  padding: 2rem;
  border-radius: 15px;
  border-top: 200px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: all 0.3s ease;
}

.loginForm.login {
  width: 400px;
}

.loginForm.register {
  width: 700px;
}

input[type='password']::-ms-reveal,
input[type='password']::-ms-clear {
  display: none;
}

h2 {
  color: var(--text-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.inputGroup {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: var(--text-color);
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
  color: var(--text-color);
}

input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2rem;
  border: none;
  border-radius: 5px;
  background-color: var(--input-background-color);
  color: var(--text-color);
  margin-left: auto;
  margin-right: auto;
  display: block;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--button-background-color);
}

.togglePassword {
  right: 10px;
  cursor: pointer;
  color: var(--text-color);
  position: absolute;
}

.options {
  text-align: right;
  margin-bottom: 1.5rem;
}

.forgotPassword {
  color: var(--button-background-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgotPassword:hover {
  color: var(--button-hover-background-color);
  text-decoration: underline;
}

.loginButton {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: var(--button-background-color);
  color: var(--text-color);
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.loginButton:hover {
  background-color: var(--button-hover-background-color);
}

.signUp {
  margin-top: 1.5rem;
  color: var(--text-color);
}

.signUp span {
  color: var(--text-color);
}

.signUp a {
  color: var(--button-background-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.signUp a:hover {
  color: var(--button-hover-background-color);
  text-decoration: underline;
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

@media (max-width: 768px) {
  .loginForm.login {
    width: 90%;
  }

  .loginForm.register {
    width: 90%;
  }

  .formGrid {
    grid-template-columns: 1fr;
  }
}
</style>
