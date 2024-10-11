const path = require('path');
const tipoModel = require('../models/tipoModel');
const objTipoModel = new tipoModel();

module.exports = {
    obtenerTipos : (req, res) => {
        objTipoModel.obtenerTipos().then(function (data) {
            res.type('json');
            res.send({ "Success" : true, "Data" : data } );
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );
        });    
    },
    GuardarTipo : (req, res) => {
        var data = { idtipo: req.body.idtipo, nombre: req.body.nombre, 
            descripcion: req.body.descripcion };
        if (data.idtipo == 0)    
        {
            objTipoModel.guardarTipo(data).then(data => {
                res.type('json');
                res.send({ "Success" : true, "Data" : data.idtipo } );    
            }).catch(function(error){
                res.type('json');
                res.send({ "Success" : false, "Mensaje" : error.message } );    
            });    
        } else {
            objTipoModel.modificarTipo(data).then( function() {
                res.type('json');
                res.send({ "Success" : true } );    
            }).catch(function(error){
                res.type('json');
                res.send({ "Success" : false, "Mensaje" : error.message } );    
            });                
        }
    },    
    EliminarTipo : (req, res) => {
        var data = { idtipo: req.body.idtipo }
        objTipoModel.eliminarTipo(data).then(function() {
            res.type('json');
            res.send({ "Success" : true } );
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );
        });                
    }        
}