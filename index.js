const express = require('express');
const app = express();
const { dbConnection } = require('./config/config'); //Importar dbConnection
const routes = require('./routes'); // Importar el archivo index.js de rutas

// Middleware que analiza el cuerpo de las solicitudes
app.use(express.json());

// Usa las rutas definidas
app.use('/', routes);

app.post('/', (req, res) => {
    res.send('¡Solicitud POST recibida!');
});

// Llamar a dbConnection para conectar a MongoDB
dbConnection();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}/`);
});

