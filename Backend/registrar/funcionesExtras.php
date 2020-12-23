<?php

require_once("../conexion/conexion.php");
//obtener id de empleado registrado
$consulta_id_grado = "SELECT id_grade FROM GRADES WHERE grade = '2' ";
$sql_consulta_id_grado = mysqli_query($conexion,$consulta_id_grado);

while($id = mysqli_fetch_array($sql_consulta_id_grado)) {
  $id_grado= $id[0];
}

$fechaActual = date('Y');

$sql_id_parent = "SELECT id_parent FROM PARENTS WHERE DNI_parent = '71690695' ";
    $ejecucion_id_parent = mysqli_query($conexion,$sql_id_parent);

    while($id=mysqli_fetch_array($ejecucion_id_parent)){
      $id_parent = $id[0];
    }


echo json_encode($fechaActual);
