const path = require('path');
const productoModel = require('../models/productoModel');
const tipoModel = require('../models/tipoModel');
const objProductoModel = new productoModel();
const objTipoModel = new tipoModel();

module.exports = {
    obtenerProductos : (req, res) => {
        objProductoModel.obtenerProductos().then(function (productos) {
            objTipoModel.obtenerTipos().then( function (tipos) {
                res.type('json');
                res.send({ "Success" : true, "Data" : { "Productos" : productos, "Tipos" : tipos } } );    
            }).catch(function (error) {
                res.type('json');
                res.send({ "Success" : false, "Mensaje" : error.message } );
            });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );
        });    
    },
    GuardarProducto : (req, res) => {
        var data = { idproducto: req.body.idproducto, nombre: req.body.nombre, 
            descripcion: req.body.descripcion, precio: req.body.precio, 
            cantidad: req.body.cantidad, idtipo: req.body.idtipo };
        if (data.idproducto == 0)    
        {
            objProductoModel.guardarProducto(data).then(data => {
                res.type('json');
                res.send({ "Success" : true, "Data" : data.idproducto } );    
            }).catch(function(error){
                res.type('json');
                res.send({ "Success" : false, "Mensaje" : error.message } );    
            });    
        } else {
            objProductoModel.modificarProducto(data).then( function() {
                res.type('json');
                res.send({ "Success" : true } );    
            }).catch(function(error){
                res.type('json');
                res.send({ "Success" : false, "Mensaje" : error.message } );    
            });                
        }
    },    
    EliminarProducto : (req, res) => {
        var data = { idproducto: req.body.idproducto }
        objProductoModel.eliminarProducto(data).then(function() {
            res.type('json');
            res.send({ "Success" : true } );
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );
        });                
    }        
}