<?php

require_once("../conexion/conexion.php");

$sql = "SELECT id_area_tutorship, name_area, description_area FROM area_tutorship";
$query = mysqli_query($conexion,$sql);

$lista = [];
$i = 0;

while ($fila = mysqli_fetch_array($query)) {
  $lista[$i]['id_area_tutorship'] = $fila['id_area_tutorship'];
  $lista[$i]['name_area'] = $fila['name_area'];
  $lista[$i]['description_area'] = $fila['description_area'];
  $i++;
}

echo json_encode($lista);
