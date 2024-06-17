import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5151;

// Habilitar CORS para todas las rutas
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Variable para almacenar los datos recibidos
let tabData = [];

// Ruta para manejar las solicitudes POST en la raíz
app.post('/', (req, res) => {
    console.log('Datos recibidos:', req.body);
    tabData = req.body; // Guardar los datos recibidos
    res.json({ message: 'Datos recibidos correctamente' });
});

// Ruta para manejar las solicitudes GET y enviar los datos almacenados
app.get('/tabs', (req, res) => {
    res.json(tabData);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor de aplicación visual escuchando en http://localhost:${PORT}`);
});
