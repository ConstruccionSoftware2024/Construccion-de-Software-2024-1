<template>

    <body>
        <section id="home">
            <div class="home-left scroll-reveal" style="text-align: center;">
                <img src="@/assets/logo.svg" alt="">
                <h2 class="text">Cheat Detector</h2>
            </div>
            <div class="home-right scroll-reveal">
                <h2 class="home-heading"> Evita las copias en las evaluaciones</h2>
                <p class="home-para">Con nuestra herramienta avanzada, puedes monitorear las actividades de los alumnos
                    durante las evaluaciones y asegurarte de que cada respuesta sea genuina.
                </p>
                <li><router-link to="/login"><a href="" class="btn"> ¡Pruebalo!</a></router-link></li>
            </div>
        </section>

        <section id="goal">
            <div class="goal-left scroll-reveal">
                <h2>No pierdas tiempo en revisar de más</h2>
                <p>Nuestro sistema de seguimiento histórico y gestión por alumno te proporciona un control total sobre
                    el proceso evaluativo.</p>
                <ul>
                    <li> &nbsp;Crea sesiones de evaluación en un instante.</li>
                    <li> &nbsp;Mira en tiempo real las aplicaciones que los alumnos están utilizando.</li>
                    <li> &nbsp;Evita que tus alumnos utilicen aplicaciones prohibidas durante las pruebas.</li>
                </ul>
                <li><router-link to="/contact"><a href="" class="btn"> ¡Contactanos!</a></router-link></li>
            </div>
            <div class="goal-right scroll-reveal">
                <img src="./imagenes/laboratorio.jpg" alt="">
            </div>
        </section>
        <section id="our-Team">
            <h2>Nuestro equipo</h2>
            <div class="teamContainer scroll-reveal">
                <div class="team-item">
                    <img src="./imagenes/joaquin.jpg" alt="" title="Discord: ascencio">
                    <h5 class="member-name">Joaquín Ascencio</h5>
                    <span class="role">SCRUM MASTER</span>
                </div>
                <div class="team-item">
                    <img src="./imagenes/felipe.png" alt="" title="Discord: pipefck">
                    <h5 class="member-name">Felipe Castillo</h5>
                    <span class="role">SCRUM MASTER</span>
                </div>
                <div class="team-item">
                    <img src="./imagenes/claudio.png" alt="" title="Discord: claudioha_1901">
                    <h5 class="member-name">Claudio Hernández</h5>
                    <span class="role">SCRUM MASTER</span>
                </div>
                <div class="team-item">
                    <img src="./imagenes/rodrigo.png" alt="" title="Discord: lavolamagik">
                    <h5 class="member-name">Rodrigo Domínguez</h5>
                    <span class="role">GIT MASTER</span>
                </div>
                <div class="team-item">
                    <img src="./imagenes/agustin.jpg" alt="" title="Discord: tintinn">
                    <h5 class="member-name">Agustín Meza</h5>
                    <span class="role">GIT MASTER</span>
                </div>
            </div>
        </section>
        <footer>
            <p> </p>
        </footer>


    </body>


</template>
<script>
export default {
    mounted() {
        window.addEventListener('scroll', this.checkScroll);
        this.checkScroll();
    },
    methods: {
        checkScroll() {
            const elements = document.querySelectorAll('.scroll-reveal');
            elements.forEach((el) => {
                const position = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (position - windowHeight <= 0) {
                    el.classList.add('fadeInUp');
                }
            });
        }
    }
}
</script>
<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}



@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.scroll-reveal li {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
}

.scroll-reveal li:nth-child(1) {
    animation-delay: 0.5s;
}

.scroll-reveal li:nth-child(2) {
    animation-delay: 1s;
}

.scroll-reveal li:nth-child(3) {
    animation-delay: 1.5s;
}

.scroll-reveal li:nth-child(4) {
    animation-delay: 2s;
}


.fadeInUp {
    animation-name: fadeInUp;
    animation-duration: 1s;
    animation-fill-mode: both;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 17px;
}

a {
    text-decoration: none;
}

.text {
    font-size: 3rem;
    font-weight: bold;
    margin-top: -50px;
}

.navbar {
    color: #fff;
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar ul {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
}

.navbar .responsive {
    display: none;
}

.navbar ul li {
    padding: 8px 12px;
}

.navbar ul li a {
    z-index: 2;
    color: #fff;
    position: relative;
    text-decoration: none;
}

#hamBurger {
    display: none;
}

.button {
    padding: 7px 10px;
    color: #fff;
    animation: none;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    background-color: var(--table-button-color);
}

