const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');


const app = express();
let mqttData = null;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

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
mqttClient.subscribe('/pruebas', { qos: 0});

// Manejar mensajes MQTT cuando se reciban
mqttClient.on('message', (topic, message) => {
  if (topic === '/pruebas') {
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
  } else {
    res.status(404).json({ error: 'No se han recibido datos MQTT' });
  }
});

app.use(cors(corsOptions)); 
app.options('*', cors(corsOptions)); 
app.use(express.json());

//PUBLICAR MENSAJE
// const mensaje = "Ola desde api";
// mqttClient.publish('/pruebas', mensaje, { qos: 0 }, (error) => {
//   if (!error) {
//     console.log('Mensaje MQTT enviado con éxito');
//   } else {
//     console.error('Error al enviar el mensaje MQTT:', error);
//   }
// });



app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});
