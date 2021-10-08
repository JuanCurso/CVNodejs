const ObjectID = require("bson").ObjectID
const mongoose = require("mongoose")
const Producto = require("./producto").Producto

let esquemaPedido = new mongoose.Schema({
    
	codigo 		 : String,
	fecha  		 : String,
	estado 		 : String, 
	total  		 : Number,
	dirEntrega   : String,
	formaPago    : String,
	fechaEntrega : String,

	usuario : {
		_id       : ObjectID,
		login     : String,
		//pw      : String,
		//rol     : String,
		nombre    : String,
		direccion : String,
		telefono  : String,
		correoE   : String,
		idioma    : String
	},

	detalles : [{
		cantidad : Number,
		precio   : Number,
		producto : Producto.schema
	}]
})

exports.Pedido = mongoose.model('pedidos', esquemaPedido)

