<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$id_comunicado = file_get_contents("php://input");

if(isset($id_comunicado)){
  //Decodificar la data personal
  $sql_delete_comuni= "DELETE FROM communiques WHERE id_communiques = '$id_comunicado'; ";
  $ejecutar_delete= mysqli_query($conexion, $sql_delete_comuni);

  if (!$ejecutar_delete) {
    echo json_encode("Error al eliminar comunicado");
  } else {
    echo json_encode("Comunicado eliminado correctamente");
  }

}
