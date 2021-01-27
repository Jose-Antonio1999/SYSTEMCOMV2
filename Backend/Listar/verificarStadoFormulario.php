
<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)) {
  //decodificar data
  $data = json_decode($data);
  //obtener data
  $id_form = $data->id_form;
  $id_student = $data->id_student;

  $sql_formulario = "SELECT  DISTINCT(id_form) FROM forms INNER JOIN questions on forms.id_form = questions.id_forms1
                    INNER JOIN answers ON questions.id_questions = answers.id_questions2
                    WHERE forms.id_form = '$id_form' and answers.status_answer = '1' and answers.id_student1 = '$id_student'; ";

  $ejecucion_query = mysqli_query($conexion, $sql_formulario);

  if (!$ejecucion_query) {
    echo json_encode("Error al verificar formulario respondido");
  } else {

    $lista = [];
    $i = 0;

    while ($fila = mysqli_fetch_array($ejecucion_query)) {
      $lista[$i]['id_form'] = $fila['id_form'];
      $i++;
    }
    echo json_encode($lista);
  }

}
