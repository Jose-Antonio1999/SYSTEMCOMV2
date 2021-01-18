<?php

//al igual que las demas se requiere conexiona la BD
require_once("../conexion/conexion.php");

//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //decodificar a json

  $data = json_decode($data);
  //declarar array de
  $preguntas = [];
  //recuperar los datos
  $areaTutoria = $data->areaTutoria;
  $descripcion = $data->descripcion;
  $id_docente_tutor = $data->id_docente_tutor;
  $titulo = $data->titulo;
  $preguntas = $data->preguntas;
  $fechaActual = date('Y-m-d');
  //SQL
  //antes insertar se actualizara el status para luego insertar un nuevo formulario
  $sql_update = "UPDATE forms SET status = '0' WHERE id_teacher_tutor1='$id_docente_tutor' ";
  $sql_ejecutar = mysqli_query($conexion, $sql_update);

  //llenado de formulario
  $sql_forms = "CALL addForms('$titulo', '$descripcion','$fechaActual','$areaTutoria','$id_docente_tutor') ";
  $sql_obtener_id = "SELECT id_form FROM forms  WHERE forms.status='1' ORDER BY id_form DESC LIMIT 1 ";
  $query_forms = mysqli_query($conexion, $sql_forms);
  $query_forms_id = mysqli_query($conexion, $sql_obtener_id);
  $id_formulario = "";

  if (!$query_forms && !$query_forms_id) {
    echo json_encode("Error al insertar datos al formulario");
  } else {
    //obtener el id del comunicado registrado
    while($id=mysqli_fetch_array($query_forms_id)){
      $id_formulario = $id['id_form'];
    }

    //insertar preguntas
    foreach($preguntas as $data) {
      $sql_preguntas = "CALL addQuestion('$data->pregunta','$id_formulario','$data->tipo'); ";
      $ejecutar_preguntas = mysqli_query($conexion,$sql_preguntas);
    }

    if(!$ejecutar_preguntas) {
      echo json_encode("Error al ejecutar consulta preguntas");
    } else {
      echo json_encode("1");
    }

  }

}


?>
