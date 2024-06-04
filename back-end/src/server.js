import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import http from 'http'
import dotenv from 'dotenv'

import nodemailer from 'nodemailer'

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

app.post('/register', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('users')
    await collection.insertOne(req.body)
    res.send({ success: true, message: 'Registro exitoso' })
  } catch (error) {
    console.log(error)
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
    //-----------------------------------------

    //const nodemailer = require('nodemailer')
    const e_mail = req.body
    const mail = {
      user: 'pruebas.construccion2024@gmail.com',
      pass: 'Construccion'
    }

    let transporter = nodemailer.createTransport({
      host: 'mail.mhdeploy.com',
      port: 2525,
      tls: {
        rejectUnauthorized: false
      },
      secure: false, // true for 465, false for other ports
      auth: {
        user: mail.user, // generated ethereal user
        pass: mail.pass // generated ethereal password
      }
    })

    const sendEmail = async (email, subject, html) => {
      try {
        await transporter.sendMail({
          from: `Equipo <${mail.user}>`, // sender address
          to: email, // list of receivers
          subject, // Subject line
          text: 'Verificacion de correo', // plain text body
          html // html body
        })
      } catch (error) {
        console.log('Algo no va bien con el email', error)
      }
    }

    const getTemplate = (username) => {
      return `
            <head>
                
            </head>
            
            <div id="email___content">
                <img src="https://http.cat/images/102.jpg" alt="">
                <h2>Hola ${username}</h2>
                <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
                <a
                    href="http://localhost:4000/api/user/confirm/"
                    target="_blank"
                >Confirmar Cuenta</a>
            </div>
          `
    }
    const template = getTemplate(user)
    sendEmail(e_mail, 'Verificación', template)
    //-----------------------------------------
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})
