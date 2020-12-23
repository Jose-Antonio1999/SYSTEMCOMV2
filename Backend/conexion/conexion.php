<?php

//accediendo permisos a Angular
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");

$conexion = mysqli_connect("127.0.0.1:33065","root","","comunicados");

if (!$conexion) {
  echo json_encode("Error al conectar a la BD");
}
