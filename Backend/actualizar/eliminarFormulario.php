<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$idForm = file_get_contents("php://input");

if(isset($idForm)){
  //Decodificar la data personal
  $sql_delete_form = "DELETE FROM forms WHERE id_form = '$idForm ' ; ";
  $ejecutar_delete= mysqli_query($conexion, $sql_delete_form);

  if (!$ejecutar_delete) {
    echo json_encode("Error al eliminar formulario");
  } else {
    echo json_encode("Formulario eliminado correctamente");
  }

}
