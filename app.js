const express = require('express');
const app = express();
const indexRoute = require('./routes/indexRoute');
const tipoRoute = require('./routes/tipoRoute');
const productoRoute = require('./routes/productoRoute');
var bodyParser = require("body-parser");
const port = 2266;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/', indexRoute);
app.use('/tipo', tipoRoute);
app.use('/producto', productoRoute);

app.listen(port, () => {
    console.log(`Escuchando en: http://localhost:${port}`);  
});

/*
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