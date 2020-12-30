
<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$dni = file_get_contents("php://input");

if(isset($dni)) {
  //verificar si existe su dni
  $sql_consulta_student = "SELECT DNI_student FROM STUDENTS WHERE DNI_student = '$dni' ";

  $query_consuta_student = mysqli_query($conexion,$sql_consulta_student);

  if (!$query_consuta_student) {
      echo json_encode("ERROR al hacer la consulta de verificación de DNI");
  } else {
      if (mysqli_num_rows($query_consuta_student)>0) {
          echo json_encode("El dni ya está registrado");
      } else {
          echo json_encode("0");
      }

  }

}




