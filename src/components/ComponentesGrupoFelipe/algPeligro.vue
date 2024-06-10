<script scoped>
let rojo = ["Discord.exe", "TeamSpeak.exe", "Skype.exe", "Zoom.exe", "Telegram.exe", "WhatsApp.exe", "Instagram.exe", "Snapchat.exe", "TikTok.exe", "YouTube.exe", "Twitch.exe", "Tinder.exe", "Grindr.exe"];
let amarillo = ["Riot.exe", "EpicGames", "Txt", "Word", "Excel", "PowerPoint", "Paint", "Illustrator", "Photoshop", "Premiere", "Acrobat", "Ink"];
let verde = ["PSeInt", "Spyder", "Eclipse", "NetBeans", "IntelliJ", "PyCharm", "VisualStudio", "CodeBlocks", "DevC++", "SublimeText", "Atom", "Notepad++", "Vim", "Emacs", "Nano", "Gedit", "pgAdmin", "GitBash"];
let palabrasPeligrosas = [];

function insertarApp(pagina, color) {
    let yaEsta = false;
    if (color == "rojo") {
        for (let i = 0; i < rojo.length; i++) {
            if (pagina == rojo[i]) {
                console.log("La página ya está en la lista");
                yaEsta = true;
            }
        }
        if (!yaEsta) {
            rojo.push(pagina);
            console.log("Página insertada en rojo")
        }
    }
    else if (color == "amarillo") {
        for (let i = 0; i < amarillo.length; i++) {
            if (pagina == amarillo[i]) {
                console.log("La página ya está en la lista");
                yaEsta = true;
            }
        }
        if (!yaEsta) {
            amarillo.push(pagina);
            console.log("Página insertada en amarillo")
        }
    }
    else if (color == "verde") {
        for (let i = 0; i < verde.length; i++) {
            if (pagina == verde[i]) {
                console.log("La página ya está en la lista");
                yaEsta = true;
            }
        }
        if (!yaEsta) {
            verde.push(pagina);
            console.log("Página insertada en verde")
        }
    }
    else {
        console.log("Color no válido, agregado a amarillo por defecto");
        amarillo.push(pagina);
    }
}

function agregarPalabra(palabra) {
    let yaEsta = false;
    for (let i = 0; i < palabrasPeligrosas.length; i++) {
        if (palabra == palabrasPeligrosas[i]) {
            console.log("La palabra ya está en la lista");
            yaEsta = true;
        }
    }
    if (!yaEsta) {
        palabrasPeligrosas.push(palabra);
        console.log("Palabra insertada")
    }
}

function imprimirColor(color) {
    if (color == "rojo") {
        for (let i = 0; i < rojo.length; i++) {
            console.log(rojo[i]);
        }
    }
    else if (color == "amarillo") {
        for (let i = 0; i < amarillo.length; i++) {
            console.log(amarillo[i]);
        }
    }
    else if (color == "verde") {
        for (let i = 0; i < verde.length; i++) {
            console.log(verde[i]);
        }
    }
    else {
        console.log("Color no válido");
    }
}

function imprimirPalabras() {
    for (let i = 0; i < palabrasPeligrosas.length; i++) {
        console.log(palabrasPeligrosas[i]);
    }
}
</script>