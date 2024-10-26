var _datosProductos;
var _datosClientes;
var _datosDetalle = [];
function confirmarEliminar(e, detalle, producto) {
    $("#eliminarDetalle").modal("hide");
    $(e.currentTarget).closest('tr').remove();
    _datosDetalle.remove(detalle);
    toastr.success("El producto'" + producto + " '   se ha eliminado satisfactoriamente");
    var x = Number.parseFloat($("#txtTotal").val()) 
        - Number.parseFloat(detalle.subtotal);
    $("#txtTotal").val(x);    

}
function mostrarEliminarProducto(e, detalle, producto) {
    var modal = '#eliminarDetalle';
    $(modal).find(".modal-title").html('Eliminar Producto');
    $(modal).find(".text-mensaje-modal").html('Esta seguro que desea eliminar el Producto '
        + "'" + producto + "'    ?");
    $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });    
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
    $("#btnConfirmarEliminar").unbind('click').click(function () {
        confirmarEliminar(e, detalle, producto);
    });    
}
function guardarNotaVentaExitoso(respuesta, elemento){
    if (respuesta.Success) {
        toastr.success("La nota de venta se ha guardado satisfactoriamente ");
        window.location.href = "nota.html";
    } else {
        toastr.error(respuesta.Mensaje);
    }    
}
function GuardarNotaVenta(idnotaventa, elemento) {
    var url = "nota/GuardarNota";
    var tipo = 'POST';
    var datos = {
        idnotaventa: idnotaventa,
        fecha: $("#txtFecha").val(),
        total: $("#txtTotal").val(),
        idcliente: $("#cmbCliente").val(),
        descripcion: $("#txtDescripcion").val(),
        detalle: _datosDetalle
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { guardarNotaVentaExitoso(response, elemento); }
        , datos, tipoDatos, tipo);
}
function editarDatos(elemento) {    
    $("#cmbProducto").val(elemento.idproducto);
    $("#cmbProducto").prop('disabled', true);
    $("#txtCantidad").val(elemento.cantidad);
    $("#txtPrecio").val(elemento.precio);
    $("#txtSubtotal").val(elemento.subtotal);
    $("#btnEditar").show();
    $("#btnGuardar").hide();
}
function modificarDetalle(input, elemento) {
    var x = Number.parseFloat($("#txtTotal").val()) 
        - Number.parseFloat(elemento.subtotal);    
    elemento.cantidad = $("#txtCantidad").val();
    elemento.subtotal = $("#txtSubtotal").val();
    x = x + Number.parseFloat(elemento.subtotal);
    $("#txtTotal").val(x);
    var tds = $(input).closest('tr').find('td');
    tds[3].innerHTML = elemento.cantidad;
    tds[4].innerHTML = elemento.subtotal;
    $("#agregarDetalle").modal("hide");    
}
function eventoActualizarDetalle(input, elemento) {
    $(input).unbind('click').click(function () {
        var modal = '#agregarDetalle';
        editarDatos(elemento);
        $(modal).find(".modal-title").html('Editar Detalle ');
        $(modal).find(".modal-dialog").css({ 'width': 700 + "px" });
        $(modal).modal({ backdrop: 'static', keyboard: false });
        $(modal).modal("show");
        $("#btnEditar").unbind('click').click(function (event) {
            event.preventDefault();
            modificarDetalle(input, elemento);
        });
    });
}
function agregarDetalle() {
    var detalle = {
        idproducto: $("#cmbProducto").val(),
        cantidad: $("#txtCantidad").val(),
        precio: $("#txtPrecio").val(),
        subtotal: $("#txtSubtotal").val(),
    };
    _datosDetalle.push(detalle);    
    var fila = $('<tr>').attr('id', detalle.idproducto);
    fila.append(col(detalle.idproducto).addClass("alinearCentro"));
    var input = crearSpan("lblEdit" + detalle.idproducto, "spanHyperLink", 
        $("#cmbProducto option:selected").html());
    eventoActualizarDetalle(input, detalle);
    fila.append(col(input));
    fila.append(col(detalle.precio).addClass("alinearDerecha"));
    fila.append(col(detalle.cantidad).addClass("alinearDerecha"));
    fila.append(col(detalle.subtotal).addClass("alinearDerecha"));
    fila.append(col(AccionColumna(function (e) { mostrarEliminarProducto(e, detalle, 
        $("#cmbProducto option:selected").html()) } , 'trash', 'Eliminar')).addClass("alinearCentro"));
    $('#tblDetalle tbody').append(fila);
    var x = Number.parseFloat($("#txtTotal").val()) 
        + Number.parseFloat(detalle.subtotal);
    $("#txtTotal").val(x);    
}
function calcularSubtotal() {
    var precio = $("#txtPrecio").val() * $("#txtCantidad").val();
    $("#txtSubtotal").val(precio)
}
function cargarPrecio() {
    $.each(_datosProductos, function (index, elemento) {
        if (elemento.idproducto == $("#cmbProducto").val()) {
            $("#txtPrecio").val(elemento.precio);            
        }
    });    
    calcularSubtotal();
}
function cargarCombos() {
    var propC = { id: 'idcliente', value: 'apellidos' };
    adicionarOpcionesCombo($("#cmbCliente"), _datosClientes, null, propC);    
    var propP = { id: 'idproducto', value: 'nombre' };
    adicionarOpcionesCombo($("#cmbProducto"), _datosProductos, cargarPrecio, propP);
    cargarPrecio();
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
    $("#cmbProducto").prop('disabled', false);
    $("#btnEditar").hide();
    $("#btnGuardar").show();
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
    $("#txtCantidad").val("1");
    init();      
    $('#btnVolver').click(function () { window.location.href = "nota.html"; });    
    $('#btnAgregar').click(function () { mostrarModalDetalle(); });  
    $('#btnCancelar').click(function () { $('#agregarDetalle').modal("hide"); }); 
    $('#btnGuardar').click(function () { agregarDetalle(); });   
    $('#btnGuardarNota').click(function () { GuardarNotaVenta($("#txtNro").val()); });
    $('#btnCancelarEliminar').click(function () { $("#eliminarDetalle").modal("hide"); });
});