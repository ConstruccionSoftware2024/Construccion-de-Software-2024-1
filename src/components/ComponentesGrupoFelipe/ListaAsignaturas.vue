<template>
    <div class="dashboard" id="app">
        <div class="text-container">
            <h1 class="greeting">Hola @usuario</h1>
            <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam vitae, sunt
                consequuntur quo accusantium placeat minima doloremque quidem voluptas. Nulla soluta quasi omnis.</p>
        </div>
        <div class="content-wrapper">
            <div class="card-container">
                <div class="card" v-for="(project, index) in projects" :key="index" @click="goToProject(project.id)">
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            projects: [
                {
                    id: 1, // Despues se cambia por la de la base de datos
                    title: 'Análisis y Diseño de Software',
                    description: 'Principios y técnicas de análisis y diseño de software.',
                    section: 'Sección C',
                    date: '10.07.2024',
                    image: 'https://via.placeholder.com/50',
                    members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24']
                },
                {
                    id: 2,
                    title: 'Desarrollo de Software Ágil',
                    description: 'Metodologías ágiles y prácticas de desarrollo de software.',
                    section: 'Sección A',
                    date: '15.07.2024',
                    image: 'https://via.placeholder.com/50',
                    members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24', 'https://via.placeholder.com/24']
                },
                {
                    id: 3,
                    title: 'Pruebas de Software',
                    description: 'Técnicas y herramientas para pruebas de software.',
                    section: 'Sección A',
                    date: '20.07.2024',
                    image: 'https://via.placeholder.com/50',
                    members: ['https://via.placeholder.com/24']
                },
                {
                    id: 4,
                    title: 'Ingeniería de Requisitos',
                    description: 'Procesos y técnicas para la gestión de requisitos.',
                    section: 'Sección D',
                    date: '25.07.2024',
                    image: 'https://via.placeholder.com/50',
                    members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24']
                },
                {
                    id: 5,
                    title: 'Arquitectura de Software',
                    description: 'Diseño y evaluación de arquitecturas de software.',
                    section: 'Sección B',
                    date: '30.07.2024',
                    image: 'https://via.placeholder.com/50',
                    members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24']
                },
                {
                    id: 6,
                    title: 'Gestión de Proyectos de Software',
                    description: 'Principios y prácticas para la gestión de proyectos de software.',
                    section: 'Sección A',
                    date: '05.08.2024',
                    image: 'https://via.placeholder.com/50',
                    members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24', 'https://via.placeholder.com/24']
                },
                {
                    id: 7,
                    title: 'Mantenimiento de Software',
                    description: 'Técnicas y herramientas para el mantenimiento de software.',
                    section: 'Sección D',
                    date: '10.08.2024',
                    image: 'https://via.placeholder.com/50',
                    members: ['https://via.placeholder.com/24']
                },
                {
                    id: 8,
                    title: 'Calidad de Software',
                    description: 'Modelos y estándares de calidad de software.',
                    section: 'Sección A',
                    date: '15.08.2024',
                    image: 'https://via.placeholder.com/50',
                    members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24']
                },
                {
                    id: 9,
                    title: 'Seguridad de Software',
                    description: 'Prácticas y técnicas para el desarrollo seguro de software.',
                    section: 'Sección A',
                    date: '20.08.2024',
                    image: 'https://via.placeholder.com/50',
                    members: ['https://via.placeholder.com/24', 'https://via.placeholder.com/24']
                }
            ]
        }
    },
    methods: {
        goToProject(id) {
            this.$router.push(`/asignatura/${id}`);
        }
    }
}
</script>

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
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s, box-shadow 0.2s;
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
    margin-top: 8px;
    flex-grow: 1;
}

.section-info,
.date-info {
    display: flex;
    align-items: center;
    margin-top: 8px;
    color: var(--button-background-color-light);
    transition: color 0.2s;
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
    border: 2px solid white;
    transition: transform 0.2s, box-shadow 0.2s;
}

.team-member:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.team-member:first-child {
    margin-left: 0;
}
</style>
