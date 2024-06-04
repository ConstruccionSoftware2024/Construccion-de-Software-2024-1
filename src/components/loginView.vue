<template>
  <div class="loginContainer">
    <div :class="['loginForm', { login: isLogin, register: !isLogin }]">
      <h2>{{ isLogin ? 'Bienvenido Utalino' : 'Registro' }}</h2>
      <transition name="fade" mode="out-in">
        <form @submit.prevent="login" v-if="isLogin" key="login">
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
          <button type="submit" class="loginButton">Iniciar Sesión</button>
        </form>
        <form @submit.prevent="register" v-else key="register">
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
          <button type="submit" class="loginButton">Registrarse</button>
        </form>
      </transition>
      <div class="signUp">
        <span>{{ isLogin ? 'No tienes una cuenta? ' : 'Ya tienes una cuenta? ' }}</span>
        <a href="#" @click.prevent="toggleForm">{{ isLogin ? 'REGISTRARSE' : 'INICIAR SESIÓN' }}</a>
      </div>
    </div>
  </div>
</template>

<script>
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
      isLogin: true
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
    login() {
      // Lógica de inicio de sesión
      console.log('Correo Electrónico:', this.email)
      console.log('Contraseña:', this.password)
    },
    register() {
      // Lógica de registro
      console.log('Correo Electrónico:', this.email)
      console.log('Nombre de Usuario:', this.username)
      console.log('Nombre:', this.firstName)
      console.log('Apellido:', this.lastName)
      console.log('Segundo Apellido:', this.secondLastName)
      console.log('Campus:', this.campus)
      console.log('Carrera:', this.major)
      console.log('Contraseña:', this.password)
      console.log('Confirmar Contraseña:', this.confirmPassword)
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

.loginContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}

.loginForm {
  background-color: var(--container-background-color);
  padding: 2rem;
  border-radius: 15px;
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
