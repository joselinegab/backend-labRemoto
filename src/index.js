const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');


const app = express();
let mqttData = null;
let mqttData2 = null;
let mqttDataLuz = null;
let mqttDataHz = null;
let mqttDataMv = null;
let mqttDataV = null;
let mqttDataDireccionIzq = null;
let mqttDataDireccionDere = null;
let mqttDataB = null;

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
const mqttCon = mqttClient.subscribe('test/server', { qos: 2 });
const mqttSus = mqttClient.subscribe('test/server/channel_A', { qos: 2});
const mqttSusB = mqttClient.subscribe('test/server/channel_B', { qos: 2});
const mqttConf = mqttClient.subscribe('test/multimetro', { qos: 2 });
const mqtMultiValor = mqttClient.subscribe('test/multimetro/valores', { qos: 2});
const mqtMultiLuz = mqttClient.subscribe('test/multimetro/luz', { qos: 2});
const mqtMultiMv = mqttClient.subscribe('test/multimetro/Mv', { qos: 2});
const mqtMultiHz = mqttClient.subscribe('test/multimetro/Hz', { qos: 2});
const mqtMultiV = mqttClient.subscribe('test/multimetro/V', { qos: 2});
const mqtMultiDireccionIzq = mqttClient.subscribe('test/multimetro/izquierda', { qos: 2});
const mqtMultiDireccionDere = mqttClient.subscribe('test/multimetro/derecha', { qos: 2});


// Manejar mensajes MQTT cuando se reciban
mqttSus.on('message', (topic, message) => {
  if (topic === 'test/server/channel_A') {
    mqttData = message.toString();
    console.log('Mensajes: ',mqttData);
  }
});
mqttSusB.on('message', (topic, message) => {
  if (topic === 'test/server/channel_B') {
    mqttDataB = message.toString();
    console.log('MensajesB: ',mqttDataB);
  }
});

mqtMultiValor.on('message', (topic, message) => {
  if (topic === 'test/multimetro/valores') {
    mqttData2 = message.toString();
    console.log('Mensajes: ',mqttData2);
  }
});

mqtMultiLuz.on('message', (topic, message) => {
  if (topic === 'test/multimetro/luz') {
    mqttDataLuz = message.toString();
    console.log('Mensajes: ',mqttDataLuz);
  }
});

mqtMultiMv.on('message', (topic, message) => {
  if (topic === 'test/multimetro/Mv') {
    mqttDataMv = message.toString();
    console.log('Mensajes: ',mqttDataMv);
  }
});

