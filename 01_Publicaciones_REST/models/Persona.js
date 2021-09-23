const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var personaSchema = new Schema({
	Nombre: String,
	Apellido: String,
	Edad: Number,
	Create_at: {type: Date, require: true, default: Date.now},
	isProfesional: Boolean
});

module.exports = mongoose.model("Persona", personaSchema);