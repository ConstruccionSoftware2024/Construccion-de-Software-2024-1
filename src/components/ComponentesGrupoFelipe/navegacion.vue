<template>
    <div class="container">
        <h2>Grupo Claudio</h2>
        <RouterLink to="/AboutView" class="navLink">
            <button>
                AboutView
            </button>
        </RouterLink>
        <RouterLink to="/newsession" class="navLink">
            <button>
                CrearSesion
            </button>
        </RouterLink>
        <RouterLink to="/faltaAlumnos" class="navLink">
            <button>
                FaltaAlumnos
            </button>
        </RouterLink>
        <RouterLink to="/perfil" class="navLink">
            <button>
                Perfil
            </button>
        </RouterLink>
        <RouterLink to="/revisiones" class="navLink">
            <button>
                Revisiones
            </button>
        </RouterLink>
        <RouterLink to="/session/:id" class="navLink">
            <button>
                Sesion
            </button>
        </RouterLink>
    </div>

    <div class="container">
        <h2>Grupo Felipe</h2>
        <RouterLink to="/historialevaluaciones" class="navLink">
            <button>
                Historial de Evaluaciones
            </button>
        </RouterLink>
        <RouterLink to="/historial" class="navLink">
            <button>
                Historial alumno
            </button>
        </RouterLink>
        <RouterLink to="/alumnovista" class="navLink">
            <button>
                Vista Alumno
            </button>
        </RouterLink>
    </div>

    <div class="container">
        <h2>Grupo Joaquin</h2>
        <RouterLink to="/home" class="navLink">
            <button>
                Home
            </button>
        </RouterLink>
        <RouterLink to="/vistaProfesor" class="navLink">
            <button>
                Vista Profesor
            </button>
        </RouterLink>
        
    </div>

        
</template>

<script>
    export default {
    name: 'App',
    };
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 30px;
}

button {
  width: fit-content;
  min-width: 100px;
  height: 45px;
  padding: 8px;
  border-radius: 5px;
  border: 2.5px solid #E0E1E4;
  box-shadow: 0px 0px 20px -20px;
  cursor: pointer;
  background-color: white;
  transition: all 0.2s ease-in-out 0ms;
  user-select: none;
  font-family: 'Poppins', sans-serif;
}

button:hover {
  background-color: #F2F2F2;
  box-shadow: 0px 0px 20px -18px;
}

button:active {
  transform: scale(0.95);
}
</style>