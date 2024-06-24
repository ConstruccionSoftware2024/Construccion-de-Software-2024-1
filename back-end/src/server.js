import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import http from 'http'
import dotenv from 'dotenv'
import { log } from 'console'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
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

app.get('/asignaturas', async (req, res) => {
  try {
    const database = client.db('construccion');
    const collection = database.collection('asignaturas');
    const asignaturas = await collection.find().toArray();
    res.send(asignaturas);
  } catch (error) {
    console.error('Failed to fetch asignaturas from database', error);
    res.status(500).send('Failed to fetch asignaturas from database');
  }
});

// Recuperar una asignatura segun id
app.get('/asignatura/:id', async (req, res) => {
  try {
    const database = client.db('construccion');
    const collection = database.collection('asignaturas');
    const consulta = { _id: new ObjectId(req.params.id) };
    const asignatura = await collection.findOne(consulta);
    if (asignatura) {
      res.send(asignatura);
    } else {
      res.status(404).send('Asignatura no encontrada');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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

app.post('/asignatura/:asignaturaId/addSession', async (req, res) => {
  try {
    const database = client.db('construccion');
    const collection = database.collection('asignaturas');
    const asignaturaId = req.params.asignaturaId;
    const sessionId = req.body.sessionId;

    // Encuentra la asignatura por ID
    const asignatura = await collection.findOne({ _id: new ObjectId(asignaturaId) });
    if (!asignatura) {
      return res.status(404).json({ message: 'Asignatura no encontrada' });
    }

    // Agrega la ID de la sesión al arreglo "sesiones" de la asignatura
    const result = await collection.updateOne(
      { _id: new ObjectId(asignaturaId) },
      { $push: { sesiones: new ObjectId(sessionId) } }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).send('Error updating document');
  }
});

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

// Obtener una sesión específica por ID
const getParticipantDetails = async (participantIds, usersCollection) => {
  console.log('Original participant IDs:', participantIds);

  // Convertimos los ids a ObjectId solo si no son ya ObjectId
  const objectIds = participantIds.map(id => {
    return typeof id === 'string' ? new ObjectId(id) : id;
  });

  console.log('Converted Object IDs:', objectIds);

  // Realizamos la consulta y agregamos depuración
  const participants = await usersCollection.find({ _id: { $in: objectIds } }).toArray();
  console.log('Fetched participants:', participants);
  return participants;
}

app.get('/sessions/:id', async (req, res) => {
  try {
    const database = client.db('construccion');
    const sessionCollection = database.collection('sesion');
    const usersCollection = database.collection('users');

    const consulta = { _id: new ObjectId(req.params.id) };
    const session = await sessionCollection.findOne(consulta);

    if (!session) {
      return res.status(404).send('Sesión no encontrada');
    }

    // Obtener la información completa de los participantes
    const participantes = await getParticipantDetails(session.participantes, usersCollection);

    session.participantes = participantes;

    res.json(session);
  } catch (error) {
    console.error('Error fetching session data:', error);
    res.status(500).send(error.message);
  }
});

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

    // Excluir la contraseña de la respuesta
    const { password, ...userWithoutPassword } = user
    // Guardar el usuario en el historial de login
    await historialLogin.insertOne({
      IdUsuario: user._id,
      nombre: user.username,
      email: user.email,
      tiempoLogin: new Date()
    })

    // Mostrar historial de login
    const historial = await historialLogin.find().toArray()
    //console.log('Historial de login:', historial)

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
    role,
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
      role,
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

app.post('/resetPassword', async (req, res) => {
  const { email } = req.body;

  const database = client.db('construccion');
  const User = database.collection('users');
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send('Usuario no encontrado.');
  }

  const resetCode = Math.random().toString(36).substring(2, 15);

  await User.updateOne({ email }, { $set: { resetCode: resetCode } });

  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'pruebas.construccion2024@outlook.com',
      pass: 'RkUFFzM1LUTk'
    }
  });

  let mailOptions = {
    from: 'pruebas.construccion2024@outlook.com',
    to: email,
    subject: 'Código de reseteo de contraseña',
    text: `Tu código de reseteo es: ${resetCode}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error al enviar el correo.');
    } else {
      console.log('Email enviado: ' + info.response);
      return res.send('Correo de reseteo enviado.');
    }
  });
});

app.post('/verifyResetCode', async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ success: false, message: 'Email y código son requeridos.' });
  }
  try {
    const database = client.db('construccion');
    const User = database.collection('users');
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    }

    if (user.resetCode === code) {
      res.json({ success: true, message: 'Código verificado correctamente.', email: email });
      await User.updateOne({ email: email }, { $set: { resetCode: '' } });
    } else {
      res.status(400).json({ success: false, message: 'Código inválido o expirado.' });
    }
  } catch (error) {
    console.error('Error al verificar el código de restablecimiento:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
});

app.post('/loginInsta', async (req, res) => {
  const correo = req.body.email;
  try {
    const database = client.db('construccion');
    const User = database.collection('users');
    const user = await User.findOne({ email: correo });
    if (user) {
      const password = user.password;
      const email2 = user.email;
      res.json({ success: true, password, email2 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.post('/update-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    await updateUserPassword(userId, newPassword);
    res.send('Contraseña actualizada con éxito.');
  } catch (error) {
    res.status(400).send('Error al actualizar la contraseña.');
  }
});

app.get('/verify', async (req, res) => {
  const { token } = req.query
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    const rol = 'alumno'
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
      role,
      rut,
      matricula
    } = decoded

    const emailDomain = email.split('@')[1];
    if (emailDomain === 'utalca.cl') {
      rol = 'profesor';
    }

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
        role: rol,
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
//actualizar ciertos datos del perfil
app.post('/verify_password', async (req, res) => {
  const database = client.db('construccion')
  const User = database.collection('users')
  try {
    const email = { email: req.body.email }
    const val_password = { val_password: req.body.val_password }

    // Busca al usuario en la base de datos
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ passwordCorrect: false })
    }
    const passwordCorrect = await bcrypt.compare(val_password, user.password)
    res.json(passwordCorrect)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})
app.post('/edit_username', async (req, res) => {
  try {
    const database = client.db('construccion')
    const User = database.collection('users')
    const filter = { email: req.body.email }
    const update = { username: req.body.new_username }
    if (update != '') {
      const poster = await User.updateOne(filter, { $set: update })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})
app.post('/edit_password', async (req, res) => {
  try {
    const database = client.db('construccion')
    const User = database.collection('users')
    const filter = { email: req.body.email }
    const update1 = { password: req.body.new_password, confirmPassword: req.body.new_password }
    if (update1 != '' || update1 != ' ') {
      const poster = await User.updateOne(filter, { $set: update1 })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})
app.post('/anadir_Usuario', async (req, res) => {

  try {
    const database = client.db('construccion')
    const Sesion = database.collection('sesion')
    const nuevos_usuarios = req.body.users;
    const sesion_id = req.body.sesion_id;

    const result = await Sesion.updateOne({ _id: new ObjectId(sesion_id) }, { $push: { participantes: { $each: nuevos_usuarios } } });

    if (result.matchedCount === 0) {
      res.status(404).send('No se encontró la sesión con el id proporcionado');
    } else if (result.modifiedCount === 0) {
      res.status(400).send('No se pudo actualizar la sesión');
    } else {
      res.status(200).send('Usuarios añadidos exitosamente');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al añadir los usuarios');
  }
});
//--------------------
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

// Actualizar datos usuario especifico
app.post('/user/:id', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('users')
    const consulta = { _id: new ObjectId(req.params.id) }
    const result = await collection.updateOne(consulta, { $set: req.body })
    if (result.modifiedCount === 1) {
      res.send(result)
    } else {
      res.status(404).send('Ususaio no encontrado')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}
)

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
      asignatura: req.body.asignatura,
      creador: req.body.creador,
      participantes: [],
      banlist: [],

    }
    //console.log("enviando", newSession.nombre, newSession.descripcion)
    const result = await collection.insertOne(newSession)
    res.status(200).json({ _id: result.insertedId });
  } catch (error) {
    console.error('Error inserting document:', error)
    res.status(500).send('Error inserting document')
  }
})

// Banear o expulsar a un alumno de una sesión

app.post('/banearExpulsar/:id', async (req, res) => {
  try {
    const database = client.db('construccion');
    const collection = database.collection('sesion');
    const sessionId = req.params.id;
    const bannedEmail = req.body.email;
    const userId = req.body.userId;
    const banear = req.body.banear;
    console.log(sessionId, bannedEmail, userId, banear);

    // Revisa si la sesión existe
    const session = await collection.findOne({ _id: new ObjectId(sessionId) });

    if (!session) {
      return res.status(404).json({ message: 'Sesión no encontrada' });
    }

    let resultMessage = '';

    if (banear) {
      // Actualiza la lista de correos baneados de la sesión
      const result = await collection.updateOne(
        { _id: new ObjectId(sessionId) },
        { $addToSet: { banlist: bannedEmail } }
      );

      if (result.matchedCount == 1) {
        resultMessage = 'Alumno baneado de la sesión';
      }
    }

    const removeResult = await collection.updateOne(
      { _id: new ObjectId(sessionId) },
      { $pull: { participantes: userId } }
    );

    if (removeResult.modifiedCount > 0) {
      if (resultMessage) {
        resultMessage += ' y expulsado de la lista de participantes.';
      } else {
        resultMessage = 'Alumno expulsado de la lista de participantes.';
      }
    } else {
      if (!resultMessage) {
        return res.status(404).json({ success: false, message: 'Problema encontrado al intentar banear al alumno' });
      }
    }

    res.json({ success: true, message: resultMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



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

////////Funciones asociadas a los mensajes

// Crear un nuevo mensaje
app.post('/message', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('mensajes')
    const newMessage = {
      destinatario: req.body.destinatario,
      mensaje: req.body.mensaje,
      remitente: req.body.remitente,
      visto: false,
      alerta: ''
    }
    const result = await collection.insertOne(newMessage)
    res.sendStatus(200)
  } catch (error) {
    console.error('Error inserting document:', error)
    res.status(500).send('Error inserting document')
  }
})

//traer todos los mensajes (No muy util)
app.get('/message/', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('mensajes')
    // Lista de mensajes completa
    const result = await collection.find({}).toArray()
    res.status(200).send(result)

  } catch (error) {
    res.status(500).send(error.message)
  }
})

// traer los mensajes recibidos por un alumno especifico
app.get('/message/:id', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('mensajes')
    // Lista de mensajes completa
    const result = await collection.find({}).toArray()
    let mensajesEspecificos = []
    // revisamos todos los mensajes y guardamos aquellos que tengan remitente igual al id

    if (!result) {
      res.status(404).send('user not found')
    }

    result.forEach(element => {
      if (element.destinatario == req.params.id) {
        mensajesEspecificos.push(element)
      }
    });

    res.status(200).send(mensajesEspecificos)


  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Actualizar estado de visto de un mensaje
app.put('/message/:id', async (req, res) => {
  try {
    const database = client.db('construccion')
    const collection = database.collection('mensajes')
    const consulta = { _id: new ObjectId(req.params.id) }
    const result = await collection.updateOne(consulta, {
      $set: { visto: true }
    })

    if (result.modifiedCount === 1) {
      res.send(result)
    } else {
      res.status(404).send('Mensaje no encontrado')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})



























// Enviar email (página contacto)
app.post('/send-email', async (req, res) => {
  let { fullName, email, mobile, msg } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'pruebas.construccion2024@outlook.com',
      pass: 'RkUFFzM1LUTk'
    }
  });

  let mailOptions = {
    from: 'pruebas.construccion2024@outlook.com',
    to: 'pruebas.construccion2024@outlook.com',
    subject: `Mensaje de ${fullName}`,
    text: `Nombre: ${fullName}\nEmail: ${email}\nTeléfono: ${mobile}\nMensaje: ${msg}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Correo electrónico enviado correctamente');
  } catch (error) {
    console.error('Hubo un error al enviar el correo electrónico', error);
    res.status(500).send('Hubo un error al enviar el correo electrónico');
  }
});

