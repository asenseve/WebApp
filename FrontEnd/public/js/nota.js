var _datosNotas;
function mostrarDatosNotas() {
    limpiarTabla('tblNota');
    $.each(_datosNotas, function (index, elemento) {
        var fila = $('<tr>').attr('id', elemento.idnotaventa);
        var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.idnotaventa);
        //eventoActualizarNota(input, elemento);
        fila.append(col(input));
        elemento.fecha = (new Date(elemento.fecha)).toLocaleDateString();                 
        fila.append(col(elemento.fecha ));
        fila.append(col(elemento.cliente ));
        fila.append(col(elemento.descripcion ));
        fila.append(col(elemento.total).addClass("alinearDerecha"));
        fila.append(col(AccionColumna(function (e) { mostrarEliminarNota(e, elemento) }
            , 'trash', 'Eliminar')).addClass("alinearCentro"));
        $('#tblNota tbody').append(fila);
    });
}
function getNotasExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosNotas = resultado.Data;
        mostrarDatosNotas();        
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function init() {
    var url = "nota/obtenerNotas";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getNotasExitoso, datos, tipoDatos, tipo);
}
$(document).ready(function () {
    init();  
});