const express = require("express");

const api = express.Router();

const auth = require("../middlewares/auth");

const productCtrl = require("../controllers/product");
const userCtrl = require("../controllers/user");


//*********** ROUTES PRODUCTOS
//Obtener productos
api.get("/product", auth.isAuth, productCtrl.getProducts);
//Obtener detalle
api.get("/product/:id", productCtrl.getProduct);
//Alta producto
api.post("/product", productCtrl.addProduct);
//Actualizar producto
api.put("/product/:id", productCtrl.updateProduct);
//Borrar producto
api.delete("/product/:id", productCtrl.deleteProduct);

//*********** ROUTES USUARIOS
//Registro usuario
api.post("/signup", userCtrl.signUp);
//Login usuario
api.post("/signin", userCtrl.signIn);



//ruta privada
api.get("/private", auth.isAuth, (req,res) => {
    res.status(200).send({message: "Tienes acceso"});
});


module.exports = api;