#home {
    width: 100%;
    padding: 3rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
}

.home-left {
    height: 300px;
    margin-left: 100px;
    position: relative;
}

.home-left img {
    height: 100%;
    border-radius: 10px;
}

.home-right {
    width: 50%;
}

.home-heading {
    font-size: 2rem;
    margin-bottom: 10px;
    padding-bottom: 0.6em;
}

.home-para {
    margin-bottom: 20px;
}

.btn {
    text-decoration: none;
    color: #08cccc;
    font-weight: bold;
    position: relative;
    width: 0;
}

.btn:hover::after {
    content: '';
    height: 4px;
    position: absolute;
    background-color: var(--table-button-color);
    left: 0;
    bottom: -10px;
    animation: width;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    border-radius: 5px;
}

@keyframes width {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}

#workFlow {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
    margin-bottom: 4rem;
}

.heading {
    margin: 1rem auto;
    text-align: center;
}

.para {
    margin: 1rem auto;
}

.num-container {
    width: 70%;
    margin: 1rem auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.num-item {
    font-size: 1.5rem;
    line-height: 1.4rem;
    color: rgb(43, 126, 199);
}

#goal {
    width: 80%;
    margin: 2rem auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
}

.goal-left {
    width: 60%;
    line-height: 2rem;
    
}

.goal-left h2 {
    font-size: 2.4rem;
    padding-bottom: 0.5em;
}

.goal-left p {
    line-height: 1.5rem;
    margin: 1rem 0;
}

.goal-left ul {
    list-style: none;
    margin-bottom: 1rem;
}

.goal-left ul li::before {
    line-height: 1.5rem;
    content: '●';
    color: var(--table-button-color);
}

.goal-right {
    position: relative;
    width: 35%;
}

.goal-right img {
    width: 100%;
    cursor: pointer;
    border-radius: 10px;
    filter: drop-shadow(3px 4px 5px black);
    transition: all 0.2s linear;
}

.goal-right img:hover {
    transform: translateY(-5px);
    filter: drop-shadow(5px 6px 7px black);
}


#our-Team {
    width: 80%;
    margin: 4rem auto 1rem;
}

#our-Team h2 {
    text-align: center;
    margin: 1rem auto 4rem;
    position: relative;
}

#our-Team h2::after {
    content: '';
    height: 4px;
    margin: 0 auto;
    text-align: center;
    width: 15%;
    background-color: var(--table-button-color);
    position: absolute;
    left: 50%;
    bottom: -10px;
    border-radius: 5px;
    transform: translate(-50%);
}

.teamContainer {
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.teamContainer img {
    width: 100%;
    cursor: pointer;
    border-radius: 10px;
    filter: drop-shadow(3px 4px 5px black);
    transition: all 0.2s linear;
}

.teamContainer img:hover {
    transform: translateY(-5px);
    filter: drop-shadow(5px 6px 7px black);
}

.team-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
}

.team-item h5 {
    margin-top: 1rem;
    font-size: 1.1rem;
}

.team-item span {
    margin-top: .4rem;
    font-weight: bold;
    text-transform: uppercase;
    color: rgb(7, 176, 176);
}

.team-item img {
    width: 80px;
}

footer {
    padding: 1rem 0;
    text-align: center;
}

@media screen and (max-width: 784px) {
    #list {
        display: none;
    }

    #hamBurger {
        cursor: pointer;
        display: block;
        z-index: 20;
        font-size: 2rem;
    }

    .navbar .responsive {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0%;
        left: 100%;
        padding: 2rem 0;
        z-index: 2;
        height: 100vh;
        background-color: rgb(24, 23, 24);
        width: 100%;
        transition: all 0.5s linear;
        opacity: 0.9;
    }

    .navbar ul li {
        margin: 0.4rem 0;
    }

    .responsive.active {
        left: 0%;
    }

    .goal-right {
        width: 100%;
        margin: 0 auto 2rem;
    }

    .goal-left {
        width: 100%;
        text-align: center;
    }

    #goal {
        flex-direction: column-reverse;
    }
}

@media screen and (max-width: 633px) {
    #home {
        flex-direction: column;
    }

    .home-left {
        width: 100%;
        height: auto;
    }

    .home-left img {
        width: 100%;
    }

    .home-right {
        margin-top: 2rem;
        width: 100%;
    }

    .para {
        width: 90%;
    }

    .num-container {
        flex-direction: column;
    }

    .num-item {
        margin: 1rem;
    }

    .teamContainer {
        justify-content: center;
    }
}
</style>