mqtMultiHz.on('message', (topic, message) => {
  if (topic === 'test/multimetro/Hz') {
    mqttDataHz = message.toString();
    console.log('Mensajes: ',mqttDataHz);
  }
});
mqtMultiV.on('message', (topic, message) => {
  if (topic === 'test/multimetro/V') {
    mqttDataV = message.toString();
    console.log('Mensajes: ',mqttDataV);
  }
});
mqtMultiDireccionIzq.on('message', (topic, message) => {
  if (topic === 'test/multimetro/izquierda') {
    mqttDataDireccionIzq = message.toString();
    console.log('Mensajes: ',mqttDataDireccionIzq);
  }
});
mqtMultiDireccionDere.on('message', (topic, message) => {
  if (topic === 'test/multimetro/derecha') {
    mqttDataDireccionDere = message.toString();
    console.log('Mensajes: ',mqttDataDireccionDere);
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

app.get('/picoscopeA', (req, res) => {
  if (mqttData) {
    // Asegúrate de que mqttData sea un arreglo
    const data = Array.isArray(mqttData) ? mqttData : [mqttData];
    res.json(data);
  } else {
    res.status(404).json({ error: 'No se han recibido datos MQTT' });
  }
});

app.get('/picoscopeB', (req, res) => {
  if (mqttDataB) {
    // Asegúrate de que mqttData sea un arreglo
    const data = Array.isArray(mqttDataB) ? mqttDataB : [mqttDataB];
    res.json(data);
  } else {
    res.status(404).json({ error: 'No se han recibido datos MQTT' });
  }
});

app.get('/multimetrovalor', (req, res) => {
  if (mqttData2) {
    console.log('Conectado');
    const data = { data: mqttData2 };
    res.json(data);
    res.render('index', {data})

  } else {
    res.status(404).json({ error: 'No se han recibido datos MQTT' });
  }
});

app.get('/multimetroluz', (req, res) => {
  if (mqttDataLuz) {
    console.log('Conectado');
    const data = { data: mqttDataLuz };
    res.json(data);
    res.render('index', {data})

  } else {
    res.status(404).json({ error: 'No se han recibido datos MQTT' });
  }
});

app.get('/multimetroHz', (req, res) => {
  if (mqttDataHz) {
    console.log('Conectado');
    const data = { data: mqttDataHz };
    res.json(data);
    res.render('index', {data})

  } else {
    res.status(404).json({ error: 'No se han recibido datos MQTT' });
  }
});

app.get('/multimetroMv', (req, res) => {
  if (mqttDataMv) {
    console.log('Conectado');
    const data = { data: mqttDataMv };
    res.json(data);
    res.render('index', {data})

  } else {
    res.status(404).json({ error: 'No se han recibido datos MQTT' });
  }
});

app.get('/multimetroV', (req, res) => {
  if (mqttDataV) {
    console.log('Conectado');
    const data = { data: mqttDataV };
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


// Ruta para enviar un mensaje MQTT utilizando POST
app.post('/conectarmultivalor', (req, res) => {
  // Obtener el mensaje desde el cuerpo de la solicitud
  const mensaje = req.body.mensaje; 

  // Verificar si se proporcionó un mensaje
  if (!mensaje) {
    return res.status(400).json({ error: 'Se requiere un mensaje en el cuerpo de la solicitud' });
  }

  // Publicar el mensaje en el tópico MQTT deseado
  mqttClient.publish('test/multimetro/valores', mensaje, { qos: 2 }, (error) => {
    if (!error) {
      console.log('Mensaje MQTT enviado con éxito valor:', mensaje);
      res.json({ mensaje: 'Mensaje MQTT enviado con éxito' });
    } else {
      console.error('Error al enviar el mensaje MQTT:', error);
      res.status(500).json({ error: 'Error al enviar el mensaje MQTT' });
    }
  });
});

// Ruta para enviar un mensaje MQTT utilizando POST
app.post('/luz', (req, res) => {
  // Obtener el mensaje desde el cuerpo de la solicitud
  const mensaje = req.body.mensaje; 

  // Verificar si se proporcionó un mensaje
  if (!mensaje) {
    return res.status(400).json({ error: 'Se requiere un mensaje en el cuerpo de la solicitud' });
  }

  // Publicar el mensaje en el tópico MQTT deseado
  mqttClient.publish('test/multimetro/luz', mensaje, { qos: 2 }, (error) => {
    if (!error) {
      console.log('Mensaje MQTT enviado con éxito luz: ', mensaje);
      res.json({ mensaje: 'Mensaje MQTT enviado con éxito' });
    } else {
      console.error('Error al enviar el mensaje MQTT:', error);
      res.status(500).json({ error: 'Error al enviar el mensaje MQTT' });
    }
  });
});


// Ruta para enviar un mensaje MQTT utilizando POST
app.post('/Hz', (req, res) => {
  // Obtener el mensaje desde el cuerpo de la solicitud
  const mensaje = req.body.mensaje; 

  // Verificar si se proporcionó un mensaje
  if (!mensaje) {
    return res.status(400).json({ error: 'Se requiere un mensaje en el cuerpo de la solicitud' });
  }

  // Publicar el mensaje en el tópico MQTT deseado
  mqttClient.publish('test/multimetro/Hz', mensaje, { qos: 2 }, (error) => {
    if (!error) {
      console.log('Mensaje MQTT enviado con éxito luz: ', mensaje);
      res.json({ mensaje: 'Mensaje MQTT enviado con éxito' });
    } else {
      console.error('Error al enviar el mensaje MQTT:', error);
      res.status(500).json({ error: 'Error al enviar el mensaje MQTT' });
    }
  });
});

// Ruta para enviar un mensaje MQTT utilizando POST
app.post('/Mv', (req, res) => {
  // Obtener el mensaje desde el cuerpo de la solicitud
  const mensaje = req.body.mensaje; 

  // Verificar si se proporcionó un mensaje
  if (!mensaje) {
    return res.status(400).json({ error: 'Se requiere un mensaje en el cuerpo de la solicitud' });
  }

  // Publicar el mensaje en el tópico MQTT deseado
  mqttClient.publish('test/multimetro/Mv', mensaje, { qos: 2 }, (error) => {
    if (!error) {
      console.log('Mensaje MQTT enviado con éxito luz: ', mensaje);
      res.json({ mensaje: 'Mensaje MQTT enviado con éxito' });
    } else {
      console.error('Error al enviar el mensaje MQTT:', error);
      res.status(500).json({ error: 'Error al enviar el mensaje MQTT' });
    }
  });
});

// Ruta para enviar un mensaje MQTT utilizando POST
app.post('/V', (req, res) => {
  // Obtener el mensaje desde el cuerpo de la solicitud
  const mensaje = req.body.mensaje; 

  // Verificar si se proporcionó un mensaje
  if (!mensaje) {
    return res.status(400).json({ error: 'Se requiere un mensaje en el cuerpo de la solicitud' });
  }

  // Publicar el mensaje en el tópico MQTT deseado
  mqttClient.publish('test/multimetro/V', mensaje, { qos: 2 }, (error) => {
    if (!error) {
      console.log('Mensaje MQTT enviado con éxito luz: ', mensaje);
      res.json({ mensaje: 'Mensaje MQTT enviado con éxito' });
    } else {
      console.error('Error al enviar el mensaje MQTT:', error);
      res.status(500).json({ error: 'Error al enviar el mensaje MQTT' });
    }
  });
});

// Ruta para enviar un mensaje MQTT utilizando POST
app.post('/izquierda', (req, res) => {
  // Obtener el mensaje desde el cuerpo de la solicitud
  const mensaje = req.body.mensaje; 

  // Verificar si se proporcionó un mensaje
  if (!mensaje) {
    return res.status(400).json({ error: 'Se requiere un mensaje en el cuerpo de la solicitud' });
  }

  // Publicar el mensaje en el tópico MQTT deseado
  mqttClient.publish('test/multimetro/izquierda', mensaje, { qos: 2 }, (error) => {
    if (!error) {
      console.log('Mensaje MQTT enviado con éxito luz: ', mensaje);
      res.json({ mensaje: 'Mensaje MQTT enviado con éxito' });
    } else {
      console.error('Error al enviar el mensaje MQTT:', error);
      res.status(500).json({ error: 'Error al enviar el mensaje MQTT' });
    }
  });
});

// Ruta para enviar un mensaje MQTT utilizando POST
app.post('/derecha', (req, res) => {
  // Obtener el mensaje desde el cuerpo de la solicitud
  const mensaje = req.body.mensaje; 

  // Verificar si se proporcionó un mensaje
  if (!mensaje) {
    return res.status(400).json({ error: 'Se requiere un mensaje en el cuerpo de la solicitud' });
  }

  // Publicar el mensaje en el tópico MQTT deseado
  mqttClient.publish('test/multimetro/derecha', mensaje, { qos: 2 }, (error) => {
    if (!error) {
      console.log('Mensaje MQTT enviado con éxito luz: ', mensaje);
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