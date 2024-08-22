var _datosTipos;
function guardarTipoExitoso(respuesta) {
    if (respuesta.Success) {
        $("#agregarTipo").modal("hide");
        var tipo = {
            idtipo: parseInt(respuesta.Data),
            nombre: $("#txtNombre").val(),
            descripcion: $("#txtDescripcion").val(),
        };
        _datosTipos.push(tipo);
        mostrarDatosTipos();
        toastr.success("El Tipo se ha guardado satisfactoriamente ");
    } else {
        toastr.error(respuesta.Mensaje);
    }    
}
function guardarTipo(idTipo) {
    var url = "/GuardarTipo";
    var tipo = 'POST';
    var datos = {
        idtipo: idTipo,
        nombre: $("#txtNombre").val(),
        descripcion: $("#txtDescripcion").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { guardarTipoExitoso(response); }
        , datos, tipoDatos, tipo);
}
function limpiarDatos() {
    $("#txtNombre").val("");
    $("#txtDescripcion").val("");
    $("#btnEditar").hide();
    $("#btnGuardar").show();
}
function mostrarModalTipo() {    
    limpiarDatos();
    var modal = '#agregarTipo';    
    $(modal).find(".modal-title").html("Adicionar Tipo");
    $(modal).find(".modal-dialog").css({ "width": 700 + "px" });
    $(modal).find(".modal-body").css({ 'min-height': 150 + "px" });
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
}
function mostrarDatosTipos() {
    limpiarTabla('tblTipo');
    $.each(_datosTipos, function (index, elemento) {
        var fila = $('<tr>').attr('id', elemento.idtipo);
        fila.append(col(elemento.idtipo).addClass("alinearCentro"));
        fila.append(col(elemento.nombre));        
        fila.append(col(elemento.descripcion ));
        fila.append(col(AccionColumna(function (e) { mostrarEliminarTipo(e, elemento) }
            , 'trash', 'Eliminar')).addClass("alinearCentro"));
        $('#tblTipo tbody').append(fila);
    });
}
function getTiposExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosTipos = resultado.Data;
        mostrarDatosTipos();        
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function init() {
    var url = "/obtenerTipos";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getTiposExitoso, datos, tipoDatos, tipo);
}
$(document).ready(function () {    
    init();  
    $('#btnAdicionar').click(function () { mostrarModalTipo(); });  
    $('#btnCancelar').click(function () { $('#agregarTipo').modal("hide"); });  
    $("#btnGuardar").click(function () { guardarTipo(0); });
});