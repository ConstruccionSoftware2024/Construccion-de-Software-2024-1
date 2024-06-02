<template>
  <div>
    <router-link to="/lista-alumnos">
      <button>Ver lista de alumnos</button>
    </router-link>
    <router-link to="/historial">
      <button>Ver historial de alumnos</button>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>
