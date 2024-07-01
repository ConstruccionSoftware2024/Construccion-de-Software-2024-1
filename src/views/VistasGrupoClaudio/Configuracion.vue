<template>
    <div class="container">
        <div class="container-botones">
            <button>Nueva Configuración</button>
            <button @click="actualizarListas">Guardar Configuración</button>
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
                    <ul ref="parentVerde" class="page-list">
                        <li v-for="item in pagesVerde" :key="item" class="page">{{ item }}</li>
                    </ul>
                    <ul ref="parentAmarillo" class="page-list">
                        <li v-for="item in pagesAmarillo" :key="item" class="page">{{ item }}</li>
                    </ul>
                    <ul ref="parentRojo" class="page-list">
                        <li v-for="item in pagesRojo" :key="item" class="page">{{ item }}</li>
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
import { useUserStore } from "../../../back-end/src/store";

export default {
    setup() {
        const userConfigs = ref([])
        const configs = ref([])
        const config = ref([])

        const listaVerde = ref([])
        const listaAmarillo = ref([])
        const listaRojo = ref([])

        const userStore = useUserStore()
        const user = computed(() => userStore.user);
        const userId = user.value._id

        const obtenerUserConfigs = async () => {
            try {
                console.log(userId)
                let respuesta = await fetch(`http://localhost:8080/userConfigs/${userId}`)
                let data = await respuesta.json()
                userConfigs.value = data
                obtenerConfigs()
            } catch (error) {
                console.error(error)
            }
        }

        const obtenerConfigs = async () => {
            for (let id of userConfigs.value) {
                try {
                    const data = await getConfigById(id);
                    configs.value.push(data);
                } catch (error) {
                    console.error(`Error al obtener la configuración con id ${id}:`, error);
                }
            }
            initialConfig();
        };

        const getConfigById = async (id) => {
            try {
                const response = await fetch(`/config/${id}`);
                if (!response.ok) {
                    throw new Error('La solicitud para obtener la configuración falló');
                }
                return await response.json();
            } catch (error) {
                console.error('Error al obtener la configuración:', error);
                throw error;
            }
        };

        const initialConfig = () => {
            /* config = configs.value(0)
            obtenerListas() */
        }

        const obtenerListas = () => {
            listaVerde.value = configs.value.flatMap(config => config.verde)
            listaAmarillo.value = configs.value.flatMap(config => config.amarillo)
            listaRojo.value = configs.value.flatMap(config => config.rojo)
        }

        const actualizarListas = () => {
            console.log(pagesVerde.value);
        }

        const [parentVerde, pagesVerde] = useDragAndDrop(listaVerde, {
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

        const [parentAmarillo, pagesAmarillo] = useDragAndDrop(listaAmarillo, {
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

        const [parentRojo, pagesRojo] = useDragAndDrop(listaRojo, {
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
            obtenerUserConfigs()
        })

        return {
            configs,
            actualizarListas,
            parentVerde,
            pagesVerde,
            parentAmarillo,
            pagesAmarillo,
            parentRojo,
            pagesRojo
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