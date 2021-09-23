
/*Middleware para proteger rutas.*/

const service = require("../services/index");
const User = require("../models/user");
const { response } = require("express");

//comprueba si el cliente está autenticado
function isAuth(req, res, next) {
    if (!req.headers.authorization)
        return res.status(403).send({message: "No tienes autorización"});

    //El campo authorization de la cabecera contiene: "Bearer"+ " "+token. Por tanto, con la siguiente línea nos quedamos con el token
    const token = req.headers.authorization.split(" ")[1];

    service.decodeToken(token)
        .then(response => {
            req.user = response;
            next();
        })
        .catch(response => {
            res.status(response.status).send(response.message);
        });
}

module.exports = {
    isAuth
}