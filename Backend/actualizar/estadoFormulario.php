<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //Decodificar la data personal
  $data = json_decode($data);
  $id_form = $data->id_form;
  $estado = $data->estado;

  //codigo sql
  $sql_update_form= "UPDATE forms SET status= '$estado'  WHERE id_form = '$id_form' ";

  $ejecucion_form = mysqli_query($conexion,$sql_update_form);

  if(!$ejecucion_form) {
    echo json_encode("ERROR al desabilitar formulario");
  } else {
    echo json_encode("1");
  }

}
