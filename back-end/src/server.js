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
    console.log(req.params.id)
    console.log(req.body.estado)
    const result = await collection.updateOne(
      { id: Number(req.params.id) },
      { $set: { estado: req.body.estado } }
    )
    console.log(result)
    res.send(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
})