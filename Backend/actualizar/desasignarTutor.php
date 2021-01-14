<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //Decodificar la data personal
  $data = json_decode($data);
  $id = $data->id;
  $IDgrado = $data->grado;
  $IDseccion = $data->seccion;
  $fechaActual = date('Y-m-d');
  $estatus = $data->estatus;

  $sql_update_status = "UPDATE teacher_tutor SET status_mentor = '3'
                        WHERE id_staff2 = '$id' and status_mentor = '1' ";

  $ejecutar_update = mysqli_query($conexion, $sql_update_status);

  if (!$ejecutar_update) {
    json_encode("Error al actualizar estatus");
  } else {
    json_encode("Docente desasignado correctamente");
  }

}
