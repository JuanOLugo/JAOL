const express = require('express');
const cors = require('cors');
require("dotenv").config()

// Iniciamos la base de datos
require("./DB/start.DB")

// creamos nuestra app
const app = express()

//Usamos cors para trabajar con el cliente
app.use(cors())

// Usamos ex.json para recibir jsons como request
app.use(express.json())

//Ruta para users
app.use("/api/users", require("./ROUTES/user.ROUTES"))

//Ruta para las tiendas
app.use("/api/stores", require("./ROUTES/store.ROUTES"))

//handle errors middleware

// Elegimos el puerto depende como estemos runeando el server
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.PORT_TEST


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = server