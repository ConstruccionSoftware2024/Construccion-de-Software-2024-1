<template>
    <div>
      <!-- Barra de mensajes -->
      <div v-if="message === 'seguro'" class="w-full text-white bg-seguro fixed top-0 left-0">
        <div class="container flex items-center justify-between px-6 py-4 mx-auto">
          <div class="flex">
            <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z">
              </path>
            </svg>
            <p class="mx-3">No se ha detectado páginas sospechosas, puedes seguir.</p>
          </div>
        </div>
      </div>
  
      <div v-if="message === 'peligro'" class="w-full text-white bg-peligro fixed top-0 left-0">
        <div class="container flex items-center justify-between px-6 py-4 mx-auto">
          <div class="flex">
            <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z">
              </path>
            </svg>
            <p class="mx-3">Página sospechosa detectada, por favor cierre la página.</p>
          </div>
        </div>
      </div>
  
      <div v-if="message === 'baned'" class="w-full text-white bg-baned fixed top-0 left-0">
        <div class="container flex items-center justify-between px-6 py-4 mx-auto">
          <div class="flex">
            <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
              <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z">
              </path>
            </svg>
            <p class="mx-3">Página baneada detectada, cierre de inmediato o no podrá seguir con el examen.</p>
          </div>
        </div>
      </div>
  

      <div class="flex items-center justify-center min-h-screen">
      <div class="space-y-4">
        <button @click="changeMessage('seguro')" class="btn-class-name">
          <span class="back"></span>
          <span class="front">1</span>
        </button>
        <button @click="changeMessage('peligro')" class="btn-class-name">
          <span class="back"></span>
          <span class="front">2</span>
        </button>
        <button @click="changeMessage('baned')" class="btn-class-name">
          <span class="back"></span>
          <span class="front">3</span>
        </button>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const message = ref('seguro')
  
  const changeMessage = (newMessage) => {
    message.value = newMessage
  }
  </script>
  
  <style scoped>
  .btn-class-name {
    --primary: 255, 90, 120;
    --secondary: 150, 50, 60;
    width: 60px;
    height: 50px;
    border: none;
    outline: none;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    outline: 10px solid rgba(var(--primary), 0.5);
    border-radius: 100%;
    position: relative;
    transition: 0.3s;
  }
  
  .btn-class-name .back {
    background: rgb(var(--secondary));
    border-radius: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  
  .btn-class-name .front {
    background: linear-gradient(0deg, rgba(var(--primary), 0.6) 20%, rgba(var(--primary)) 50%);
    box-shadow: 0 0.5em 1em -0.2em rgba(var(--secondary), 0.5);
    border-radius: 100%;
    position: absolute;
    border: 1px solid rgb(var(--secondary));
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: inherit;
    transform: translateY(-15%);
    transition: 0.15s;
    color: rgb(var(--secondary));
  }
  
  .btn-class-name:active .front {
    transform: translateY(0%);
    box-shadow: 0 0;
  }

  </style>