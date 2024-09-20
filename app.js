const express = require('express');
const app = express();
const indexRoute = require('./routes/indexRoute');
const tipoRoute = require('./routes/tipoRoute');
var bodyParser = require("body-parser");
const port = 3100;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/', indexRoute);
app.use('/tipo', tipoRoute);

app.listen(port, () => {
    console.log(`Escuchando en: http://localhost:${port}`);  
});

/*
// Endpoints para Producto

app.get('/producto', (req, res) => {
    res.sendFile(path.resolve(__dirname,'views/producto.html'));
});

app.get('/obtenerProductos', (req, res) => {
    var qProd = "SELECT p.*,t.nombre tipo FROM producto p, tipo t WHERE p.idtipo=t.idtipo ORDER BY 1";
    var qTipo = "SELECT * FROM tipo ORDER BY 1";
    db.any(qProd).then(function (productos) {
        db.any(qTipo).then(function (tipos) {
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
}); 

app.post("/GuardarProducto", (req, res) => {
    var data = { idproducto: req.body.idproducto, nombre: req.body.nombre, 
        descripcion: req.body.descripcion, precio: req.body.precio, 
        cantidad: req.body.cantidad, idtipo: req.body.idtipo };
    if (data.idproducto == 0)    
    {
        var sql ='INSERT INTO Producto(Nombre, Descripcion, Precio, Cantidad, idTipo) ' +
            ' VALUES($1,$2,$3,$4,$5) RETURNING idProducto';
        var params = [data.nombre, data.descripcion, data.precio, data.cantidad, data.idtipo];
        db.one(sql, params).then( data => {
            res.type('json');
            res.send({ "Success" : true, "Data" : data.idproducto } );    
        }).catch(function(error){
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );    
        });    
    } else {
        var sql ='UPDATE Producto SET Nombre=$1, Descripcion=$2, Precio=$3, Cantidad=$4, ' +
         ' idTipo=$5 WHERE idproducto=$6';
        var params = [data.nombre, data.descripcion, data.precio, data.cantidad, data.idtipo, data.idproducto];
        db.none(sql, params).then( function() {
            res.type('json');
            res.send({ "Success" : true } );    
        }).catch(function(error){
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );    
        });
    }
});

app.post("/EliminarProducto", (req, res) => {
    var data = { idproducto: req.body.idproducto }
    var sql ='DELETE FROM Producto WHERE idProducto=$1'
    var params =[data.idproducto];
    db.none(sql, params).then(function() {
        res.type('json');
        res.send({ "Success" : true } );
    }).catch(function (error) {
        res.type('json');
        res.send({ "Success" : false, "Mensaje" : error.message } );
    });                
});

// Endpoints para cliente

app.get('/cliente', (req, res) => {
    res.sendFile(path.resolve(__dirname,'views/cliente.html'));
});

app.get('/obtenerClientes', (req, res) => {
    db.any("SELECT * FROM cliente ORDER BY 1").then(function (data) {
        res.type('json');
        res.send({ "Success" : true, "Data" : data } );
    }).catch(function (error) {
        res.type('json');
        res.send({ "Success" : false, "Mensaje" : error.message } );
    });    
}); 

app.post("/GuardarCliente", (req, res) => {
    var data = { idcliente: req.body.idcliente, ci: req.body.ci, nombres: req.body.nombres, 
        apellidos: req.body.apellidos, direccion: req.body.direccion, 
        telefono: req.body.telefono, correo: req.body.correo, 
        fechanacimiento:req.body.fechanacimiento };
    if (data.idcliente == 0)    
    {
        var sql ='INSERT INTO Cliente(CI,Nombres,Apellidos,Direccion,Telefono,Correo,FechaNacimiento) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING idCliente';
        var params = [data.ci, data.nombres, data.apellidos, data.direccion, data.telefono, data.correo, data.fechanacimiento];
        db.one(sql, params).then( data => {
            res.type('json');
            res.send({ "Success" : true, "Data" : data.idcliente } );    
        }).catch(function(error){
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );    
        });    
    } else {
        var sql ='UPDATE Cliente SET CI=$1,Nombres=$2,Apellidos=$3,Direccion=$4,Telefono=$5,Correo=$6,FechaNacimiento=$7 WHERE idcliente=$8';
        var params = [data.ci, data.nombres, data.apellidos, data.direccion, data.telefono, data.correo, data.fechanacimiento, data.idcliente];
        db.none(sql, params).then( function() {
            res.type('json');
            res.send({ "Success" : true } );    
        }).catch(function(error){
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );    
        });                
    }
});

app.post("/EliminarCliente", (req, res) => {
    var data = { idcliente: req.body.idcliente }
    var sql ='DELETE FROM Cliente WHERE idcliente=$1'
    var params =[data.idcliente];
    db.none(sql, params).then(function() {
        res.type('json');
        res.send({ "Success" : true } );
    }).catch(function (error) {
        res.type('json');
        res.send({ "Success" : false, "Mensaje" : error.message } );
    });
});

*/