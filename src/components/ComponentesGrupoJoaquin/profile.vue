<template>
    <div class="card-container">
        <div class="card-client">
            <div class="user-picture">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                        d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z">
                    </path>
                </svg>
            </div>
            <p class="name-client"> Jhon Doe
                <span>Nombre:</span>
                <span>Carrera:</span>
                <span>Correo:</span>
                <span>Carrera:</span>
                <span>Campus:</span>
            </p>

            <button class="Btn" @click.prevent="edit_username">Edita tu Username
                <svg class="svg" viewBox="0 0 512 512">
                    <path
                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                    </path>
                </svg>
            </button>
            <button class="Btn" @click.prevent="edit_password">Cambiar contraseña
                <svg class="svg" viewBox="0 0 512 512">
                    <path
                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                    </path>
                </svg>
            </button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
            firstName: '',
            lastName: '',
            secondLastName: '',
            campus: '',
            major: '',
            passwordVisible: false,

        }
    },
    methods: {
        async edit_username() {
            try {
                const response = await axios.post('http://localhost:8080/edit_username', {
                });

                console.log(response.data);

            } catch (error) {
                console.error(error);
            }
        },
        async edit_password() {
            try {
                const response = await axios.post('http://localhost:8080/edit_username', {
                });

                console.log(response.data);

            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>
<style>
.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2%;
}

.card-client {
    background: #555;
    width: 16rem;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 20px;
    padding-right: 20px;
    border: 4px solid #fff;
    box-shadow: 0 6px 10px #212121;
    border-radius: 10px;
    text-align: center;
    color: #fff;
    transition: all 0.3s ease;
}

.card-client:hover {
    transform: translateY(-10px);
}

.user-picture {
    overflow: hidden;
    object-fit: cover;
    width: 5rem;
    height: 5rem;
    border: 4px solid #fff;
    border-radius: 999px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}

.user-picture svg {
    width: 2.5rem;
    fill: currentColor;
}

.name-client {
    margin: 0;
    margin-top: 20px;
    font-weight: 600;
    font-size: 18px;
}

.name-client span {
    display: block;
    font-weight: 200;
    font-size: 18px;
}

.Btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    height: 40px;
    border: none;
    padding: 0px 20px;
    background-color: #212121;
    color: white;
    font-weight: 500;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 5px 5px 0px #6d6b6b;
    transition-duration: .3s;
    margin: 6%;
}

.svg {
    width: 13px;
    position: absolute;
    right: 0;
    margin-right: 20px;
    fill: white;
    transition-duration: .3s;
}

.Btn:hover {
    color: transparent;
}

.Btn:hover svg {
    right: 43%;
    margin: 0;
    padding: 0;
    border: none;
    transition-duration: .3s;
}

.Btn:active {
    transform: translate(3px, 3px);
    transition-duration: .3s;
    box-shadow: 2px 2px 0px rgb(140, 32, 212);
}
</style>
