let mongoose = require("mongoose")

let esquemaUsuario = new mongoose.Schema({
    login     : String,
    pw        : String,
    rol       : String,
    nombre    : String,
    direccion : String,
    telefono  : String,
    correoE   : String,
    idioma    : String
})

exports.Usuario = mongoose.model('usuarios', esquemaUsuario)

    