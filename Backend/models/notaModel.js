const dao = require('./dao');
const objDao = new dao();

class tipoModel {
    constructor () {}
    guardarNota(dataM, list_dataD) {
        var sqlm ='INSERT INTO nota_venta(fecha, descripcion, idcliente, total) '
            + ' VALUES($1,$2,$3,$4) RETURNING idnotaventa';
        var parm = [dataM.fecha, dataM.descripcion, dataM.idcliente, dataM.total];
        var sqld ='INSERT INTO detalle_venta(idnotaventa, idproducto, cantidad, precio, subtotal )'
            + ' VALUES($1,$2,$3,$4,$5) ';
        var list_pard = [];
        list_dataD.forEach( dataD => {
            var elem = [0,dataD.idproducto, dataD.cantidad, dataD.precio, dataD.subtotal];
            list_pard.push(elem);
        });
        return objDao.maestro_detalle(sqlm, sqld, parm, list_pard, 'idnotaventa' , 0);    
    }    
}
module.exports = tipoModel;