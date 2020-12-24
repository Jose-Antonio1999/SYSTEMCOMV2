<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$email = file_get_contents("php://input");

$sql_consulta_photo = "SELECT id_staff,id_card_number_staff,name_staff,firts_name_staff,last_name_staff,
                                email_staff,phone_number_staff,path_photo_staffs FROM staff_photos
                                INNER JOIN staffs on staff_photos.id_staff1=staffs.id_staff
                                WHERE email_staff = '$email'; ";

$ejecucion_conuslta = mysqli_query($conexion,$sql_consulta_photo);

$lista = [];
$i = 0;

while ($data = mysqli_fetch_array($ejecucion_conuslta)) {
    $lista[$i]['id_staff'] = $data['id_staff'];
    $lista[$i]['id_card_number_staff'] = $data['id_card_number_staff'];
    $lista[$i]['name_staff'] = $data['name_staff'];
    $lista[$i]['firts_name_staff'] = $data['firts_name_staff'];
    $lista[$i]['last_name_staff'] = $data['last_name_staff'];
    $lista[$i]['email_staff'] = $data['email_staff'];
    $lista[$i]['phone_number_staff'] = $data['phone_number_staff'];
    $lista[$i]['path_photo_staffs'] = $data['path_photo_staffs'];
    $i++;
}

echo json_encode($lista);

