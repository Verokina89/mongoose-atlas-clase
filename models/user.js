// User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Requerir bcrypt para manejar el hash de contraseñas

// const UserSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
// }, { timestamps: true });

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Asegura que el campo sea obligatorio
    },
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que el email sea único
        match: [/.+\@.+\..+/, "Please provide a valid email address"], // Validación para el formato del email
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // Asegura que la contraseña tenga una longitud mínima
    },
}, { timestamps: true });

// Middleware Mongoose para poder encriptar la contraseña antes de guardar el usuario
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Si la contraseña no ha sido modificada, pasar al siguiente middleware
    
    try {
        const salt = await bcrypt.genSalt(10); // Generar un "salt" con un factor de complejidad de 10
        this.password = await bcrypt.hash(this.password, salt); // Hashear la contraseña
        next(); // Continuar con la operación de guardado
    } catch (err) {
        next(err); // Si ocurre un error, pasar el control con el error
    }
});

// Crear el modelo de usuario a partir del esquema
const User = mongoose.model('User', UserSchema);

module.exports = User;

