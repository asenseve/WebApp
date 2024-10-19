var _datosProductos;
var _datosClientes;
function cargarCombos() {
    var propC = { id: 'idcliente', value: 'apellidos' };
    adicionarOpcionesCombo($("#cmbCliente"), _datosClientes, null, propC);    
    var propP = { id: 'idproducto', value: 'nombre' };
    adicionarOpcionesCombo($("#cmbProducto"), _datosProductos, null, propP);
}
function getCargarExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosProductos = resultado.Data.Productos;
        _datosClientes = resultado.Data.Clientes;
        cargarCombos();     
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function limpiarDatos() {
    $("#txtCantidad").val("1");
    $("#txtSubtotal").val("0");
}
function mostrarModalDetalle() {
    limpiarDatos();
    var modal = '#agregarDetalle';    
    $(modal).find(".modal-title").html("Adicionar Detalle");
    $(modal).find(".modal-dialog").css({ "width": 700 + "px" });
    $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
}
function init() {
    document.getElementById("txtFecha").valueAsDate = new Date();
    var url = "nota/obtenerClientesProductos";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getCargarExitoso, datos, tipoDatos, tipo);
}
$(document).ready(function () {
    init();      
    $('#btnVolver').click(function () { window.location.href = "nota.html"; });    
    $('#btnAgregar').click(function () { mostrarModalDetalle(); });  
    $('#btnCancelar').click(function () { $('#agregarDetalle').modal("hide"); }); 
});