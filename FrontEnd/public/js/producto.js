var _datosProductos;
var _datosTipos;
function eliminarExitoso(resultado, e, elemento) {
    $("#eliminarProducto").modal("hide");
    if (resultado.Success) {
        $(e.currentTarget).closest('tr').remove();
        _datosProductos.remove(elemento);
        toastr.success("El Producto'" + elemento.nombre + 
            " '   se ha eliminado satisfactoriamente");
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function confirmarEliminar(e, elemento) {
    var url = "producto/EliminarProducto";
    var tipo = 'POST';
    var datos = { idproducto: elemento.idproducto };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { eliminarExitoso(response, e, elemento); }
    , datos, tipoDatos, tipo);
}
function mostrarEliminarProducto(e, elemento) {
    var modal = '#eliminarProducto';
    $(modal).find(".modal-title").html('Eliminar Producto');
    $(modal).find(".text-mensaje-modal").html('Esta seguro que desea eliminar el Producto '
        + "'" + elemento.nombre + "'    ?");
    $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });    
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
    $("#btnConfirmarEliminar").unbind('click').click(function () {
        confirmarEliminar(e, elemento);
    });    
}
function guardarProductoExitoso(respuesta, elemento) {
    if (respuesta.Success) {
        $("#agregarProducto").modal("hide");
        if (!elemento) {
            var producto = {
                idproducto: parseInt(respuesta.Data),
                nombre: $("#txtNombre").val(),
                descripcion: $("#txtDescripcion").val(),
                precio: $("#txtPrecio").val(),
                cantidad: $("#txtCantidad").val(),
                idtipo : $("#cmbTipo").val(),
                tipo: $("#cmbTipo option:selected").html()
            };
            _datosProductos.push(producto);		
        } else {
            elemento.nombre = $("#txtNombre").val();
            elemento.descripcion = $("#txtDescripcion").val();
            elemento.precio = $("#txtPrecio").val();
            elemento.cantidad = $("#txtCantidad").val();
            elemento.idtipo = $("#cmbTipo").val();
            elemento.tipo = $("#cmbTipo option:selected").html();
        }            
        mostrarDatosProductos();
        toastr.success("El Producto se ha guardado satisfactoriamente ");
    } else {
        toastr.error(respuesta.Mensaje);
    }    
}
function guardarProducto(idProducto, elemento) {
    var url = "producto/GuardarProducto";
    var tipo = 'POST';
    var datos = {
        idproducto: idProducto,
        nombre: $("#txtNombre").val(),
        descripcion: $("#txtDescripcion").val(),
        precio: $("#txtPrecio").val(),
        cantidad: $("#txtCantidad").val(),
        idtipo: $("#cmbTipo").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { guardarProductoExitoso(response, elemento); }
        , datos, tipoDatos, tipo);
}
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
function editarDatos(elemento) {
    $("#txtNombre").val(elemento.nombre);
    $("#txtDescripcion").val(elemento.descripcion);
    $("#txtPrecio").val(elemento.precio);
    $("#txtCantidad").val(elemento.cantidad);
    $("#cmbTipo").val(elemento.idtipo);
    $("#btnEditar").show();
    $("#btnGuardar").hide();
}
function eventoActualizarProducto(input, elemento) {
    $(input).unbind('click').click(function () {
        var modal = '#agregarProducto';
        editarDatos(elemento);
        $(modal).find(".modal-title").html('Editar Producto : ' + "'" + 
            elemento.nombre + "'");
        $(modal).find(".modal-dialog").css({ 'width': 700 + "px" });
        $(modal).modal({ backdrop: 'static', keyboard: false });
        $(modal).modal("show");
        $("#btnEditar").unbind('click').click(function (event) {
            event.preventDefault();
            guardarProducto(elemento.idproducto, elemento);
        });
    });
}
function mostrarDatosProductos() {
    limpiarTabla('tblProducto');
    $.each(_datosProductos, function (index, elemento) {
        var fila = $('<tr>').attr('id', elemento.idproducto);
        fila.append(col(elemento.idproducto).addClass("alinearCentro"));
        var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.nombre);
        eventoActualizarProducto(input, elemento);
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
    var url = "producto/obtenerProductos";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getProductosExitoso, datos, tipoDatos, tipo);
}
$(document).ready(function () {    
    init();  
    $('#btnAdicionar').click(function () { mostrarModalProducto(); });  
    $('#btnCancelar').click(function () { $('#agregarProducto').modal("hide"); });  
    $("#btnGuardar").click(function () { guardarProducto(0); });
    $('#btnCancelarEliminar').click(function () { $("#eliminarProducto").modal("hide"); });    
});