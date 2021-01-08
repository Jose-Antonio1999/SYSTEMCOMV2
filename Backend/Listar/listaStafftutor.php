<?php

require_once("../conexion/conexion.php");

$sql = "SELECT staffs.id_staff, staffs.id_card_number_staff, staffs.name_staff, staffs.firts_name_staff,
        staffs.last_name_staff,staffs.email_staff,staffs.phone_number_staff, grades.id_grade, section.id_section, grades.grade, section.section
        from staffs LEFT join teacher_tutor on teacher_tutor.id_staff2= staffs.id_staff
        LEFT join grades on teacher_tutor.id_grade1 = grades.id_grade
        LEFT join section on teacher_tutor.id_section2= section.id_section
        WHERE staffs.id_profile_staff1 = '3' and staffs.status_staff = '1' ";

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
  $lista[$i]['id_grade'] = $fila['id_grade'];
  $lista[$i]['id_section'] = $fila['id_section'];
  $lista[$i]['grade'] = $fila['grade'];
  $lista[$i]['section'] = $fila['section'];
  $i++;
}

echo json_encode($lista);
