
const express = require("express");
const hbs = require("express-handlebars");
const api = require("./routes");

const app = express();

// Middlewares
app.engine(".hbs", hbs({
    defaultLayout: "default",
    extname: ".hbs"
}));
app.set("view engine", ".hbs");

app.use(express.json());
app.use("/api", api);

//vistas
app.get("/login", (req,res) => {
    res.render("login");
});
app.get('/', (req, res) => {
    res.render('product')
  })

module.exports = app;