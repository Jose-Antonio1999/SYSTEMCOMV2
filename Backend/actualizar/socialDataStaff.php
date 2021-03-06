<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //Decodificar la data personal
  $data = json_decode($data);
  $id_card_number = $data->id_card_number;
  $celular = $data->celular;
  $email = $data->email;

  $sql_update_social = "UPDATE staffs SET email_staff = '$email', phone_number_staff = '$celular'
                        WHERE id_card_number_staff = '$id_card_number'; ";

  $sql_update_user = "UPDATE users SET user = '$email' WHERE  DNI = '$id_card_number'; ";

  $ejecutar_update = mysqli_query($conexion, $sql_update_social);
  $ejecutar_user= mysqli_query($conexion, $sql_update_user);

  if (!$ejecutar_update || !$ejecutar_user) {
    echo json_encode("Error al actualizar datos");
  } else {
    echo json_encode("Datos actualizados correctamente");
  }

}
