let mongoose = require("mongoose")

let esquemaProducto = new mongoose.Schema({
	nombre      : String,
	categoria   : String,
	fabricante  : String, 
	descripcion : String,
	imagen      : String,
	precio      : Number,
	existencias : Number
})

exports.Producto = mongoose.model('productos', esquemaProducto)