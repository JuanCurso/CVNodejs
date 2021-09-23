const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");

const mongoose = require("mongoose");

//Importamos el archivo de configuración
const conf = require("./config");

//Modelos

const persona = require("./models/persona");
const publicacion = require("./models/publicacion");

const app = express();

/*Para permitir el intercambio de Recursos de Origen Cruzado(CORS), es decir, poder acceder
a recursos que se encuentra en distintos dominios, es necesario instalar el plugging "cors" y
la siguiente línea*/
app.use(cors({origin: "*"}));

//limitamos la cantidad de datos json que podemos manejar.
app.use(express.json({limit:"50mb"})).use(express.urlencoded());

const router = express.Router();

app.use(router);




app.use(methodOverride());

app.use(conf.path, express.static(__dirname + conf.path));



mongoose.connect(conf.db, (err, res) => {
	if (err) throw err;

	console.log("conexión con mongoDB exitosa");
});

app.listen(conf.puerto, () => {
	console.log("conexión al servidor");
});


router.get("/", (req, res) => {
	console.log("peticion recibida.");
	res.end();
});

//obtener todas las personas
router
	.get("/persona", (req, res) => {
		persona.find({}, (err, miPersona) => {
			if (err) res.send({estado: {codigo: 0, respuesta: err.message}});

			res.send({estado: {codigo: 0, respuesta: "operacion lista personas exitosa"}, personas: miPersona});
		});
	})

	//obtener detalle de una persona
	.get("/persona/:id", (req, res) => {
		persona.findById(req.params.id, (err, miPersona) => {
			if (err) res.send({estado: {codigo: 0, respuesta: err.message}});

			res.send({estado: {codigo: 0, respuesta: "operacion detalle persona exitosa"}, persona: miPersona});
		});
	})
	//Dar de alta una persona
	.post("/persona", (req, res) => {
		console.log("peticion usuario post recibida.");

		var miPersona = new persona();
		miPersona.Nombre = req.body.Nombre;
		miPersona.Apellido = req.body.Apellido;
		miPersona.Edad = req.body.Edad;
		miPersona.isProfesional = true;

		miPersona.save((err, miPersona) => {
			if (err) res.send({estado: {codigo: 0, respuesta: err.message}});

			res.send({estado: {codigo: 0, respuesta: "operacion alta persona exitosa"}, persona: miPersona});
		});
	})
	//Modificar una persona
	.put("/persona/:id", (req, res) => {
		persona.findById(req.params.id, (err, miPersona) => {
		miPersona.Nombre = req.body.Nombre;
		miPersona.Apellido = req.body.Apellido;
		miPersona.Edad = req.body.Edad;
		miPersona.isProfesional = true;

		miPersona.save((err, miPersona) => {
			if (err) res.send({estado: {codigo: 0, respuesta: err.message}});

			res.send({estado: {codigo: 0, respuesta: "operación actualización persona exitosa"}, persona: miPersona});
			});
		});
	})
	//borrar una persona
	.delete("/persona/:id", (req, res) => {
		persona.findById(req.params.id, (err, miPersona) => {
		miPersona.remove((err, miPersona) => {
			if (err) res.send({estado: {codigo: 0, respuesta: err.message}});

			res.send({estado: {codigo: 0, respuesta: "operación eliminar persona exitosa"}, persona: miPersona});
			});
		});
	})

//obtener todas las publicaciones
router
	.get("/publicacion", (req, res) => {
		publicacion.find({}).populate("IdPersona")
		.exec((err, miPublicacion) => {
			if (err) res.send({estado: {codigo: 0, respuesta: err.message}});

			res.send({estado: {codigo: 0, respuesta: "operacion lista publicaciones exitosa"}, publicaciones: miPublicacion});
		});
	})
	//Dar de alta una publicaciones
	.post("/publicacion", (req, res) => {
		var miPublicacion = new publicacion();
		miPublicacion.Titulo = req.body.Titulo;
		miPublicacion.Texto = req.body.Texto;
		miPublicacion.IdPersona = req.body.IdPersona;

		var extension = "";

		if (req.body.Imagen != "") {
			//No tengo el nombre del fichero, ponemos siempre la extension .jpg
/*			extension = req.body.Imagen.split(".").pop();
			miPublicacion.Imagen = extension;*/

			miPublicacion.Imagen = "jpg";

			miPublicacion.save((err, miPublicacion) => {
				if (err) {
					res.send({estado: {codigo: 0, respuesta: err.message}});
				} else {
					require("fs").writeFile(`public/upload/${miPublicacion._id}.${miPublicacion.Imagen}`,
						req.body.Imagen, "base64", (err) => {
							if (err) res.send({estado: {codigo: 0, respuesta: err.message}});

							res.send({estado: {codigo: 0, respuesta: "operacion alta publicación exitosa"}, publicacion: miPublicacion});
						}
					);
				}
			});
		} 
	});