
<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$id_docente_tutor = file_get_contents("php://input");

if(isset($id_docente_tutor)) {

  $sql_formulario = "SELECT id_form, title, description, date, status, id_area_tutorship1, id_teacher_tutor1 FROM forms
  WHERE id_teacher_tutor1 = '$id_docente_tutor' ";

  $ejecucion_query = mysqli_query($conexion, $sql_formulario);

  if (!$ejecucion_query) {
    echo json_encode("Error al obtener los formularios del docente");
  } else {

    $lista = [];
    $i = 0;

    while ($fila = mysqli_fetch_array($ejecucion_query)) {
      $lista[$i]['id_teacher_tutor1'] = $fila['id_teacher_tutor1'];
      $lista[$i]['id_area_tutorship1'] = $fila['id_area_tutorship1'];
      $lista[$i]['id_form'] = $fila['id_form'];
      $lista[$i]['title'] = $fila['title'];
      $lista[$i]['description'] = $fila['description'];
      $lista[$i]['date'] = $fila['date'];
      $lista[$i]['status'] = $fila['status'];
      $i++;
    }
    echo json_encode($lista);
  }

}
