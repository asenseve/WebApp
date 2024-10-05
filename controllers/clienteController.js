const path = require('path');
const clienteModel = require('../models/clienteModel');
const objClienteModel = new clienteModel();

module.exports = {
    get : (req, res) => {
        res.sendFile(path.resolve(__dirname,'../views/cliente.html'));
    },
    obtenerClientes : (req, res) => {
        objClienteModel.obtenerClientes().then(function (data) {
            res.type('json');
            res.send({ "Success" : true, "Data" : data } );
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );
        });    
    },
    GuardarCliente : (req, res) => {
        var data = { idcliente: req.body.idcliente, ci: req.body.ci, nombres: req.body.nombres, 
            apellidos: req.body.apellidos, direccion: req.body.direccion, 
            telefono: req.body.telefono, correo: req.body.correo, 
            fechanacimiento:req.body.fechanacimiento };
        if (data.idcliente == 0)    
        {
            objClienteModel.guardarCliente(data).then(data => {
                res.type('json');
                res.send({ "Success" : true, "Data" : data.idcliente } );    
            }).catch(function(error){
                res.type('json');
                res.send({ "Success" : false, "Mensaje" : error.message } );    
            });    
        } else {
            objClienteModel.modificarCliente(data).then( function() {
                res.type('json');
                res.send({ "Success" : true } );    
            }).catch(function(error){
                res.type('json');
                res.send({ "Success" : false, "Mensaje" : error.message } );    
            });                
        }
    },    
    EliminarCliente : (req, res) => {
        var data = { idcliente: req.body.idcliente }
        objClienteModel.eliminarCliente(data).then(function() {
            res.type('json');
            res.send({ "Success" : true } );
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );
        });                
    }        
}