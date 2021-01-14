<?php

require_once("../conexion/conexion.php");

$sql = "SELECT staffs.id_staff, staffs.id_card_number_staff, staffs.name_staff, staffs.firts_name_staff,
              staffs.last_name_staff,staffs.email_staff,staffs.phone_number_staff, staff_photos.path_photo_staffs,
              teacher_tutor.id_grade1, teacher_tutor.id_section2, grades.grade, section.section, teacher_tutor.status_mentor
              FROM staffs INNER JOIN staff_photos on staff_photos.id_staff1 = staffs.id_staff
              LEFT join teacher_tutor on teacher_tutor.id_staff2= staffs.id_staff
              LEFT join grades on teacher_tutor.id_grade1 = grades.id_grade
              LEFT join section on teacher_tutor.id_section2 = section.id_section
WHERE staffs.id_profile_staff1 = '3' and staffs.status_staff = '1' AND teacher_tutor.date IS NULL or teacher_tutor.status_mentor = '3' ";

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
  $lista[$i]['path_photo_staffs'] = $fila['path_photo_staffs'];
  $lista[$i]['id_grade1'] = $fila['id_grade1'];
  $lista[$i]['id_section2'] = $fila['id_section2'];
  $lista[$i]['grade'] = $fila['grade'];
  $lista[$i]['section'] = $fila['section'];
  $lista[$i]['status_mentor'] = $fila['status_mentor'];
  $i++;
}

echo json_encode($lista);
