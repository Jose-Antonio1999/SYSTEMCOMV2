<?php

require_once("../conexion/conexion.php");

$sql = "SELECT id_type_question , type_question  FROM type_questions ";
$query = mysqli_query($conexion,$sql);

$lista = [];
$i = 0;

while ($fila = mysqli_fetch_array($query)) {
  $lista[$i]['id_type_question'] = $fila['id_type_question'];
  $lista[$i]['type_question'] = $fila['type_question'];
  $i++;
}

echo json_encode($lista);
