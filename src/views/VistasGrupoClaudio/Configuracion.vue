<template>
    <div class="container">
        <div class="container-botones">
            <button>Nueva Configuración</button>
            <button>Guardar Configuración</button>
        </div>
        <div class="container-listas">
            <div class="container-configs">
                <span class="list-header">Configuraciones</span>
                <ul class="page-list">
                    <li v-for="config in configs" :key="config._id" class="page">
                        {{ config.nombre }}
                    </li>
                </ul>
            </div>
            <div class="container-paginas">
                <div class="page-manager">
                    <span class="list-header">Verde</span>
                    <span class="list-header">Amarillo</span>
                    <span class="list-header">Rojo</span>
                </div>
                <div class="page-manager">
                    <ul ref="parent1" class="page-list">
                        <li v-for="item in pages1" :key="item" class="page">{{ item }}</li>
                    </ul>
                    <ul ref="parent2" class="page-list">
                        <li v-for="item in pages2" :key="item" class="page">{{ item }}</li>
                    </ul>
                    <ul ref="parent3" class="page-list">
                        <li v-for="item in pages3" :key="item" class="page">{{ item }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import { multiDrag, selections } from "@formkit/drag-and-drop";
import { ref, onMounted, computed } from 'vue'

export default {
    setup() {
        const configs = ref([])
        const listaVerde = ref([])
        const listaAmarillo = ref([])
        const listaRojo = ref([])

        const obtenerConfiguraciones = async () => {
            try {
                let respuesta = await fetch('http://localhost:8080/configs')
                let data = await respuesta.json()
                configs.value = data
                actualizarListas()
            } catch (error) {
                console.error(error)
            }
        }

        const actualizarListas = () => {
            listaVerde.value = configs.value.flatMap(config => config.verde.map(item => item.pagina))
            listaAmarillo.value = configs.value.flatMap(config => config.amarillo.map(item => item.pagina))
            listaRojo.value = configs.value.flatMap(config => config.rojo.map(item => item.pagina))
        }

        const [parent1, pages1] = useDragAndDrop(listaVerde, {
            group: "A",
            plugins: [
                multiDrag({
                    plugins: [
                        selections({
                            selectedClass: "bg-blue-500 color-white",
                        }),
                    ],
                }),
            ],
        });

        const [parent2, pages2] = useDragAndDrop(listaAmarillo, {
            group: "A",
            plugins: [
                multiDrag({
                    plugins: [
                        selections({
                            selectedClass: "bg-blue-500 color-white",
                        }),
                    ],
                }),
            ],
        });

        const [parent3, pages3] = useDragAndDrop(listaRojo, {
            group: "A",
            plugins: [
                multiDrag({
                    plugins: [
                        selections({
                            selectedClass: "bg-blue-500 color-white",
                        }),
                    ],
                }),
            ],
        });

        onMounted(() => {
            obtenerConfiguraciones()
        })

        return {
            configs,
            parent1,
            pages1,
            parent2,
            pages2,
            parent3,
            pages3
        }
    }
}
</script>

<style scoped>
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

.container-listas {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
}

.container-configs {
    display: flex;
    flex-direction: column;
    width: 60%;
    gap: 10px;
}

.container-paginas {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 10px;
}

.page-manager {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
}

.page-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 50%;
    height: 300px;
    overflow-y: auto;
    border: 1px solid #d6d6d6;
    border-radius: 8px;
    background-color: #eee;
}

.page {
    padding: 8px;
    border-bottom: 1px solid #d6d6d6;
    cursor: grab;
}

.page:hover {
    background-color: #dfdfdf;
}

.page:active {
    cursor: grabbing;
}

.list-header {
    background-color: #08cccc;
    color: black;
    font-weight: bold;
    margin: 0;
    width: 50%;
    padding: 8px;
    border: 1px solid #d6d6d6;
    border-radius: 8px;
    text-align: center;
}
</style>