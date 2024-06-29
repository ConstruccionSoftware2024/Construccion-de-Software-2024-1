<template>
    <div class="dashboard" id="app">
        <div class="text-container">
            <h1 class="greeting">Hola {{ userStore.user.firstName }} {{ userStore.user.lastName }}!</h1>
            <p class="description">{{ welcomeMessage }}</p>
            <button v-if="userStore.user.role === 'profesor'" @click="showModal = true" class="create-button">Crear
                Asignatura</button>
        </div>
        <div class="content-wrapper">
            <div class="card-container">
                <div class="card" v-for="(project, index) in filteredProjects" :key="index"
                    @click="goToProject(project._id)">
                    <div class="card-header">
                        <img :src="project.image" alt="Project image" class="project-image">
                        <div class="card-title">{{ project.title }}</div>
                    </div>
                    <div class="card-body">
                        <p>{{ project.description }}</p>
                        <div class="section-info">
                            <i class="fa-solid fa-book"></i> <span>{{ project.section }}</span>
                        </div>
                        <div class="date-info">
                            <i class="fa-solid fa-calendar"></i> <span>{{ project.date }}</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="team-members">
                            <img v-for="member in project.members" :key="member" :src="member" alt="Team member"
                                class="team-member">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="showModal = false">&times;</span>
                <h2>Crear Nueva Asignatura</h2>
                <form @submit.prevent="createNewProject">
                    <label for="title">Título:</label>
                    <input type="text" id="title" v-model="newProject.title" required>

                    <label for="description">Descripción:</label>
                    <textarea id="description" v-model="newProject.description" required></textarea>

                    <label for="section">Sección:</label>
                    <input type="text" id="section" v-model="newProject.section" required>

                    <label for="image">Imagen:</label>
                    <input type="file" id="image" @change="onFileChange" required>

                    <button type="submit" class="submit-button">Crear</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { computed, ref } from 'vue';
import { useUserStore } from '../../../back-end/src/store.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export default {
    setup() {
        const userStore = useUserStore();
        const storage = getStorage();
        return { userStore, storage };
    },
    data() {
        return {
            projects: [],
            showModal: false,
            newProject: {
                title: '',
                description: '',
                section: '',
                image: null
            },
            imageUrl: ''
        }
    },
    computed: {
        filteredProjects() {
            if (this.userStore.user.role === 'alumno') {
                return this.projects.filter(project =>
                    project.members.includes(this.userStore.user._id)
                );
            } else if (this.userStore.user.role === 'profesor') {
                return this.projects.filter(project =>
                    project.profesorId === this.userStore.user._id
                );
            }
            return [];
        },
        welcomeMessage() {
            if (this.userStore.user.role === 'alumno') {
                return '¡Bienvenido/a a tu perfil de asignaturas! Aquí puedes ver todas las asignaturas en las que estás inscrito/a. Explora tus cursos y accede fácilmente a cada uno de ellos.';
            } else if (this.userStore.user.role === 'profesor') {
                return '¡Bienvenido/a a tu perfil de profesor! Aquí puedes ver todas las asignaturas que estás impartiendo. Explora tus cursos y gestiona tus clases.';
            }
            return '';
        }
    },
    methods: {
        async fetchProjects() {
            try {
                const response = await axios.get('http://localhost:8080/asignaturas');
                console.log('Response data:', response.data);
                this.projects = response.data;
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        },
        goToProject(id) {
            console.log(this.userStore.user.role)
            if (this.userStore.user.role == 'alumno') {
                this.$router.push(`/asignaturaAlumno/${id}`);
            }
            else if (this.userStore.user.role == 'profesor') {
                this.$router.push(`/asignaturaProfesor/${id}`);
            }
        },
        onFileChange(e) {
            this.newProject.image = e.target.files[0];
        },
        async createNewProject() {
            const formData = new FormData();
            formData.append('title', this.newProject.title);
            formData.append('description', this.newProject.description);
            formData.append('section', this.newProject.section);
            formData.append('profesorId', this.userStore.user._id);
            formData.append('date', new Date().toISOString().split('T')[0]);

            try {
                if (this.newProject.image) {
                    const uniqueId = uuidv4();
                    const storageReference = storageRef(this.storage, `asignaturasFotos/${uniqueId}-${this.newProject.image.name}`);
                    await uploadBytes(storageReference, this.newProject.image);
                    const imageUrl = await getDownloadURL(storageReference);
                    this.imageUrl = imageUrl;
                }
                formData.append('image', this.imageUrl);

                const response = await axios.post('http://localhost:8080/asignaturasCrear', {
                    title: this.newProject.title,
                    description: this.newProject.description,
                    section: 'Sección ' + this.newProject.section,
                    profesorId: this.userStore.user._id,
                    date: new Date().toISOString().split('T')[0],
                    image: this.imageUrl
                });

                console.log('Project created:', response.data);
                this.projects.push(response.data);
                this.showModal = false;
                this.resetNewProject();
            } catch (error) {
                console.error('Error creating project:', error);
            }
        },
        resetNewProject() {
            this.newProject = {
                title: '',
                description: '',
                section: '',
                image: null
            };
            this.imageUrl = '';
        }
    },
    created() {
        this.fetchProjects();
    }
}
</script>3


