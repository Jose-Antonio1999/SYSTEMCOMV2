<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //Decodificar la data personal
  $data = json_decode($data);
  $id = $data->id;
  $IDgrado = $data->grado;
  $IDseccion = $data->seccion;
  $fechaActual = date('Y-m-d');
  $estatus = $data->estatus;

  //antes de registrar verificar si la secciòn ya esta asignada
  $sql_verificar = "SELECT id_teacher_tutor FROM TEACHER_TUTOR
                    WHERE id_grade1 = '$IDgrado' and id_section2 = '$IDseccion' and status_mentor = '1' ";

  $ejecutar_verificar = mysqli_query($conexion,$sql_verificar);

  if(!$ejecutar_verificar) {
    echo  json_encode("Error al verificar la asignación");
  } else {
    if (mysqli_num_rows($ejecutar_verificar)>0) {
      echo json_encode("⚠️ El aula elejida ya cuenta con un tutor");
    } else {

      //actualizar valores antes de registrar
      if ($estatus==3) {
        $sql_update_status = "UPDATE teacher_tutor SET status_mentor = '0'
                              WHERE id_staff2 = '$id' ";
        $ejecutar_update = mysqli_query($conexion, $sql_update_status);

        if (!$ejecutar_update) {
          json_encode("Error al actualizar estatus");
        }
      }

      $sql_registro = "INSERT INTO teacher_tutor VALUES (NULL, '$fechaActual', '1','$id','$IDgrado','$IDseccion') ";
      $ejecutar_query = mysqli_query($conexion, $sql_registro);

      if (!$ejecutar_query ) {
        echo  json_encode("Error al asignar tutoría");
      } else {
        echo  json_encode("Docente tutor asignado correctamente");
      }
    }
  }

}
