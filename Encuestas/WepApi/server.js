var express = require("express"),
app = express(),
bodyParser  = require("body-parser"),
methodOverride = require("method-override");


var encuestas = require("./routes/encuestas");
var usuarios = require("./routes/usuarios");
var index = require("./routes/index");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use('/', index);
app.use('/encuesta', encuestas);
app.use('/usuarios', usuarios);

app.listen(3000, function() {
    console.log("Servidor iniciado correctamente");
});

module.exports = app;
