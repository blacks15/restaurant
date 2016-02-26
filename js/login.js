$(document).ready(function(){
	ocultar();
	$("#username").focus();

		//BOTÓN LOGIN
	$("#btnLogin").click(function(){
		var cadena = $("#login").serialize();
		if (validar() ) {
			alert(cadena);
			window.location.href = "pages/menu.html";
		} else {
			$("#full").dialog({
				modal: true,
	            width: 270,
	            height: 200,
	            show: {effect : "fold" ,duration: 350},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
		}
	});

		//FUNCIÓN VALIDAR CAMPOS
	function validar(){
		ocultar();
		var user = $("#username").val();
		var pass = $("#password").val();

		if (user == "") {
			$("#username").focus();
			$("#errornombre").show('shake',500);
			return false;
		} else if (pass == "") {
			$("#password").focus();
			$("#errorpass").show('shake',500);
			return false;
		} else {
			return true;
		}
	}
		//FUNCIÓN LIMPIAR CAMPOS
	function limpiar(){
		$("#username").val("");
		$("#password").val("");
	}

		//FUNCIÓN OCULTAR
	function ocultar(){
		$("#full").hide();
		$("#error").hide();
		$("#errornombre").hide();
		$("#errorpass").hide();
	}
});