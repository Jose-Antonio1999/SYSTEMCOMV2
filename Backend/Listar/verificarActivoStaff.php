<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$email = file_get_contents("php://input");

if(isset($email)) {

      //verificar si existe ese email
      $sql_consulta_email = " SELECT id_user FROM users WHERE user = '$email' and user_status = '1' ";

      $query_consuta_email = mysqli_query($conexion,$sql_consulta_email);

      if (!$query_consuta_email) {
          echo json_encode("ERROR al hacer la consulta de verificación de email");
      } else {

        if (mysqli_num_rows($query_consuta_email)>0) {
            echo json_encode("1");
        } else {
          echo json_encode("0");
        }

      }

}



