<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if (isset($data)) {
  $data = json_decode($data);
  $asunto = $data->asunto;
  $cuerpo = $data->cuerpo;
  $origen = $data->origen;
  $tipo = $data->tipo;
  $fechaActual = date('Y-m-d');
  $time = time();
  $hora =  date('H:i:s', $time);

   //obtener id de empleado registrado
  $consulta_id = "SELECT id_staff FROM STAFFS WHERE email_staff = '$origen' ";
  $sql_consulta_id = mysqli_query($conexion,$consulta_id);

  if (!$sql_consulta_id) {
    echo json_encode("Error al obtener id de origen");
  } else {
    while($id = mysqli_fetch_array($sql_consulta_id)) {
      $id_staff = $id[0];
    }
    if (isset($id_staff)) {
        $sql_insert_comu = "INSERT INTO COMMUNIQUES VALUES (NULL,'$asunto','$fechaActual','$cuerpo','$hora','guardado','$tipo','sin destino ','$id_staff')";
        $ejecucion_query = mysqli_query($conexion,$sql_insert_comu);
        if(!$ejecucion_query ) {
          echo json_encode("Error al guardar comunicados");
        } else {
          echo json_encode("Comunicado guardado correctamente");
        }
    } else {
      echo json_encode("El id de origen no existe");
    }
  }



}


