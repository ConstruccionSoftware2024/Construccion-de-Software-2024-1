import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import http from 'http'

// Configuración de la aplicación
const app = express()
const url =
  'mongodb+srv://dbAdmin:%40Admin1234@cluster0.0a2i7lq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
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
    console.log('Connected to database')
  })
  .catch((error) => {
    console.error('Failed to connect to database', error)
  })

const server = http.createServer(app)

// Iniciar el servidor
const PORT = 8080
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// ########## Metodos ##########

app.get('/', async (req, res) => {
  // Metodo para verificar DB
  const database = client.db('construccion')
  const collection = database.collection('users')
  const users = await collection.find({}).toArray()
  res.json(users)
})
