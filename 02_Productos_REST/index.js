const mongoose = require("mongoose");
const app = require("./app");

const config = require("./config");

//Conexxion a mongo
mongoose.connect(config.db, (err, res) => {
    if (err)
        return console.log(`Error al conectar a la BBDD: ${err}`);

    console.log("Conexión a la BBDD establecida...");
});

// Settings
app.set('port', config.port);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port http://localhost:${app.get('port')}`);
});