<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //Decodificar la data personal
  $data = json_decode($data);

  $dni = $data->dni;
  $email = $data->email;
  $estatus = $data->estatus;

  $sql_update_status = "UPDATE students SET status_student = '$estatus' WHERE DNI_student = '$dni'; ";
  $sql_update_user = "UPDATE users SET user_status = '$estatus' WHERE user = '$email'; ";

  $ejecutar_update_status = mysqli_query($conexion, $sql_update_status);
  $ejecutar_update_user = mysqli_query($conexion, $sql_update_user);

  if (!$ejecutar_update_status || $ejecutar_update_user) {
    echo json_encode("Error al actualizar actualizar data estudiante");
  } else {
    echo json_encode("1");
  }

}
