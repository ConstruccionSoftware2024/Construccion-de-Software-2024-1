<template>

    <body>
        <div class="header">
            <div class="overlay"></div>
            <div class="ffbox">
                <div class="ffbox1">
                    <h1 class="gfg">Contacto Alumno, Profesor {{ userStore.user.firstName }} {{ userStore.user.lastName
                        }}
                    </h1>
                    <form @submit.prevent="sendEmail">

                        <label for="student">
                            <i class="fa fa-solid fa-user" style="margin: 2px;">
                            </i>
                            Alumno
                        </label>
                        <select id="student" v-model="selectedStudent" @change="updateEmail">

                            <option value="" disabled>Selecciona un alumno</option>
                            <option v-for="student in students" :value="student.email">
                                {{ student.firstName }} {{ student.lastName }} - {{ student.email }}
                            </option>
                        </select>

                        <label for="msg">
                            <i class=" fa fa-solid fa-comment" style="margin: 2px;">
                            </i>
                            Tu mensaje
                        </label>
                        <textarea id="msg" name="msg" rows="5" required style="vertical-align: top;"></textarea>

                        <button type="submit">
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../../../back-end/src/store.js'
export default {
    setup() {
        const userStore = useUserStore();
        return { userStore }
    },
    data() {
        return {
            students: [],
            selectedStudent: '',
            email: '',
            alumno: '',
            nombreProfesor: useUserStore().user.firstName + ' ' + useUserStore().user.lastName,
            correoProfesor: useUserStore().user.email
        };
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:8080/users');
            this.students = response.data.filter(user => user.role === 'alumno');
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        updateEmail() {
            const student = this.students.find(s => s.email === this.selectedStudent);

            if (student) {
                this.email = student.email;
                this.alumno = student.firstName + ' ' + student.lastName;
            }
        },
        async sendEmail(event) {
            const data = { alumno: this.alumno, email: this.email, msg: event.target.msg.value, profesor: this.nombreProfesor, correoProfesor: this.correoProfesor };
            console.log(data);
            try {
                await axios.post('http://localhost:8080/email-alumno', data);
                alert('Correo electrónico enviado correctamente');
            } catch (error) {
                console.error(error);
                alert('Hubo un error al enviar el correo electrónico');
            }
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

body {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--background-color);
}

.header {
    position: relative;
    width: 100%;
    height: 95vh;
    background-image: url('@/assets/images/background.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.ffbox {
    display: flex;
    width: 80%;
    max-width: 800px;
    background-color: #2c2c2e;

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border-radius: 10px;
    flex-wrap: wrap;
    color: white;
    z-index: 2;
}

.ffbox1 {
    flex: 1;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.ffbox1 label {
    display: block;
    margin-bottom: 8px;
}

.ffbox1 input,
.ffbox1 textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;
    border-radius: 15px;
    background-color: white;
    border: none;
}

.ffbox1 textarea {
    resize: vertical;
}

.ffbox1 {
    margin-bottom: 16px;
}

.ffbox1 label {
    margin-right: 16px;
}

.map-div {
    flex: 1;
    background-color: #eee;
}

button {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;
    border-radius: 15px;
    background-color: #08cccc;
    color: white;
    font-size: 17px;
    font-weight: 700;
    border: #a2c2ee;
}

button:hover {
    background-color: #0e0e0e
}

.map-div iframe {
    border: 0;
    padding: 10px;
}

.gfg {
    text-align: center;
    color: #08cccc
}

.map-div {
    background-color: #08cccc
}
</style>