<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //Decodificar la data personal
  $data = json_decode($data);

  $apellidoM = $data->apellidoM;
  $apellidoP = $data->apellidoP;
  $celular = $data->celular;
  $correo = $data->correo;
  $dni = $data->dni;
  $nombre = $data->nombre;
  $tipoPersonal = $data->tipoPersonal;

  //sql staff
  $sql_update = "UPDATE staffs SET name_staff = '$nombre', firts_name_staff = '$apellidoP',
  last_name_staff = '$apellidoM', email_staff = '$correo' , phone_number_staff = '$celular',
  id_profile_staff1 = '$tipoPersonal' WHERE id_card_number_staff = '$dni'; ";
  //actualizar tabla user
  $sql_update_user = "UPDATE users SET user = '$correo' WHERE  DNI = '$dni'; ";
  //ejecución
  $ejecutar_update = mysqli_query($conexion, $sql_update);
  $ejecutar_update_user = mysqli_query($conexion, $sql_update_user);
  //verificar ejecucuion
  if (!$ejecutar_update || !$ejecutar_update_user) {
    echo json_encode("Error al actualizar datos del personal");
  } else {
    echo json_encode("Datos actualizados correctamente");
  }

}
