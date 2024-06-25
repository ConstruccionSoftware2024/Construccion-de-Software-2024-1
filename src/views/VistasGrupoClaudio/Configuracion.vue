<template>
    <div class="container">
        <div class="container-botones">
            <button>Nueva Configuración</button>
            <button>Guardar Configuración</button>
        </div>
        <div class="container-tablas">
            <div class="container-configs">
                <table>
                    <thead>
                        <tr>
                            <th>Configuración</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="config in configs" :key="config._id">
                            <td>{{ config.nombre }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="container-paginas">
                <!-- Tabla para Verde -->
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Verde</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(fila, index) in tablaVerde" :key="'verde-' + index">
                                <td>{{ fila }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Tabla para Amarillo -->
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Amarillo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(fila, index) in tablaAmarillo" :key="'amarillo-' + index">
                                <td>{{ fila }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Tabla para Rojo -->
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Rojo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(fila, index) in tablaRojo" :key="'rojo-' + index">
                                <td>{{ fila }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
    setup() {
        const configs = ref([])

        const obtenerConfiguraciones = async () => {
            try {
                let respuesta = await fetch('http://localhost:8080/configs')
                let data = await respuesta.json()
                configs.value = data
            } catch (error) {
                console.error(error)
            }
        }

        const tablaVerde = computed(() => {
            return configs.value.flatMap(config => config.verde.map(item => item.pagina))
        })

        const tablaAmarillo = computed(() => {
            return configs.value.flatMap(config => config.amarillo.map(item => item.pagina))
        })

        const tablaRojo = computed(() => {
            return configs.value.flatMap(config => config.rojo.map(item => item.pagina))
        })

        onMounted(() => {
            obtenerConfiguraciones()
        })

        return {
            configs,
            tablaVerde,
            tablaAmarillo,
            tablaRojo
        }
    }
}
</script>

<style>
.container {
    margin-left: 70px;
    margin-right: 70px;
}

.container-botones {
    display: flex;
    justify-content: start;
    width: 100%;
    gap: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.container-botones button {
    border: none;
    text-align: center;
    text-decoration: none;
    font-size: .9rem;
    margin: 5px 5px 5px 0;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #08cccc;
    color: black;
    transition: background-color 0.3s ease;
    text-wrap: nowrap;
}

.container-botones button:hover {
    background-color: #06bfbf;
}

.container-tablas {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 10%;
    height: 450px;
    overflow-y: auto;
}

.container-configs {
    width: 30%;
    height: 100%;
    overflow-y: auto;
}

.container-paginas {
    display: flex;
    justify-content: space-between;
    width: 70%;
    height: 100%;
    gap: 10px;
    overflow-y: auto;
}

.container-paginas div {
    width: 30%;
    height: 100%;
    overflow-y: auto;
}

table {
    width: 100%;
    background-color: #eee;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-collapse: collapse;
    overflow: hidden;
}

th {
    background-color: #08cccc;
    color: black;
    font-weight: bold;
    padding: 8px;
    /* border: 1px solid black; */
}

td {
    text-align: center;
    padding: 8px;
    /* border: 1px solid black; */
}
</style>