<?php 
	header('Content-Type: application/json');
	error_reporting(0);
	require_once("conexion.php");
	conectarse();

	$opciones = null;
	$opciones->opcion_proveedor = '';

	mostrar_proveedor();

	function mostrar_proveedor(){
			global $opciones;
			$opcion_proveedor = '<option value="0">SELECCIONE </option>';
			$consulta = "select clave_proveedor,empresa from proveedores where status = 'ACTIVO'";
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opcion_proveedor.= '<option value = "'.$fila["clave_proveedor"].'">'.$fila["empresa"].'</option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_proveedor = $opcion_proveedor;
	}		

	print json_encode($opciones);


?>