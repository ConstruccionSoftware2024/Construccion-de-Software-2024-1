import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import http from 'http'
import dotenv from 'dotenv'

dotenv.config()

// Configuración de la aplicación
const app = express()
const url = process.env.MONGODB_URI

const client = new MongoClient(url)
let db

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))

// Conexión a la base de datos de MongoDB
client
  .connect()
  .then(() => {
    db = client.db('construDatabase')
  })
  .catch((error) => {
    console.error('Failed to connect to database', error)
  })

// Iniciar el servidor
const PORT = process.env.PORT || 8080
const server = http.createServer(app)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// ########## Metodos ##########

app.get('/users', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('users')
    const users = await collection.find().toArray()
    res.send(users)
  } catch (error) {
    console.error('Failed to fetch users from database', error)
    res.status(500).send('Failed to fetch users from database')
  }
})

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

// Ruta para crear un nuevo alumno
app.post('/faltas-post/new', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('faltas')
    const newAlumno = req.body
    const result = await collection.insertOne(newAlumno)
    res.status(201).send(result.ops[0])
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Ruta para actualizar un alumno existente
app.post('/faltas-post/update', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('faltas')
    const { alumnoId, falta } = req.body

    // Actualiza el documento del alumno agregando la nueva falta al array detalleFaltas
    const result = await collection.updateOne(
      { _id: alumnoId },
      { $push: { detalleFaltas: falta }, $inc: { faltas: 1 } }
    )

    if (result.modifiedCount > 0) {
      res.status(200).send('Falta agregada correctamente')
    } else {
      res.status(404).send('Alumno no encontrado')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})
