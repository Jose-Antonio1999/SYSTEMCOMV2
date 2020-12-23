<?php

require_once("../conexion/conexion.php");

#obtenemos los valores en las variables creadas
$nombre_archivo = $_FILES['file']['name'];
$tipo_archivo = $_FILES['file']['type'];
$tamano_archivo = $_FILES['file']['size'];
$direcion = $_FILES['file']['tmp_name'];

#verificar el tipo de archivo subido
if (!(strpos($tipo_archivo, "gif") || strpos($tipo_archivo, "jpeg") || strpos($tipo_archivo, "png"))) {
    echo json_encode("Formato de archivo no permitido");
} else {
    #verificar el tamanio del archivo
    if ($tamano_archivo > 500000) {
      echo json_encode("La imagen es muy grande");
    } else {
      echo json_encode("permitible");
    }
}


