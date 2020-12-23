<?php

require_once("../conexion/conexion.php");

$sql = "SELECT * FROM GRADES";
$query = mysqli_query($conexion,$sql);

$lista = [];
$i = 0;

while ($fila = mysqli_fetch_array($query)) {
  $lista[$i]['id_grade'] = $fila['id_grade'];
  $lista[$i]['grade'] = $fila['grade'];
  $i++;
}

echo json_encode($lista);
