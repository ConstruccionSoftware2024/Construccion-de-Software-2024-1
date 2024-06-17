<template>

    <body>
        <div class="ffbox">
            <div class="ffbox1">
                <h1 class="gfg">Contactanos</h1>
                <form @submit.prevent="sendEmail">
                    <label for="fullName">
                        <i class="fa fa-solid fa-user" style="margin: 2px;">
                        </i> Nombre completo:
                    </label>
                    <input type="text" id="fullName" name="fullName" required>

                    <label for="email">
                        <i class="fa fa-solid fa-envelope" style="margin: 2px;">
                        </i>
                        Correo electrónico:

                    </label>
                    <input type="email" id="email" name="email" required>

                    <label for="mobile">
                        <i class=" fa fa-solid fa-phone" style="margin: 2px;">
                        </i>
                        Número de teléfono:
                    </label>
                    <input type="tel" id="mobile" name="mobile" required>

                    <label for="msg">
                        <i class=" fa fa-solid fa-comment" style="margin: 2px;">
                        </i>
                        Tu mensaje:
                    </label>
                    <textarea id="msg" name="msg" rows="5" required>
                    </textarea>

                    <button type="submit">
                        Enviar
                    </button>
                </form>
            </div>
            <div class="map-div">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.167287242063!2d-71.2319813242423!3d-35.002517272813975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966456519058edeb%3A0x47f5033883ff4b74!2sUniversidad%20de%20Talca%20Campus%20Curic%C3%B3!5e0!3m2!1ses-419!2scl!4v1718059102020!5m2!1ses-419!2scl"
                    width="370" height="95%" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    </body>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        async sendEmail(event) {
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());
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