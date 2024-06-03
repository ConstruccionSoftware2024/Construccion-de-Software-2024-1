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

app.post('/faltas-post', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('faltas')
    const alumno = req.body
    // Busca el alumno en la base de datos
    const existingAlumno = await collection.findOne({ _id: alumno._id })

    if (existingAlumno) {
      // Si el alumno ya existe, actualiza detalleFaltas
      const result = await collection.updateOne(
        { _id: alumno._id },
        { $push: { detalleFaltas: alumno.detalleFaltas[0] }, $inc: { faltas: 1 } }
      )
    } else {
      // Si el alumno no existe, inserta el nuevo alumno
      const result = await collection.insertOne(alumno)
    }
    res.status(200).send('Falta agregada correctamente')
  } catch (error) {
    console.error(error) // Imprime el error
    res.status(500).send(error.message)
  }
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

// Obtener lista de sesiones
app.get('/sesion', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('sesion')
    const sesion = await collection.find({}).toArray()
    res.send(sesion)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Obtener sesion especifica
app.get('/sesion/:id', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('sesion')
    const consulta = {_id: new ObjectId(req.params.id)}
    const result = await collection.findOne(consulta)
    res.send(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//obtener usuario especifico
app.get('/user/:id',async (req, res) => {
  try {
    console.log("here")
    const database = client.db('construccion')
    const collection = database.collection('users')
    const consulta = {_id: new ObjectId(req.params.id)}
    const result = await collection.findOne(consulta)
    if(result){
      res.send(result)
    }
    else{
      res.status(404).send('user not found')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// crear una nueva sesión
app.post('/sesion', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('sesion')
    const newSession = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      participantes: []
    };
    console.log("enviando", newSession.nombre, newSession.descripcion)
    const result = await collection.insertOne(newSession);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error inserting document:', error);
    res.status(500).send('Error inserting document');
  }
});