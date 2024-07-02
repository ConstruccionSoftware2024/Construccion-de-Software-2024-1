<!--
  Instrucciones para usarlo:
  1. Incluye este componente en tu componente que vas a usar
  2. Controla el estado 'loading' desde el store (pinia) o componente para mostrar u ocultar el loader
  Ejemplo en vista de ListaAsignaturas.vue
-->

<template>
    <div v-if="loading" class="loader-overlay">
        <div class="loader-content">
            <svg class="logo" viewBox="0 0 100 100">
                <defs>
                    <clipPath id="clip-path">
                        <rect :width="progress" height="100" y="0" x="0"></rect>
                    </clipPath>
                </defs>
                <g clip-path="url(#clip-path)">
                    <image href="../../assets/logo.svg" width="100" height="100" />
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
import { useLoaderStore } from '../../../back-end/src/store.js';
import { computed, ref, onMounted } from 'vue';

export default {
    setup() {
        const loaderStore = useLoaderStore();
        const loading = computed(() => loaderStore.loading);
        const progress = ref(0);

        const simulateProgress = () => {
            if (progress.value < 100) {
                progress.value += 1;
                setTimeout(simulateProgress, 1);
            }
        };

        onMounted(() => {
            if (loading.value) {
                simulateProgress();
            }
        });

        return {
            loading,
            progress,
        };
    },
};
</script>

<style scoped>
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--loader-color);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.logo {
    width: 100px;
    height: 100px;
}
</style>