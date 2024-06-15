<template>
    <section class="not-found">
        <div class="container">
        <div class="not-found-content">
            <h1 class="title">404</h1>
            <p class="subtitle">Página no encontrada</p>
            <router-link to="/" class="button">Volver al Inicio</router-link>
        </div>
        </div>
    </section>
</template>

<script setup>

</script>

<style scoped>
.not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10%;
    background-color: #f5f5f5;
}

.container {
    text-align: center;
}

.title {
    font-size: 100px;
    margin: 0;
    color: #08cccc;
}

.subtitle {
    font-size: 24px;
    margin: 0;
    color: #333;
}

.button {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #08cccc;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
}

.button:hover {
    background-color: #06b8b8;
}

</style>