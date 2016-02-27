<?php 
	require_once("conexion.php");
	header('Content-Type: application/json');
	error_reporting(0);

	conectarse();

	$opc = $_POST['opc'];
	switch ($opc) {
		case 'guardar_producto':
			guardar_producto();
		break;

		case 'salida_producto':
			salida_producto();
		break;
	}

	function salida_producto(){
			//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);
		$nombre = trim($_POST['nombre']);
		$id = trim($_POST['codigo']);
		$um = trim($_POST['um']);
		$exist = trim($_POST['exist']);
		$salida = trim($_POST['salida']);
		$respuesta = false;
			//VALIDAMOS SI EXISTE EL PRODUCTO
		$sql = "select cantidad_actual from productos where clave_producto = '".$id."' ";
	 	$res = mysql_query($sql) or die(mysql_error());

	 	if (mysql_num_rows($res) > 0){
	 			//RESTAMOS LA SALIDA DE LA CANTIDAD ACTUAL
			$cant = $exist - $salida;

			if ($cant < 1) {
				$insuf = true;
		 		$insufJson = array('insuf' => $insuf);
		 		print (json_encode($insufJson));
		 		exit();
			} else {
					//CREAMOS LA CONSULTA
				$consulta = "update productos set cantidad_actual = '".$cant."' 
					where clave_producto = '".$id."' ";
					//EJECUTAMOS LA CONSULTA
				$resultado = mysql_query($consulta) or die(mysql_error());

				if ($resultado == true) {
					$respuesta = true;
					$salidaJSON = array('respuesta' => $respuesta);
					print json_encode($salidaJSON);
				} else {
					$fallo = true;
					$falloJSON = array('fallo' => $fallo);
					print(json_encode($falloJSON));
					exit();
				}	
			}
	 	}
	}

	function guardar_producto(){
			//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);
		$nombre = trim($_POST['nombre']);
		$prov = trim($_POST['prov']);
		$um = trim($_POST['um']);
		$cant = trim($_POST['cant']);
		$compra = trim($_POST['compra']);
		$status = 'DISPONIBLE';
		$respuesta = false;
			//VALIDAMOS SI EXISTE EL PRODUCTO
		$sql = "select * from productos where nombre_producto = '".$nombre."' ";
	 	$res = mysql_query($sql) or die(mysql_error());
	 	
	 	if (mysql_num_rows($res) > 0){
	 		$existe = true;
	 		$existeJson = array('existe' => $existe,
	 			'nombre' => $nombre);
	 		print (json_encode($existeJson));
	 		exit();
	 	} else {
				//GENERAMOS LA CONSULTA
			$consulta = "insert into productos (nombre_producto,proveedor,cantidad_actual,
					precio,unidad_medida,status) values ('".$nombre."','".$prov."','".$cant."',
					'".$compra."','".$um."','".$status."')";
				//EJECUTAMOS LA CONSULTA
			$resultado = mysql_query($consulta) or die(mysql_error());

			if ($resultado == true) {
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta,
					'nombre' => $nombre);
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo,
					'nombre' => $nombre);
				print(json_encode($falloJSON));
			}	
		}		
	}

?>