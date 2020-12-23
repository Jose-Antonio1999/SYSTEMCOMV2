<?php

require_once("../conexion/conexion.php");

//script de consulta
$sql = "SELECT * FROM STAFFS";
$query = mysqli_query($conexion,$sql);
//verificamos si hay valores en la tabla
$fila = mysqli_fetch_row($query);
//verificar el valor o cantidad de consulta
if ($fila == 0) {
  echo json_encode("0");
} else {
  echo json_encode("1");
}

