<?php

//al igual que las demas se requiere conexiona la BD
require_once("../conexion/conexion.php");

//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //decodificar a json

  $data = json_decode($data);
  //declarar array de
  $respuestas = [];
  //recuperar los datos
  $id_alumno = $data->id_alumno;
  $respuestas = $data->respuestas;
  //SQL
  //insertar preguntas
  foreach($respuestas as $data) {
    $sql_answer = "INSERT INTO answers VALUES (NULL,'$data->respuesta','1','$data->id_pregunta','$id_alumno') ";
    $ejecutar_preguntas = mysqli_query($conexion,$sql_answer);
  }

  if (!$ejecutar_preguntas) {
    echo json_encode("Error al enviar formulario");
  } else {
      echo json_encode("1");
  }

}

?>
