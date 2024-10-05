const dao = require('./dao');
const objDao = new dao();

class clienteModel {
    constructor () {}
    obtenerClientes() {
        var sql = "SELECT * FROM cliente ORDER BY 1";
        return objDao.consultar(sql);
    }
    guardarCliente(data) {
        var sql = "INSERT INTO Cliente(CI,Nombres,Apellidos,Direccion,Telefono,Correo,FechaNacimiento) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING idCliente";
        var params = [data.ci, data.nombres, data.apellidos, data.direccion, data.telefono, data.correo, data.fechanacimiento];
        return objDao.insertar(sql, params);
    }
    modificarCliente(data) {
        var sql = "UPDATE Cliente SET CI=$1,Nombres=$2,Apellidos=$3,Direccion=$4,Telefono=$5,Correo=$6,FechaNacimiento=$7 WHERE idcliente=$8";
        var params = [data.ci, data.nombres, data.apellidos, data.direccion, data.telefono, data.correo, data.fechanacimiento, data.idcliente];
        return objDao.ejecutar(sql, params);
    }
    eliminarCliente(data) {
        var sql = "DELETE FROM cliente WHERE idcliente=$1";
        var params = [data.idcliente];  
        return objDao.ejecutar(sql, params);
    }
}

module.exports = clienteModel;