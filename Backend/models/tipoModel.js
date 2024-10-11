const dao = require('./dao');
const objDao = new dao();

class tipoModel {
    constructor () {}
    obtenerTipos() {
        var sql = "SELECT * FROM tipo ORDER BY 1";
        return objDao.consultar(sql);
    }
    guardarTipo(data) {
        var sql = "INSERT INTO Tipo(Nombre, Descripcion) VALUES($1,$2) RETURNING idTipo";
        var params = [data.nombre, data.descripcion];  
        return objDao.insertar(sql, params);
    }
    modificarTipo(data) {
        var sql = "UPDATE Tipo SET Nombre=$1, Descripcion=$2 WHERE idtipo=$3";
        var params = [data.nombre, data.descripcion, data.idtipo];  
        return objDao.ejecutar(sql, params);
    }
    eliminarTipo(data) {
        var sql = "DELETE FROM Tipo WHERE idTipo=$1";
        var params = [data.idtipo];  
        return objDao.ejecutar(sql, params);
    }
}

module.exports = tipoModel;