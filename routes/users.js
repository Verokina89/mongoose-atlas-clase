// users.js

const express = require("express");
const router = express.Router();
const User = require("../models/user"); 

//// Ruta para obtener todos los usuarios
router.get('/users', (req, res) => {
    res.json({ message: 'Lista de usuarios' });
});

// Ruta para crear un nuevo usuario
router.post("/create", async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a user" });
    }
});

module.exports = router;