<style scoped>
body {
    background-color: var(--background-color);
}

.dashboard {
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    box-sizing: border-box;
}

.text-container {
    width: 100%;
    max-width: 1200px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.greeting,
.description {
    margin: 0;
}

.greeting {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 16px;
    color: var(--button-background-color-light);
}

.description {
    margin-bottom: 16px;
    font-size: 20px;
}

.create-button {
    padding: 10px 20px;
    font-size: 16px;
    color: var(--text-color);
    background-color: var(--button-background-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 16px;
}

.create-button:hover {
    background-color: var(--button-hover-background-color);
}

.content-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
    justify-content: center;
    max-width: 1200px;
    padding: 16px;
}

.card {
    background-color: var(--container-background-color);
    border-radius: 8px;
    padding: 24px;
    margin: 16px;
    width: 300px;
    height: 250px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

.project-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 8px;
    transition: transform 0.2s;
}

.card-title {
    font-size: 18px;
    font-weight: bold;
    flex-grow: 1;
    text-align: left;
}

.card-body {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    max-height: 120px;
}

.section-info,
.date-info {
    display: flex;
    align-items: center;
    margin-top: 8px;
    color: var(--button-background-color-light);
    transition: color 0.2s;
    position: absolute;
    bottom: 40px;
}

.section-info {
    left: 24px;
}

.date-info {
    left: 24px;
    bottom: 16px;
}

.section-info i,
.date-info i {
    margin-right: 8px;
}

.card-footer {
    margin-top: 16px;
    display: flex;
    align-items: center;
}

.team-members {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
}

.team-member {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-left: -8px;
    border: 2px solid var(--border-color);
    transition: transform 0.2s, box-shadow 0.2s;
}

.team-member:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.team-member:first-child {
    margin-left: 0;
}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: var(--container-background-color);
    margin: auto;
    padding: 20px;
    border: 1px solid var(--border-color);
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: var(--text-color);
    text-decoration: none;
    cursor: pointer;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin: 10px 0 5px;
}

input[type="text"],
textarea,
input[type="file"] {
    padding: 10px;
    font-size: 16px;
    border: 1px solid var(--border-color);
    background-color: var(--input-background-color);
    color: var(--text-color);
    border-radius: 5px;
    margin-bottom: 10px;
}

textarea {
    resize: none;
    height: 100px;
}

input {
    background-color: var(--input-background-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
}

.submit-button {
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: var(--button-background-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.submit-button:hover {
    background-color: var(--button-hover-background-color);
}
</style>
