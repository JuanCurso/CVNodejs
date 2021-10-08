const express = require("express")
const negocioCompras = require("../modelo/negocio/negocioCompras")

let router = express.Router()

router.post("/ordenes_compra", comprar)

exports.router = router

/////////////////////////////////////
//Funciones de la lógica de control//
/////////////////////////////////////

//POST /ordenes_compra
//CT:app/json
//--------------------
//{ pedido }
function comprar(request, response){

    let pedido = request.body
    negocioCompras.comprar(pedido, request.autoridad)
    .then( respuesta => response.json(respuesta) )
    .catch( error => {
        response.statusCode = error.codigo
        response.json(error)
    } )

}


