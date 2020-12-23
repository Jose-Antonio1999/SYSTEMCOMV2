<?php

require_once("../conexion/conexion.php");

$sql = "SELECT * FROM profile_users";
$query = mysqli_query($conexion,$sql);

$lista = [];
$i = 0;

while ($fila = mysqli_fetch_array($query)) {
  $lista[$i]['id_profile_user'] = $fila['id_profile_user'];
  $lista[$i]['profile_user'] = $fila['profile_user'];
  $lista[$i]['code_profile'] = $fila['code_profile'];
  $i++;
}

echo json_encode($lista);
