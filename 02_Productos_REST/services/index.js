
/*Servicios para el manejo de jwt(json web token https://jwt.io/). El cliente al registrar se crea un token que nos
permite identificalo en nuestra base de datos. La ventaja de usar jwt es que la lógica de registro, login, etc...
recae en la parte frontend, y el backend recibe y envía token para la autenticación.*/
const jwt = require("jwt-simple");

//Libreria para el manejo de fechas
const moment = require("moment");

const config = require("../config");
const User = require("../models/user");


function createToken(user) {
    //Es la información del usuario
    const payload = {
        //id del usuario, lo ideal es usar un id publico en lugar del id privado de mongoDB, pero en el tutorial usan el de mongodb
        sub: user._id,
        //fecha creación del token. Ponemos la fecha actual en formato unix
        iat: moment().unix(),
        //fecha expiración del token. Ponemos la fecha actual más 14 dias
        exp: moment().add(14, "days").unix()
    }

    //devolvemos el token creado
    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
    const decoded = new Promise((resove, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);

            if (payload.exp <= moment().unix())
                reject({
                    status: 401,
                    message: "El token ha expirado"
                });

            resove(payload.sub);

        } catch {
            reject({
                status: 500,
                message: "Invalid Token"
            })
        }
    })

    return decoded;
}

module.exports = {
    createToken,
    decodeToken
}