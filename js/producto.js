$(document).ready(function(){
	$("#nombre").focus();
	$("#btnUpdate").hide();
	ocultar();
	combo();

		//BOTÓN GUARDAR
	$("#btnSave").click(function(){
		if (validar()) {
			var cadena = $("#producto").serialize();

			$.ajax({
				cache: false,
				type: "post",
				dataType: 'json',
				url: '../php/producto.php',
				data: {opc:"guardar_producto",cadena },
				beforeSend: function(objeto){ 
                	$('#carga').css({'display':'block'});
           		},
            	complete: function(){
            		$('#carga').css('display','none');
            	},
				success: function(response) {
					if(response.respuesta == true) {
						$("#mensajealta").append(response.nombre);
						$("#mensajealta").dialog({
							modal: true,
				            width: 270,
				            height: 200,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();	
					} else if (response.existe == true) {
						$("#existe").append(response.nombre);
						$("#existe").dialog({
							modal: true,
				            width: 270,
				            height: 200,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
					} else if (response.fallo == true) {
						$("#error").append(response.nombre);
						$("#error").dialog({
							modal: true,
				            width: 270,
				            height: 200,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { 
				            	window.location.reload();
				            } },   
				        });
						limpiar();
					}
				},	
				error: function(xhr,ajaxOptions,throwError){
					console.log(ajaxOptions+","+throwError);
				} 
			});
		} else {
			$("#full").dialog({
				modal: true,
				width: 270,
				height: 190,
				show: {effect : "fold" ,duration: 350},
				hide: {effect : "explode", duration: 300},
				resizable: "false",
				buttons: { "OK": function () { $(this).dialog("close"); } },   
			});
		} 
	});

			//LLENAR COMBO USANDO CHOSEN
	$('.chosen').chosen({
		allow_single_deselect: true,
		placeholder_text_single: "SELECCIONE",
		no_results_text: "!No Hay Resultados!"
	});
			//BOTÓN VER
	$("#btnGo").click(function(){
		window.location.href = "../pages/BuscarProducto.html";
	});
		//BOTÓN REFRESCAR  
	$("#reset").click(function(){
		window.location.reload();
	});

	function validar(){
		ocultar();
		var prov = $("#prov").val();
		var nombre = $("#nombre").val();
		var cant = $("#cant").val();
		var compra = $("#compra").val();
		var um = $("#um").val();

		if (nombre == 0 || nombre == null) {
			$("#nombre").focus();
			$("#errornombre").show();
			return false;
		} else if (prov == 0 || prov == null ) {
			$("#prov").focus();
			$("#errorprov").show();
			return false
		} else if (um == "" || um == 0) {
			$("#um").focus();
			$("#errorum").show();
			return false;
		} else if (cant == "") {
			$("#cant").focus();
			$("#errorprecio").hide();
			return false;
		} else if (compra == "" || compra == 0){
			$("#compra").focus();
			$("#errorcompra").show();
			return false;
		} 
		return true;
	}

		//FUNCIÓN LLENAR SELECT
	function combo(){
		$.ajax({
			cache: false,
			type: "POST",
			dataType: "json",
			url: "../php/combo.php",
			success: function(opciones){
				$("#prov").html(opciones.opcion_proveedor);
				$('.chosen').trigger('chosen:updated');
			},
			error: function(xhr,ajaxOptions,throwError){
				console.log(xhr);
			} 
		});
	}

		//FUNCIÓN PARA LIMPIAR LOS CAMPOS
	function limpiar(){
		$("#id").val("");
		$("#nombre").val("");
		$("#compra").val("");
		$("#cant").val("");
		$("#um").prop('selectedIndex', 0);
		$("#prov").prop('selectedIndex', 0);
		$('.chosen').trigger('chosen:updated');
	}

		//FUNCIÓN PARA OCULTAR
	function ocultar(){
		$("#mensajealta").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#full").hide();
		$("#letras").hide();
		$("#error").hide();
		$("#errorbuscar").hide();
		$("#errornombre").hide();
		$("#errorprov").hide();
		$("#errorum").hide();
		$("#errorcant").hide();
		$("#errorprecio").hide();
	}
});