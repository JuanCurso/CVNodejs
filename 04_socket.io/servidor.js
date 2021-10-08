//npm install socket.io
const socketIO = require("socket.io")
const http = require("http")

//Usaremos expres para entregar el contenido estático y para...
const express = require("express")

//Configuramos el servidor web para entregar 'cliente.html'
let app = express()

app.use(express.static("./recursos"))
//Creamos un API Rest para que los clientes listen las salas
//Las salas en socket io no tienen más que un nombre
let salas = [ "General", "Sala 1", "Sala 2", "Sala 3", "Sala 4" ]
app.get("/salas", function(request, response){
    response.json(salas)
})
//Arrancamos el servidor en el puerto 80
app.listen(81, function(){
    console.log("Esperando peticiones HTTP en el puerto 81")
})



const servidor = http.createServer(function(request,response){})

const io = socketIO(
    servidor,
    {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    
servidor.listen(8000, function(){
    console.log("Esperando conexiones Socket.io en el puerto 8000")
})


//En este array guardaremos la lista de alias de los usuarios conectados
let aliasUsuarios = []


io.on('connection', function(socket){
    
    console.log("Nueva conexión")

    socket.join("General")

    socket.on("alias", aliasRecibido)
    socket.on("mensaje", nuevoMensaje)
    socket.on("cambiarSala", cambiarSala)
    socket.on("disconnect", usuarioDesconectado)
})

function aliasRecibido(alias){

    console.log("Alias recibido:"+alias)
    
    let aliasRepetido = aliasUsuarios.find( elem => elem==alias )
    if(aliasRepetido){
        this.emit('aliasRepetido','pues eso')
        return
    }

    aliasUsuarios.push(alias)
    console.log(aliasUsuarios)
    //Asociamos el alias al socket. Dentro de estas funciones 'this' es el socket
    this.alias = alias
    //Enviamos los alias a todos los que estén conectados
    io.emit("aliasUsuarios", JSON.stringify(aliasUsuarios))
} 

function nuevoMensaje(mensaje){
    console.log("Mensaje recibido:"+mensaje)


    for(let room of this.rooms){
        if(room != this.id){
            io.to(room).emit("mensaje", mensaje)
        }
    }

}

function cambiarSala(sala){

    //Dentro de esta función 'this' es el socket
    console.log("El usuario "+this.alias+" se cambia a la sala "+sala)

    //Comprobamos que la sala existe
    if( !salas.find( s => s==sala ) ){
        console.log("La sala no existe")
        return
    }

    console.log("Antes",this.rooms)
    for(let room of this.rooms){
        //Todos los sockets están por defecto en una sala cuyo nombre coincide con su identificador
        if(room!=this.id){
            this.leave(room)
            let mensaje = JSON.stringify({ alias:"Chat3000", texto: this.alias+" ha abandonado la sala." })
            io.to(room).emit("mensaje", mensaje)
        }
    }
    //Avisamos a los usuarios de esa sala de que ha llegado otro
    let mensaje =JSON.stringify({ alias:"Chat3000", texto: this.alias+" se ha unido a la sala." })
    io.to(sala).emit("mensaje", mensaje)

    //Metemos al socket en la nueva sala
    this.join(sala)
    
    console.log("Despues",this.rooms)
}

function usuarioDesconectado(){
    console.log("Usuario desconectado:"+this.alias)
    
    for(let a=0;a<aliasUsuarios.length;a++){
        //En esta función 'this' es el socket
        if(aliasUsuarios[a]==this.alias){
            aliasUsuarios.splice(a,1)
            break;
        }
    }  
    //Avisamos a todo el mundo de que la lista de usuarios ha cambiado    
    io.emit("aliasUsuarios", JSON.stringify(aliasUsuarios))

    let mensaje =JSON.stringify({ alias:"Chat3000", texto: this.alias+" ha abandonado el chat." })
    io.emit("mensaje", mensaje)    
}

