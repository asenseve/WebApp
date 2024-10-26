const notaModel = require('../models/notaModel');
const objNotaModel = new notaModel();
const clienteModel = require('../models/clienteModel');
const productoModel = require('../models/productoModel');
const objClienteModel = new clienteModel();
const objProductoModel = new productoModel();

module.exports = {
    obtenerNotas: (req, res) => {
        objNotaModel.obtenerNotas().then(function (data) {
            res.type('json');
            res.send({ "Success" : true, "Data" : data } );
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );
        });
    },
    obtenerNota: async (req, res) => {
        try {
            var idnotaventa = req.body.idnotaventa;        
            let nota = await objNotaModel.obtenerNota(idnotaventa);
            let detalle = await objNotaModel.obtenerDetalleNota(idnotaventa);
            let productos = await objProductoModel.obtenerProductos();
            let clientes = await objClienteModel.obtenerClientes();
            res.type('json');
            res.send({ "Success" : true, "Data" : { "Productos" : productos, 
                "Clientes" : clientes, "Nota" : nota, "Detalle" : detalle } } );
        } catch(error) {
                res.type('json');
                res.send({ "Success" : false, "Mensaje" : error.message } );
        }
    },
    obtenerClientesProductos: (req, res) => { 
        objProductoModel.obtenerProductos().then(function(productos){
            objClienteModel.obtenerClientes().then(function (clientes) {
                res.type('json');
                res.send({ "Success" : true, "Data" : { "Productos" : productos, 
                "Clientes" : clientes } } );
            }).catch(function (error) {
                res.type('json');
                res.send({ "Success" : false, "Mensaje" : error.message } );
            });                    
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );
        });
    },                
    GuardarNota : (req, res) => {
        var dataM = { idnotaventa: req.body.idnotaventa, fecha: req.body.fecha, 
            descripcion: req.body.descripcion, idcliente: req.body.idcliente, 
            total: req.body.total };
        //var dataM = { idnotaventa: 0, fecha: '12/04/2024', descripcion: 'Venta de Prueba', 
        //    idcliente:1, total: 79 };
        var list_dataD = req.body.detalle;
        //var list_dataD = [];
        //var dataD1 = {idproducto:1, cantidad:5, precio:10, subtotal:50};
        //var dataD2 = {idproducto:3, cantidad:3, precio:3, subtotal:9};
        //var dataD3 = {idproducto:5, cantidad:4, precio:5, subtotal:20};
        //list_dataD.push(dataD1);
        //list_dataD.push(dataD2);
        //list_dataD.push(dataD3);
        if (dataM.idnotaventa == 0)    
        {
            objNotaModel.guardarNota(dataM,list_dataD).then(data => {
                res.type('json');
                res.send({ "Success" : true, "Data" : data.idnotaventa } );    
            }).catch(function(error){
                res.type('json');
                res.send({ "Success" : false, "Mensaje" : error.message } );    
            });    
        } else {
            
        }
    }
}