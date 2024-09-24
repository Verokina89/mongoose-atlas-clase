// ./config/config.js
const mongoose = require('mongoose');
// require('dotenv').config(); // Cargar las variables de entorno del archivo .env
const dotenv = require('dotenv');

dotenv.config(); // Cargar las variables de entorno desde el archivo .env


const dbConnection = async () => {
    try {
        // Verifica si la URI es válida
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('La URI de MongoDB no está definida en el archivo .env');
        }
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error a la hora de iniciar la base de datos', error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};


module.exports = {
    dbConnection,
};