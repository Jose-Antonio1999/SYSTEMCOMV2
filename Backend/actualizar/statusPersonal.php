<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //Decodificar la data personal
  $data = json_decode($data);
  $email = $data->email;
  $id_personal = $data->id_personal;
  $estado = $data->estado;

  //codigo sql
  $sql_update_staff = "UPDATE staffs SET status_staff= '$estado'  WHERE id_staff = '$id_personal' ";

  $sql_update_user = "UPDATE users SET user_status = '$estado' WHERE user = '$email' ";

  $ejecucion_staff = mysqli_query($conexion,$sql_update_staff);
  $ejecucion_user = mysqli_query($conexion,$sql_update_user);

  if(!$ejecucion_staff && !$ejecucion_user) {
    echo json_encode("ERROR al desabilitar personal");
  } else {
    echo json_encode("1");
  }

}
