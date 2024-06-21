<template>
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label>Nombre de usuario:</label>
          <input v-model="username" type="text" required />
        </div>
        <div class="form-group">
          <label>Correo electrónico:</label>
          <input v-model="email" type="email" required />
        </div>
        <div class="form-group">
          <label>Contraseña:</label>
          <input v-model="password" type="password" required />
        </div>
        <div class="form-actions">
          <button type="submit" class="submit-btn">Registrarse</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup(_, { emit }) {
      const username = ref('')
      const email = ref('')
      const password = ref('')
  
      const handleSubmit = () => {
        emit('register', username.value, email.value, password.value)
        clearForm()
      }
  
      const clearForm = () => {
        username.value = ''
        email.value = ''
        password.value = ''
      }
  
      return {
        username,
        email,
        password,
        handleSubmit
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    background-color: #b9b9b9;
    border: 1px solid #ffffff;
    border-radius: 5px;
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: black;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .form-actions {
    text-align: center;
  }
  
  .submit-btn {
    background-color: #3656bdcc;
    color: rgb(0, 0, 0);
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .submit-btn:hover {
    background-color: #3656bd;
  }
  </style>