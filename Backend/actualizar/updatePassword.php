<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //Decodificar la data personal
  $data = json_decode($data);

  $DNI = $data->DNI;
  $profile = $data->profile;
  $pass1 = $data->pass1;
  $pass2 = $data->pass2;

  if($pass1==$pass2){

    $pass1 = md5($pass1);

    $sql_update_pass = "UPDATE users SET pass = '$pass1'
                        WHERE users.profile = '$profile' and  DNI = '$DNI' and user_status = '1'; ";

    $ejecutar_update = mysqli_query($conexion, $sql_update_pass);

    if (!$ejecutar_update) {
        echo json_encode("Error al actualizar datos");
    } else {
        echo json_encode("contraseña cambiada correctamente");
    }

  } else{
    echo json_encode("Las contraseñas no coinciden");
  }

}
