const express = require('express');
const app = express();
const path = require('path');
var pgp = require("pg-promise")();
var bodyParser = require("body-parser");
var db = pgp("postgres://postgres:Senale@localhost:5432/dbDES");
const port = 2266;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.listen(port, () => {
    console.log(`Escuchando en: http://localhost:${port}`);  
});

app.get('/', (req, res) => {
    //res.send('Hello World!');
    res.sendFile(path.resolve(__dirname,'index.html'));
});

app.get('/tipo', (req, res) => {
    res.sendFile(path.resolve(__dirname,'tipo.html'));
});

app.get('/obtenerTipos', (req, res) => {
    db.any("SELECT * FROM tipo ORDER BY 1").then(function (data) {
        res.type('json');
        res.send({ "Success" : true, "Data" : data } );
    }).catch(function (error) {
        res.type('json');
        res.send({ "Success" : false, "Mensaje" : error.message } );
    });    
}); 

app.post("/GuardarTipo", (req, res) => {
    var data = { idtipo: req.body.idtipo, nombre: req.body.nombre, 
        descripcion: req.body.descripcion };
    if (data.idtipo == 0)    
    {
        var sql ='INSERT INTO Tipo(Nombre, Descripcion) VALUES($1,$2) RETURNING idTipo';
        var params = [data.nombre, data.descripcion];
        db.one(sql, params).then( data => {
            res.type('json');
            res.send({ "Success" : true, "Data" : data.idtipo } );    
        }).catch(function(error){
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );    
        });    
    } else {
        var sql ='UPDATE Tipo SET Nombre=$1, Descripcion=$2 WHERE idtipo=$3';
        var params = [data.nombre, data.descripcion, data.idtipo];
        db.none(sql, params).then( function() {
            res.type('json');
            res.send({ "Success" : true } );    
        }).catch(function(error){
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );    
        });                
    }
});

app.post("/EliminarTipo", (req, res) => {
    var data = { idtipo: req.body.idtipo }
    var sql ='DELETE FROM Tipo WHERE idTipo=$1'
    var params =[data.idtipo];
    db.none(sql, params).then(function() {
        res.type('json');
        res.send({ "Success" : true } );
    }).catch(function (error) {
        res.type('json');
        res.send({ "Success" : false, "Mensaje" : error.message } );
    });                
});
