const dao = require('./dao');
const objDao = new dao();

class productoModel {
    constructor () {}
    obtenerProductos() {
        var sql = "SELECT p.*,t.nombre tipo FROM producto p, tipo t WHERE p.idtipo=t.idtipo ORDER BY 1";
        return objDao.consultar(sql);
    }
    guardarProducto(data) {
        var sql = "INSERT INTO Producto(Nombre, Descripcion, Precio, Cantidad, idTipo) " +
            " VALUES($1,$2,$3,$4,$5) RETURNING idProducto";
            var params = [data.nombre, data.descripcion, data.precio, data.cantidad, data.idtipo];
        return objDao.insertar(sql, params);
    }
    modificarProducto(data) {
        var sql = "UPDATE Producto SET Nombre=$1, Descripcion=$2, Precio=$3, Cantidad=$4, " +
         " idTipo=$5 WHERE idproducto=$6";
        var params = [data.nombre, data.descripcion, data.precio, data.cantidad, data.idtipo, data.idproducto];
        return objDao.ejecutar(sql, params);
    }
    eliminarProducto(data) {
        var sql = "DELETE FROM Producto WHERE idProducto=$1";
        var params = [data.idproducto];  
        return objDao.ejecutar(sql, params);
    }
}

module.exports = productoModel;