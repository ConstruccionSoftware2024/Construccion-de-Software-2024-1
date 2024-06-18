<template>

    <body>
        <div class="ffbox">
            <div class="ffbox1">
                <h1 class="gfg">Contacto Alumno</h1>
                <form @submit.prevent="sendEmail">

                    <label for="student">
                        <i class="fa fa-solid fa-user" style="margin: 2px;">
                        </i>
                        Alumno:
                    </label>
                    <select id="student" v-model="selectedStudent" @change="updateEmail">
                        <option v-for="student in students" :value="student.email">
                            {{ student.username }}
                        </option>
                    </select>

                    <label for="msg">
                        <i class=" fa fa-solid fa-comment" style="margin: 2px;">
                        </i>
                        Tu mensaje:
                    </label>
                    <textarea id="msg" name="msg" rows="5" required style="vertical-align: top;"></textarea>

                    <button type="submit">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    </body>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            students: [],
            selectedStudent: '',
            email: ''
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
            this.email = this.selectedStudent;
        },
        async sendEmail(event) {
            const data = { email: this.email, msg: event.target.msg.value };
            console.log(data); // Imprime los datos que se enviarán
            try {
                await axios.post('http://localhost:8080/send-email', data);
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
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
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