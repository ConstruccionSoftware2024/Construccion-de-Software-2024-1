import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import http from 'http'
import dotenv from 'dotenv'
import { log } from 'console'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

dotenv.config()

// Configuración de la aplicación
const url = process.env.MONGODB_URI
const app = express()
const SECRET_KEY = '8jP@4k#Dq^2Lw!x9u&T7zR*Y0o'

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

let historial = []
/* FUNCION DE LOGIN ANTERIOR 
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
});
*/

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

// Se actualiza la lista de participantes de una sesión
app.put('/sesion/:id', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('sesion')
    const consulta = { _id: new ObjectId(req.params.id) }
    const nuevosParticipantes = req.body.participantes
    const result = await collection.updateOne(consulta, {
      $set: { participantes: nuevosParticipantes }
    })

    if (result.modifiedCount === 1) {
      res.send(result)
    } else {
      res.status(404).send('Sesión no encontrada')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})
/* FUNCION DE LOGIN DE GRUPO JOAQUIN*/
app.post('/login', async (req, res) => {
  try {
    const database = client.db('construccion')
    const User = database.collection('users')
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.json({ success: false })
    }

    if (req.body.password !== user.password) {
      return res.json({ success: false })
    }

    // Excluir la contraseña de la respuesta
    const { password, ...userWithoutPassword } = user

    res.json({ success: true, user: userWithoutPassword })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

app.post('/register', async (req, res) => {
  const {
    email,
    username,
    password,
    confirmPassword,
    firstName,
    lastName,
    secondLastName,
    campus,
    major,
    rut,
    matricula
  } = req.body
  const verificationToken = jwt.sign(
    {
      email,
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      secondLastName,
      campus,
      major,
      rut,
      matricula
    },
    SECRET_KEY,
    { expiresIn: '24h' }
  )

  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'pruebas.construccion2024@outlook.com',
      pass: 'RkUFFzM1LUTk'
    }
  })

  let mailOptions = {
    from: 'pruebas.construccion2024@outlook.com',
    to: email,
    subject: 'Verificación de Correo Electrónico en Cheat Detector',
    html: `<p>Haz clic en el siguiente enlace para verificar tu correo electrónico: <a href="http://localhost:8080/verify?token=${verificationToken}">Verificar Correo</a></p>`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error al enviar el correo de verificación')
    } else {
      return res.status(200).json({ success: true, message: 'Correo de verificación enviado' })
    }
  })
})

app.get('/verify', async (req, res) => {
  const { token } = req.query
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    const {
      email,
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      secondLastName,
      campus,
      major,
      rut,
      matricula
    } = decoded

    const database = client.db('construccion')
    const User = database.collection('users')

    const verificacionUser = await User.findOne({ email })

    if (verificacionUser) {
      res.redirect('http://localhost:5173/')
    } else {
      await User.insertOne({
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        firstName: firstName,
        lastName: lastName,
        secondLastName: secondLastName,
        rut: rut,
        matricula: matricula,
        campus: campus,
        major: major
      })
    }

    res.redirect('http://localhost:5173/')
  } catch (error) {
    console.error('Error al verificar el token:', error)
    return res.status(500).send('Error al verificar el correo electrónico')
  }
})

app.post('/checkEmail', async (req, res) => {
  try {
    const database = client.db('construccion')
    const User = database.collection('users')
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      res.json({ exists: true })
    } else {
      res.json({ exists: false })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})
// Obtener sesion especifica
app.get('/sesion/:id', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('sesion')
    const consulta = { _id: new ObjectId(req.params.id) }
    const result = await collection.findOne(consulta)
    res.send(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//obtener usuario especifico
app.get('/user/:id', async (req, res) => {
  try {
    console.log('here')
    const database = client.db('construccion')
    const collection = database.collection('users')
    const consulta = { _id: new ObjectId(req.params.id) }
    const result = await collection.findOne(consulta)
    if (result) {
      res.send(result)
    } else {
      res.status(404).send('user not found')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Enviar una alerta a un usuario
// Se guarda un mensaje de alerta en un array para el usuario
// Para utilizar el mensaje de alerta en algun componente es necesario usar el
// metodo GET /user/:id/alertas abajo para obtener los mensajes
app.post('/user/:id/alerta', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('users')
    const consulta = { _id: new ObjectId(req.params.id) }
    const mensaje = req.body.mensaje
    const result = await collection.updateOne(consulta, { $push: { alertas: mensaje } })

    if (result.modifiedCount === 1) {
      res.send(result)
    } else {
      res.status(404).send('Usuario no encontrado')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Usa este método para obtener los mensajes de alerta de un usuario
app.get('/user/:id/alertas', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('users')
    const consulta = { _id: new ObjectId(req.params.id) }
    const usuario = await collection.findOne(consulta)

    if (usuario) {
      res.send(usuario.alertas)
    } else {
      res.status(404).send('Usuario no encontrado')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Para mostrar los mensajes de alerta en algún componente puedes usar la siguiente función
// USAR SOLO EN EL FRONTEND (NO AQUI)
/*
const obtenerAlertas = async () => {
  try {
      let respuesta = await fetch(`http://localhost:8080/user/${idUsuario}/alertas`)
      let alertas = await respuesta.json()

      // Muestra las alertas al usuario
      alertas.forEach(alerta => {
          alert(alerta)
      })
  }
  catch (error) {
      console.error('Error al obtener las alertas:', error)
  }
}

// Se llama a obtenerAlertas cada 5 segundos
setInterval(obtenerAlertas, 5000)
*/

// crear una nueva sesión
app.post('/sesion', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('sesion')
    const newSession = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      participantes: []
    }
    console.log('enviando', newSession.nombre, newSession.descripcion)
    const result = await collection.insertOne(newSession)
    res.sendStatus(200)
  } catch (error) {
    console.error('Error inserting document:', error)
    res.status(500).send('Error inserting document')
  }
})
