const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Módulo para encriptar las contraseñas
const bcrypt = require("bcrypt-nodejs");
//Módulo para crear hash en md5
const crypto = require("crypto");

const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    displayName: String,
    avatar: String,
    password: {type: String, select: false},
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date
});


//Mongoose nos permite ejecutar funciones antes o despues de almacenar los datos en la BD. En este caso antes de
//almacenar los datos encriptamos los datos
UserSchema.pre("save", function(next) {
    let user = this; //En user tenemos los datos del Schema
    if (!user.isModified("password")) return next(); //Si la password no se a modificado pasamos al siguiente middleware

    //genera clave de encriptado y se almacena en "salt"
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        //Generamos hash con el password y el salt
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });

});

//Usamos la llamada de metodos de mongoose para llamar al servicio "gravatar" que se usa para asociar emails con avatares
UserSchema.methods.gravatar = () => {
    if (!this.email) return "https://gravatar.com/avatar/?s2006=retro" //Si el usuario no ha introducido un email, le ponemos una avatar por defecto

    //creamos un hash en md5
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `"https://gravatar.com/avatar/${md5}?s2006=retro`;
}
module.exports = mongoose.model("User", UserSchema);