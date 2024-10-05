const express = require('express');
const app = express();
const indexRoute = require('./routes/indexRoute');
const tipoRoute = require('./routes/tipoRoute');
const productoRoute = require('./routes/productoRoute');
const clienteRoute = require('./routes/clienteRoute');
var bodyParser = require("body-parser");
const port = 2266;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/', indexRoute);
app.use('/tipo', tipoRoute);
app.use('/producto', productoRoute);
app.use('/cliente', clienteRoute)

app.listen(port, () => {
    console.log(`Escuchando en: http://localhost:${port}`);  
});
