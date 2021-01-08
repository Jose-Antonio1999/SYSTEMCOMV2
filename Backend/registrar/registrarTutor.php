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
  $sql_registro = "INSERT INTO teacher_tutor VALUES (NULL, '$fechaActual', '1','$id','$IDgrado','$IDseccion') ";
  $ejecutar_query = mysqli_query($conexion, $sql_registro);

  if (!$ejecutar_query ) {
    echo  json_encode("Error al asignar tutoría");
  } else {
    echo  json_encode("Docente asignado correctamente");
  }

}
