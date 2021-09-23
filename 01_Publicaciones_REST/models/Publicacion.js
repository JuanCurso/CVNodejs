const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var publicacionSchema = new Schema({
	Titulo: String,
	Texto: String,
	Imagen: String,
	Create_at: {type: Date, require: true, default: Date.now},
	IdPersona: {type: Schema.ObjectId, ref: "Persona"}
});

module.exports = mongoose.model("Publicacion", publicacionSchema);