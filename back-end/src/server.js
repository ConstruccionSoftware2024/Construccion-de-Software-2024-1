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
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
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
      { _id: new ObjectId(req.params.id) },
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
    const historialLogin = database.collection('historialLogin') //nueva coleccion para almacenar el historial del login en la pagina

    if (!user) {
      return res.json({ success: false })
    }

    if (req.body.password !== user.password) {
      return res.json({ success: false })
    }

    // Guardar el usuario en el historial de login
    await historialLogin.insertOne({
      IdUsuario: user._id,
      nombre: user.username,
      email: user.email,
      tiempoLogin: new Date()
    })

    // Mostrar historial de login
    const historial = await historialLogin.find().toArray()
    console.log('Historial de login:', historial)

    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error del servidor' })
  }
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

    //console.log("here")

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

      creador: req.body.creador,
      participantes: [],
      banlist: [],

    }
    //console.log("enviando", newSession.nombre, newSession.descripcion)
    const result = await collection.insertOne(newSession)
    res.sendStatus(200)
  } catch (error) {
    console.error('Error inserting document:', error)
    res.status(500).send('Error inserting document')
  }
})

// Banear a un alumno de una sesión
/* Dadas las dudas presentes en el momento, esta función estará presente como un comentario
app.post('/sesion/:id/ban', async (req, res) => {
  try {
    const database = client.db('construccion');
    const collection = database.collection('sesion');
    const sessionId = req.params.id;
    const bannedEmail = req.body.email;

    // Revisa si la sesión existe
    const session = await collection.findOne({ _id: new ObjectId(sessionId) });
    if (!session) {
      return res.status(404).json({ message: 'Sesión no encontrada' });
    }

    // Actualiza la lista de correos baneados de la sesión
    const result = await collection.updateOne(
      { _id: new ObjectId(sessionId) },
      { $addToSet: { bannedEmails: bannedEmail } }
    );

    if (result.modifiedCount === 1) {
      res.json({ success: true, message: 'Alumno baneado de la sesión' });
    } else {
      res.status(404).json({ success: false, message: 'Problema encontrado al intentar banear al alumno' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
*/

app.post('/agregarParticipante', async (req, res) => {
  try {
    //Implementar lógica para agregar participante a sesion
    //se asume que se enviaran como parametros el id de la sesion y el id del participante

    //cambiar estos por req.body.idSesion y req.body.idParticipante
    let idSesion = '665d1794a22b8d44afad0793'
    let idParticipante = '665cfd84b637ff59e562b66d'

    //obtenemos la sesion
    const database = client.db('construccion')
    const collection = database.collection('sesion')
    const consulta = { _id: new ObjectId(idSesion) }
    const result = await collection.findOne(consulta)

    //Si el usuario fue baneado de la sesion no lo agregamos
    if (result) {
      // Verificar si el participante está en la banlist
      const participanteBaneado = result.banlist.some((element) => idParticipante === element)
      if (participanteBaneado) {
        return res.status(403).send('Participante baneado no se puede agregar')
      }
    }

    //Continuar con la lógica para agregar participante a sesion

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
})


// HU-8 BlackList
app.get('/sesion/:idSesion/blacklist', async (req, res) => {
  try {
    const database = client.db('construccion');
    const collection = database.collection('sesion');
    const idSesion = new ObjectId(req.params.idSesion);

    // Obtener la sesión y su banlist
    const sesion = await collection.findOne({ _id: idSesion }, { projection: { banlist: 1 } });

    if (sesion) {
      res.send(sesion.banlist);
    } else {
      res.status(404).send('Sesión no encontrada');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
