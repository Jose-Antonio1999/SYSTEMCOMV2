<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$dni = file_get_contents("php://input");

if(isset($dni)) {

      //verificar si existe ese email
      $sql_consulta_parent = "SELECT * FROM PARENTS WHERE DNI_parent = '$dni' ";

      $query_consuta_parent = mysqli_query($conexion,$sql_consulta_parent);

      if (!$query_consuta_parent) {
          echo json_encode("ERROR al hacer la consulta de verificación del Padre");
      } else {
        if (mysqli_num_rows($query_consuta_parent)>0) {
            $lista = [];
            $i = 0;
            while ($fila = mysqli_fetch_array($query_consuta_parent)) {
              $lista[$i]['id_parent'] = $fila['id_parent'];
              $lista[$i]['name_parent'] = $fila['name_parent'];
              $lista[$i]['firts_name_parent'] = $fila['firts_name_parent'];
              $lista[$i]['last_name_parent'] = $fila['last_name_parent'];
              $lista[$i]['email_parent'] = $fila['email_parent'];
              $lista[$i]['phone_number_parent'] = $fila['phone_number_parent'];
              $i++;
            }
            //imprir la data obtenida
            echo json_encode($lista);
        } else {
          echo json_encode("0");
        }
      }

}



