<template>
    <div id="app">
        <Navbar />
        <div class="main-content">
            <RouterView />
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useThemeStore } from '../back-end/src/store.js'
import Navbar from './components/ComponentesGrupoJoaquin/navBar.vue'
import Footer from './components/ComponentesGrupoJoaquin/Footer.vue'
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router';

const themeStore = useThemeStore();
const themeClass = computed(() => (themeStore.isDarkMode ? 'dark-mode' : 'light-mode'))
const router = useRouter();

watch(themeClass, (newClass) => {
    document.body.className = newClass
})

// Cambiar tema
const toggleTheme = () => {
    themeStore.toggleDarkMode();
    localStorage.setItem('theme', themeStore.isDarkMode ? 'dark' : 'light');
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
        themeStore.isDarkMode = savedTheme === 'dark'
    }
    document.body.className = themeClass.value
})

// Registro de URLs visitadas internas
router.beforeEach((to, from, next) => {
    const currentUrl = to.fullPath;
    console.log('URL interna actual:', currentUrl);
    next();
});

// Registro de URLs visitadas externas
window.addEventListener('beforeunload', function (event) {
    const currentUrl = window.location.href;
    console.log('URL externa actual:', currentUrl);
});
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1;
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

footer {
    flex-shrink: 0;
}
</style>