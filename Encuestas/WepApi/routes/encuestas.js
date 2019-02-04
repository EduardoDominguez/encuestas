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
    respuesta.data = null;
    mongoCliente.connect(url, function(err, client){
        assert.equal(err, null);

        const db = client.db("encuestas");
        var query ={};
        db.collection('encuesta').find(query).toArray(function(err, result){
            //assert.equal(err, null);
            if(err){
                respuesta.estatus = "fail";
                respuesta.mensaje = err;
                res.json(respuesta);
            }
            respuesta.estatus="ok";
            respuesta.mensaje="Datos cargados con éxito";
            respuesta.data = result;
            res.json(respuesta);
            client.close();
        });

    });
});

router.get('/consultar/:id', function(req, res, next) {
    respuesta.data = null;
    var id = req.params.id;
    mongoCliente.connect(url, function(err, client){
        assert.equal(err, null);

        const db = client.db("encuestas");

        var oId = new ObjectID(id);
        var query = {"_id": oId};
        db.collection('encuesta').findOne(query, function(err, result){
            //assert.equal(err, null);
            if(err){
                respuesta.estatus = "fail";
                respuesta.mensaje = err;
                res.json(respuesta);
            }
            respuesta.estatus="ok";
            respuesta.mensaje="Datos cargados con éxito";
            respuesta.data = result;
            res.json(respuesta);
            client.close();
        });
    });
});

router.post('/', function(req, res, next) {
    respuesta.data = null;
    var encuesta = req.body;
    
    mongoCliente.connect(url, function(err, client){
        if(err){
            respuesta.mensaje = "Error al concectar a la bd. " +err;
            res.json(respuesta);
            return;
        }

        const db = client.db("encuestas");
        db.collection('encuesta').insertOne(encuesta, function(err, result){
            if(err){
                respuesta.mensaje = "Error al insertar registro." +err;
            }else{
                if(parseInt(result.insertedCount.toString()<=0))
                    respuesta.mensaje = "No se pudo insertar la encuesta.";
                else
                {
                    respuesta.estatus ="ok";
                    respuesta.mensaje = "Registro insertado con éxito."
                    respuesta.data = {"id": result.insertedId};
                }
            }     
            res.json(respuesta);
            client.close();
        });
    });
});

router.post('/respuestas', function(req, res, next) {
    respuesta.data = null;
    var encuesta = req.body;
    mongoCliente.connect(url, function(err, client){
        if(err){
            respuesta.mensaje = "Error al concectar a la bd. " +err;
            res.json(respuesta);
            return;
        }

        const db = client.db("encuestas");
        db.collection('respuesta').insertOne(encuesta, function(err, result){
            if(err){
                respuesta.mensaje = "Error al insertar registro." +err;
            }else{
                if(parseInt(result.insertedCount.toString()<=0))
                    respuesta.mensaje = "No se pudo insertar la encuesta.";
                else
                {
                    respuesta.estatus ="ok";
                    respuesta.mensaje = "Registro insertado con éxito."
                    respuesta.data = {"id": result.insertedId};
                }
            }     
            res.json(respuesta);
            client.close();
        });
    });
});

router.get('/consultar/respuestas/:id', function(req, res, next) {
    respuesta.data = null;
    var id = req.params.id;
    mongoCliente.connect(url, function(err, client){
        assert.equal(err, null);
        const db = client.db("encuestas");
        var query = {"encuesta": id};
        console.log(query);
        db.collection('respuesta').find(query).toArray(function(err, result){
            assert.equal(err, null);
            respuesta.estatus="ok";
            respuesta.mensaje="Respuestas cargados con éxito";
            respuesta.data = result;
            res.json(respuesta);
            client.close();
        });
    });
});

module.exports = router;