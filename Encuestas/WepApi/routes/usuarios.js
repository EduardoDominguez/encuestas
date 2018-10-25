var express = require('express');
var router = express.Router();

const mongoCliente = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

//var url = "mongodb://localhost:27017";
var url = "mongodb://admin:Mario690@ds239703.mlab.com:39703/encuestas";

var respuesta = {};
respuesta.estatus = "fail";
respuesta.mensaje = "No data found.";
respuesta.data = null;

router.post('/login', function(req, res, next) {

    var nombre = req.body.username;
    var pass = req.body.password;
    
    mongoCliente.connect(url, function(err, client){
        if(err){
            respuesta.mensaje = "Error al buscar información." +err;
            res.json(respuesta);
            return;
        }

        const db = client.db("encuestas");
        var query ={"usuario": nombre, "password": pass};
        db.collection('usuario').findOne(query, function(err, result){
            if(err){
                respuesta.mensaje = "Error al realizar consulta." +err;
            }else{
                console.log(result);
                if(result === null)
                    respuesta.mensaje = "Usuario o contraseña incorrectos, favor de verificar los datos";
                else{
                    respuesta.estatus ="ok";
                    respuesta.mensaje = "Se ha cargado la información con éxito."
                    respuesta.data = result;
                }
            }     
            res.json(respuesta);
            client.close();
        });
    });
});

router.post('/', function(req, res, next) {

    var usuario = req.body.username;
    var pass = req.body.password;
    var nombre = req.body.nombre;
    var correo = req.body.correo;
    
    mongoCliente.connect(url, function(err, client){
        if(err){
            respuesta.mensaje = "Error al buscar información." +err;
            res.json(respuesta);
            return;
        }

        const db = client.db("encuestas");
        var query ={"usuario": usuario};
        db.collection('usuario').findOne(query, function(err, result){
            if(err){
                respuesta.mensaje = "Error al buscar información." +err;
                res.json(respuesta);
                return;
            }else{
                if(result === null){
                    query ={"nombre": nombre, "usuario": usuario, "password": pass, "correo": correo, "estatus": 1};
                    db.collection('usuario').insertOne(query, function(err, result){
                        if(err){
                            respuesta.mensaje = "Error al insertar registro." +err;
                        }else{
                            if(parseInt(result.insertedCount.toString()<=0))
                                respuesta.mensaje = "No se pudo insertar el usuario.";
                            else
                            {
                                respuesta.estatus ="ok";
                                respuesta.mensaje = "Registro insertado con éxito."
                                respuesta.data = {"id":result.insertedId};
                            }
                        }     
                        res.json(respuesta);
                        client.close();
                    });
                }    
                else{
                    respuesta.mensaje = "Ya se tiene registrado ese usuario."
                    res.json(respuesta);
                    return;
                }
                   
            }     
        });
    });
});


router.put('/', function(req, res, next) {

    //var usuario = req.body.username;
    var pass = req.body.password;
    var nombre = req.body.nombre;
    var correo = req.body.correo;
    var estatus = req.body.estatus;
    var id = req.body.id;

    if(estatus == undefined)
        estatus = 1;

    mongoCliente.connect(url, function(err, client){
        if(err){
            respuesta.mensaje = "Error al buscar información." +err;
            res.json(respuesta);
            return;
        }

        var oId = new ObjectID(id);
        var query = {"_id": oId};        
        var nuevosValores = {$set:{"nombre": nombre, "password": pass, "correo": correo, "estatus": estatus}};
        const db = client.db("encuestas");
        db.collection('usuario').updateOne(query, nuevosValores, {upsert: true}, function(err, result){
            if(err){
                respuesta.mensaje = "Error al actualizar registro." +err;
            }else{
                if(parseInt(result.result.nModified.toString()<=0))
                    respuesta.mensaje = "No se pudo actualizar el usuario.";
                else
                {
                    respuesta.estatus ="ok";
                    respuesta.mensaje = "Registro actualizado con éxito."
                }
            }     
            res.json(respuesta);
            client.close();
        });       
    });
});
  

module.exports = router;