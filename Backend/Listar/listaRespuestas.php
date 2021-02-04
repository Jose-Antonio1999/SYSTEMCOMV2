<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){

  $data = json_decode($data);

  $id_alumno = $data->id_alumno;
  $id_form = $data->id_form;

  $sql_consulta = "SELECT question, answer FROM forms INNER JOIN questions on forms.id_form = questions.id_forms1
  INNER JOIN answers on questions.id_questions=answers.id_questions2
  WHERE answers.id_student1 = '$id_alumno' AND forms.id_form = '$id_form '; ";

$ejecucion_query = mysqli_query($conexion, $sql_consulta);

if (!$ejecucion_query) {
  echo json_encode("Error al obtener respuestas");
} else {

    $lista = [];
    $i = 0;

    while ($fila = mysqli_fetch_array($ejecucion_query)) {
      $lista[$i]['answer'] = $fila['answer'];
      $lista[$i]['question'] = $fila['question'];
      $i++;
    }

    echo json_encode($lista);
  }

}
