<?php

require_once("../conexion/conexion.php");

$sql = "SELECT * FROM SECTION";
$query = mysqli_query($conexion,$sql);

$lista = [];
$i = 0;

while ($fila = mysqli_fetch_array($query)) {
  $lista[$i]['id_section'] = $fila['id_section'];
  $lista[$i]['section'] = $fila['section'];
  $i++;
}

echo json_encode($lista);
