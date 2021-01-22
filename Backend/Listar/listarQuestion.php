
<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$idForm = file_get_contents("php://input");

if(isset($idForm)) {
  //decodificar data
  $sql_question= "SELECT id_questions, question, id_type_question1 FROM questions
                      WHERE id_forms1 = '$idForm' ";

  $ejecucion_query = mysqli_query($conexion, $sql_question);

  if (!$ejecucion_query) {
    echo json_encode("Error al obtener el formulario");
  } else {

    $lista = [];
    $i = 0;

    while ($fila = mysqli_fetch_array($ejecucion_query)) {
      $lista[$i]['id_questions'] = $fila['id_questions'];
      $lista[$i]['question'] = $fila['question'];
      $lista[$i]['id_type_question1'] = $fila['id_type_question1'];
      $i++;
    }

    echo json_encode($lista);

  }

}
