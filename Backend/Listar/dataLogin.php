<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){

  $data = json_decode($data);

  $usuario = $data->user;
  $pass = $data->pass;
  $estatus = 1;
  //obtener los data
  $pass = md5($pass);
  $sql_consulta_user = "SELECT * FROM USERS WHERE user = '$usuario' and user_status = '$estatus' and pass = '$pass'  ";

  $query_consuta_user = mysqli_query($conexion,$sql_consulta_user);

  if (mysqli_num_rows($query_consuta_user)>0) {

    $lista = [];
    $i = 0;

    while ($fila = mysqli_fetch_array($query_consuta_user)) {
      $lista[$i]['id_user'] = $fila['id_user'];
      $lista[$i]['profile'] = $fila['profile'];
      $lista[$i]['user'] = $fila['user'];
      $lista[$i]['user_status'] = $fila['user_status'];
      $i++;
    }
    //imprir la data obtenida
    echo json_encode($lista);

  } else {
    echo json_encode("0");
  }
}



