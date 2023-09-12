const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');


const app = express();
let mqttData = null;

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200', // Cambia esto a tu origen permitido
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Habilita CORS para toda la aplicación
app.options('*', cors(corsOptions)); // Configura las opciones CORS para permitir preflight requests
app.use(express.json());

const PORT = process.env.PORT || 3000;



const mqttOptions = {
  username: 'proyecto',
  password: 'grupoiot',
};


// Conexión MQTT con credenciales
const mqttClient = mqtt.connect('http://35.208.119.146', mqttOptions); // Reemplaza con la URL de tu servidor MQTT

mqttClient.on('connect', () => {
  console.log('Conectado al servidor MQTT');
});
mqttClient.on('error', (error) => {
  console.error('Error en la conexión MQTT:', error);
});


//SUSCRIBIRSE A UN TOPIC

// Manejar mensajes MQTT cuando se reciban
// mqttClient.on('message', (topic, message) => {
//   if (topic === '/pruebas') {
//     const data = message.toString();
//     res.json({ data });
//   }
// });
const mqttSus = mqttClient.subscribe('test/server/channel_A', { qos: 2});

const mqttCon = mqttClient.subscribe('test/server', { qos: 2 });

// Manejar mensajes MQTT cuando se reciban
mqttSus.on('message', (topic, message) => {
  if (topic === 'test/server/channel_A') {
    mqttData = message.toString();
    console.log('Mensajes: ',mqttData);
  }
});



// Ruta de ejemplo para obtener datos MQTT como respuesta JSON
app.get('/picoscope', (req, res) => {
  if (mqttData) {
    console.log('Conectado');
    const data = { data: mqttData };
    res.json(data);
    res.render('index', {data})

  } else {
    res.status(404).json({ error: 'No se han recibido datos MQTT' });
  }
});



// Ruta para enviar un mensaje MQTT utilizando POST
app.post('/conectar', (req, res) => {
  // Obtener el mensaje desde el cuerpo de la solicitud
  const mensaje = req.body.mensaje; 

  // Verificar si se proporcionó un mensaje
  if (!mensaje) {
    return res.status(400).json({ error: 'Se requiere un mensaje en el cuerpo de la solicitud' });
  }

  // Publicar el mensaje en el tópico MQTT deseado
  mqttClient.publish('test/server', mensaje, { qos: 2 }, (error) => {
    if (!error) {
      console.log('Mensaje MQTT enviado con éxito:', mensaje);
      res.json({ mensaje: 'Mensaje MQTT enviado con éxito' });
    } else {
      console.error('Error al enviar el mensaje MQTT:', error);
      res.status(500).json({ error: 'Error al enviar el mensaje MQTT' });
    }
  });
});

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});
