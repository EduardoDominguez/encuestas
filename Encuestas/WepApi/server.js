var express = require("express"),
bodyParser  = require("body-parser"),
methodOverride = require("method-override"),
app = express()
;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(methodOverride());

// Add headers
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    next();
});


var encuestas = require("./routes/encuestas");
var usuarios = require("./routes/usuarios");
var index = require("./routes/index");

app.use('/', index);
app.use('/encuesta', encuestas);
app.use('/usuarios', usuarios);

app.listen(3000, function() {
    console.log("Servidor iniciado correctamente");
});

module.exports = app;
