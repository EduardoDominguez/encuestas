var express = require('express');
var router = express.Router();

const mongoCliente = require("mongodb").MongoClient;
const assert = require('assert');

//var url = "mongodb://localhost:27017";
var url = "mongodb://admin:Mario690@ds239703.mlab.com:39703/encuestas";
var ObjectID = require("mongodb").ObjectID;

var respuesta = {};
respuesta.estatus = "fail";
respuesta.mensaje = "No data found.";
respuesta.data = null;

router.get('/consultar/todo', function(req, res, next) {
    mongoCliente.connect(url, function(err, client){
        assert.equal(err, null);

        const db = client.db("encuestas");
        var query ={};
        db.collection('encuesta').find(query).toArray(function(err, result){
            assert.equal(err, null);
            respuesta.estatus="ok";
            respuesta.mensaje="Datos cargados con éxito";
            respuesta.data = result;
            res.json(respuesta);
            client.close();
        });
    });
});

router.get('/consultar/:id', function(req, res, next) {
    var id = req.params.id;
    mongoCliente.connect(url, function(err, client){
        assert.equal(err, null);

        const db = client.db("encuestas");

        var oId = new ObjectID(id);
        var query = {"_id": oId};
        db.collection('encuesta').findOne(query, function(err, result){
            assert.equal(err, null);
            respuesta.estatus="ok";
            respuesta.mensaje="Datos cargados con éxito";
            respuesta.data = result;
            res.json(respuesta);
            client.close();
        });
    });
});


router.get('/consultar/:id', function(req, res, next) {
    var id = req.params.id;
    mongoCliente.connect(url, function(err, client){
        assert.equal(err, null);

        const db = client.db("encuestas");

        var oId = new ObjectID(id);
        var query = {"_id": oId};
        db.collection('encuesta').findOne(query, function(err, result){
            assert.equal(err, null);
            respuesta.estatus="ok";
            respuesta.mensaje="Datos cargados con éxito";
            respuesta.data = result;
            res.json(respuesta);
            client.close();
        });
    });
});
module.exports = router;