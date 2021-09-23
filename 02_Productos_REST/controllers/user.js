
const mongoose = require("mongoose");

const service = require("../services/index");
const User = require("../models/user");

//Funcion de registro
function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        //avatar: se crea en el modelo
        password: req.body.password
        //signupDate: pone por defecto la fecha actual
        //lastLogin: no es necesario en el registro
    });

    user.save(err => {
        if (err) return res.status(500).send({message: `Error al registrar usuario: ${err}`});

        //Si ha ido bien, se crea y envía el token del json web token(jwt)
        return res.status(200).send({ token: service.createToken(user)});
    });
}

function signIn(req, res) {
    User.find({email: req.body.email}, (err, user) => {
        if(err) return res.status(500).send({message: err});
        if(!user) return res.status(404).send({message: "No existe el usuario"});

        req.user = user;
        res.status(200).send({
            message: "Te has logeado correctamente",
            token: service.createToken(user)
    })
    });
}

module.exports = {
    signUp,
    signIn
}