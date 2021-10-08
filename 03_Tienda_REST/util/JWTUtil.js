const fs = require('fs')

let clave = null

exports.getClave = function(){
    if(!clave){
        //Aqui podríamos inventarnos una clave en lugar de tenerla guardada en un fichero
        clave = fs.readFileSync('./certificado/clave.key')
    }
    return clave
}