/* revisiar esta funcion de grupo joaquin*/
app.post('/guardar-procesos', async (req, res) => {
  const database = client.db('construccion');
  const collection = database.collection('procesos');
  try {
    const response = await axios.get('http://127.0.0.1:5000/historial');
    const aplicaciones = response.data;

    if (aplicaciones.length > 0) {
      await collection.insertOne(aplicaciones);
      res.status(200).send('Historial guardado en la base de datos');
    } else {
      res.status(204).send('No hay aplicaciones para guardar');
    }
  } catch (error) {
    console.error('Error al guardar el historial:', error);
    res.status(500).send('Error al guardar el historial');
  }
});

app.post('/processTabs', (req, res) => {
  const { userId, urls } = req.body;
  console.log('Received data:', { userId, urls });

  // Guardar datos en MongoDB
  const database = client.db('construccion');
  const collection = database.collection('Pestanas'); // Nombre de la colección en MongoDB

  // Insertar documento con userId y URLs en la colección
  collection.insertOne({ userId, urls })
    .then(result => {
      console.log('Datos guardados en MongoDB:', result.ops);
      res.send('Datos recibidos y guardados en MongoDB');
    })
    .catch(err => {
      console.error('Error al guardar datos en MongoDB:', err);
      res.status(500).send('Error interno del servidor al guardar datos en MongoDB');
    });
});

