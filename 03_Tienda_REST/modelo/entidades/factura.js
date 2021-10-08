const ObjectID = require("bson").ObjectID
const mongoose = require("mongoose")
const Producto = require("./producto").Producto
const Pedido   = require("./pedido").Pedido

let esquemaFactura = new mongoose.Schema({
	codigo 		   : String,
	fecha  		   : String,
	estado 		   : String, 
	total  		   : Number,
	dirFacturacion : String,
	formaPago      : String,


	//Si queremos un subconjunto de las propiedades del usuario
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
	}],

	pedido : Pedido.schema
})

exports.Factura = mongoose.model('facturas', esquemaFactura)

