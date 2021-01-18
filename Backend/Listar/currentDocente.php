<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$email = file_get_contents("php://input");

$sql_consulta_photo = "SELECT id_staff,id_card_number_staff,name_staff,firts_name_staff,last_name_staff,
                              email_staff,phone_number_staff,path_photo_staffs, profile_user,id_teacher_tutor, grade, section FROM staff_photos
                              LEFT JOIN staffs on staff_photos.id_staff1=staffs.id_staff
                              LEFT JOIN profile_users ON profile_users.id_profile_user = staffs.id_profile_staff1
                              LEFT JOIN teacher_tutor ON staffs.id_staff = teacher_tutor.id_staff2
                              LEFT JOIN grades on grades.id_grade  = teacher_tutor.id_grade1
                              LEFT JOIN section ON section.id_section = teacher_tutor.id_section2
                              WHERE email_staff = '$email' and teacher_tutor.status_mentor = '1' ";

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
    $lista[$i]['profile_user'] = $data['profile_user'];
    $lista[$i]['id_teacher_tutor'] = $data['id_teacher_tutor'];
    $lista[$i]['grade'] = $data['grade'];
    $lista[$i]['section'] = $data['section'];
    $i++;
}

echo json_encode($lista);