app.post('/checkTabs', (req, res) => {
  const { userId, urls } = req.body;
  console.log('Checking data:', { userId, urls });

  const database = client.db('construccion');
  const collection = database.collection('Pestanas');

  // Buscar si ya existe algún documento con las mismas userId y URLs en la colección
  collection.findOne({ userId, urls })
    .then(doc => {
      if (doc) {
        // Si se encuentra un documento, significa que las URLs ya existen para ese usuario
        console.log('Las URLs ya existen en la base de datos para este usuario:', doc);
        res.json({ exists: true }); // Responder que los datos ya existen
      } else {
        // Si no se encuentra ningún documento, las URLs no existen aún para ese usuario
        console.log('Las URLs no existen en la base de datos para este usuario, se pueden procesar.');
        res.json({ exists: false }); // Responder que los datos no existen y pueden ser procesados
      }
    })
    .catch(err => {
      console.error('Error al buscar en la base de datos:', err);
      res.status(500).send('Error interno del servidor al buscar en la base de datos');
    });
});

app.get('/getTabs/:userId', (req, res) => {
  try {
    const userId = req.params.userId; // Obtener el userId de los parámetros de la URL

    const database = client.db('construccion');
    const collection = database.collection('Pestanas');

    // Buscar documentos con el userId específico en la colección
    collection.find({ userId }).toArray()
      .then(docs => {
        if (docs.length === 0) {
          // Si no se encuentra ningún documento para el userId dado
          res.status(404).send('No se encontraron pestañas para el usuario.');
        } else {
          // Si se encuentran documentos, enviar las URLs encontradas
          const urls = docs.map(doc => doc.urls);
          res.json(urls);
        }
      })
      .catch(err => {
        console.error('Error al buscar en la base de datos:', err);
        res.status(500).send('Error interno del servidor al buscar en la base de datos');
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
});