import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import http from 'http'
import dotenv from 'dotenv'
import { log } from 'console'

dotenv.config()

// Configuración de la aplicación
const url = process.env.MONGODB_URI
const app = express()

const client = new MongoClient(url)
let db

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))
app.use(express.json())

// Conexión a la base de datos de MongoDB
client
  .connect()
  .then(() => {
    db = client.db('construDatabase')
    console.log('Connected to database')
  })
  .catch((error) => {
    console.error('Failed to connect to database', error)
  })

// Iniciar el servidor
const PORT = process.env.PORT || 8080
const server = http.createServer(app)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// ########## Metodos ##########

app.get('/', async (req, res) => {
  // Metodo para verificar DB
  const database = client.db('construccion')
  const collection = database.collection('users')
  const users = await collection.find({}).toArray()
  res.json(users)
})

// Obtener faltas de los alumnos
app.get('/faltas', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('faltas')
    const faltas = await collection.find({}).toArray()
    res.send(faltas)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Cambiar estado de alumno (Peligroso / No Peligroso)
app.post('/faltas/:id', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('faltas')
    const result = await collection.updateOne(
      { id: Number(req.params.id) },
      { $set: { estado: req.body.estado } }
    )
    res.send(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

let historial = []

//funcion que guarda el usuarios que se acaban de logear en un historial
app.post('/login', async (req, res) => {
  const { nombre, matricula } = req.body

  const database = client.db('construccion') //aqui debe de ir el nombre de la tabla donde se almacenan los usuarios logeados
  const collection = database.collection('users')
  const user = await collection.findOne({ nombre, matricula })

  if (user) {
    historial.push({ nombre, matricula, fecha: new Date() })
    res.json({ message: 'usuario guardado' })
  } else {
    res.status(401).json({ message: 'usuario no encontrado' })
  }
})
