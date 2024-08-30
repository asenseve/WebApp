var _datosProductos;
var _datosTipos;
function limpiarDatos() {
    $("#txtNombre").val("");
    $("#txtDescripcion").val("");
    $("#txtPrecio").val("");
    $("#txtCantidad").val("");
    $("#btnEditar").hide();
    $("#btnGuardar").show();
}
function mostrarModalProducto() {    
    limpiarDatos();
    var modal = '#agregarProducto';    
    $(modal).find(".modal-title").html("Adicionar Producto");
    $(modal).find(".modal-dialog").css({ "width": 700 + "px" });
    $(modal).find(".modal-body").css({ 'min-height': 150 + "px" });
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
}
function mostrarDatosProductos() {
    limpiarTabla('tblProducto');
    $.each(_datosProductos, function (index, elemento) {
        var fila = $('<tr>').attr('id', elemento.idproducto);
        fila.append(col(elemento.idproducto).addClass("alinearCentro"));
        var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.nombre);
        //eventoActualizarProducto(input, elemento);
        fila.append(col(input));
        fila.append(col(elemento.descripcion ));
        fila.append(col(elemento.precio ).addClass("alinearDerecha"));
        fila.append(col(elemento.cantidad ).addClass("alinearCentro"));
        fila.append(col(elemento.tipo ));
        fila.append(col(AccionColumna(function (e) { mostrarEliminarProducto(e, elemento) }
            , 'trash', 'Eliminar')).addClass("alinearCentro"));
        $('#tblProducto tbody').append(fila);
    });
}
function cargarComboTipos() {
    var prop = { id: 'idtipo', value: 'nombre' };
    adicionarOpcionesCombo($("#cmbTipo"), _datosTipos, null, prop);
}
function getProductosExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosProductos = resultado.Data.Productos;
        _datosTipos = resultado.Data.Tipos;
        mostrarDatosProductos();        
        cargarComboTipos();
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function init() {
    var url = "/obtenerProductos";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getProductosExitoso, datos, tipoDatos, tipo);
}
$(document).ready(function () {    
    init();  
    $('#btnAdicionar').click(function () { mostrarModalProducto(); });  
    $('#btnCancelar').click(function () { $('#agregarProducto').modal("hide"); });  
    //$("#btnGuardar").click(function () { guardarTipo(0); });
    //$('#btnCancelarEliminar').click(function () { $("#eliminarTipo").modal("hide"); });    
});