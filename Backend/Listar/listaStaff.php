<?php

require_once("../conexion/conexion.php");

$sql = "SELECT * FROM PROFILE_USERS INNER JOIN STAFFS ON
        PROFILE_USERS.id_profile_user = STAFFS.id_profile_staff1 INNER JOIN
        STAFF_PHOTOS ON STAFFS.id_staff = STAFF_PHOTOS.id_staff1";
$query = mysqli_query($conexion,$sql);

$lista = [];
$i = 0;

while ($fila = mysqli_fetch_array($query)) {
  $lista[$i]['id_staff'] = $fila['id_staff'];
  $lista[$i]['id_card_number_staff'] = $fila['id_card_number_staff'];
  $lista[$i]['name_staff'] = $fila['name_staff'];
  $lista[$i]['firts_name_staff'] = $fila['firts_name_staff'];
  $lista[$i]['last_name_staff'] = $fila['last_name_staff'];
  $lista[$i]['email_staff'] = $fila['email_staff'];
  $lista[$i]['phone_number_staff'] = $fila['phone_number_staff'];
  $lista[$i]['status_staff'] = $fila['status_staff'];
  $lista[$i]['profile_user'] = $fila['profile_user'];
  $lista[$i]['path_photo_staffs'] = $fila['path_photo_staffs'];
  $i++;
}

echo json_encode($lista);
