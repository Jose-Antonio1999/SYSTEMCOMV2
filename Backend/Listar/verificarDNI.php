
<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$dni = file_get_contents("php://input");

if(isset($dni)) {
  //verificar si existe su dni
  $sql_consulta_staff = "SELECT id_card_number_staff FROM STAFFS WHERE id_card_number_staff = '$dni' ";

  $query_consuta_user = mysqli_query($conexion,$sql_consulta_staff);

  if (!$query_consuta_user) {
      echo json_encode("ERROR al hacer la consulta de verificación de DNI");
  } else {
      if (mysqli_num_rows($query_consuta_user)>0) {
          echo json_encode("El dni ya está registrado");
      } else {
        echo json_encode("");
      }

  }

}




