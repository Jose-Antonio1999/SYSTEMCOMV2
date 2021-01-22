
<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)) {
  //decodificar data
  $data = json_decode($data);
  //obtener data
  $id_grado = $data->id_grado;
  $id_seccion = $data->id_seccion;

  $sql_formulario = "SELECT id_teacher_tutor, id_staff2, id_form, title, forms.description, forms.date
  FROM teacher_tutor INNER JOIN forms on teacher_tutor.id_teacher_tutor = forms.id_teacher_tutor1
  WHERE forms.status = '1' and teacher_tutor.status_mentor = '1' and id_grade1 = '$id_grado' and id_section2 = '$id_seccion' ";

  $ejecucion_query = mysqli_query($conexion, $sql_formulario);

  if (!$ejecucion_query) {
    echo json_encode("Error al obtener el formulario");
  } else {

    $lista = [];
    $i = 0;

    while ($fila = mysqli_fetch_array($ejecucion_query)) {
      $lista[$i]['id_teacher_tutor'] = $fila['id_teacher_tutor'];
      $lista[$i]['id_staff2'] = $fila['id_staff2'];
      $lista[$i]['id_form'] = $fila['id_form'];
      $lista[$i]['title'] = $fila['title'];
      $lista[$i]['description'] = $fila['description'];
      $lista[$i]['date'] = $fila['date'];
      $i++;
    }

    echo json_encode($lista);

  }

}
