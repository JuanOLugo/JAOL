const mongoose = require('mongoose');

// Seleccionamos la uri depende de como estemos ejecutando el servidor
const MONGO_URI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_TEST

// Nos conectamos al la base de datos
mongoose.connect(MONGO_URI)
    .then(() => console.log("DB IS UP"))
    .catch(err => console.log(err))