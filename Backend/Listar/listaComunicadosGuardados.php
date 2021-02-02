<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$id = file_get_contents("php://input");

if(isset($id)) {
  //decodificar data

  $sql_comun = " SELECT id_communiques, affair, date, body, time, status_communique, type_communique, addressee, id_staff3 FROM communiques
                  WHERE id_staff3 = '$id' and status_communique = 'guardado' ORDER BY date DESC ";

  $query_comun = mysqli_query($conexion, $sql_comun);

  if (!$query_comun) {
    echo json_encode("Error al listar comunicados");
  } else {
    $lista = [];
    $i = 0;

    while ($fila = mysqli_fetch_array($query_comun)) {
      $lista[$i]['id_communiques'] = $fila['id_communiques'];
      $lista[$i]['affair'] = $fila['affair'];
      $lista[$i]['date'] = $fila['date'];
      $lista[$i]['body'] = $fila['body'];
      $lista[$i]['time'] = $fila['time'];
      $lista[$i]['status_communique'] = $fila['status_communique'];
      $lista[$i]['type_communique'] = $fila['type_communique'];
      $lista[$i]['addressee'] = $fila['addressee'];
      $lista[$i]['id_staff3'] = $fila['id_staff3'];
      $i++;
    }

    echo json_encode($lista);
  }

}
