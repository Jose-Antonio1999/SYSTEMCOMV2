<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$id_staff= file_get_contents("php://input");

$fechaActual = date('Y-m-d');
$time = time();
$hora =  date('H:i:s', $time);
$sql_insert_comu = "INSERT INTO COMMUNIQUES VALUES (NULL,'$asunto','$fechaActual','$cuerpo','$hora','guardado','$tipo','$direccion_envio','$id_staff')";
$ejecucion_query = mysqli_query($conexion,$sql_insert_comu);

if ($rutaArchivo!="" || $rutaArchivo!=null) {
    //obtnener el ID del
    $rs = mysqli_query($conexion,"SELECT MAX(id_communiques) AS id FROM COMMUNIQUES");
    if ($row = mysqli_fetch_array($rs)) {
        $id = trim($row[0]);
    }
      $ql_file = "INSERT INTO FILES VALUES (NULL,'$asunto','$rutaArchivo','$id')";
      $ejecucion_query_file = mysqli_query($conexion,$ql_file);
    }

}


