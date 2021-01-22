<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$dni = file_get_contents("php://input");

$sql_consulta_photo = "SELECT id_staff, id_card_number_staff, email_staff, id_teacher_tutor, grade, section
                              FROM staffs INNER JOIN teacher_tutor ON staffs.id_staff = teacher_tutor.id_staff2
                              LEFT JOIN grades on grades.id_grade  = teacher_tutor.id_grade1
                              LEFT JOIN section ON section.id_section = teacher_tutor.id_section2
                              WHERE id_card_number_staff = '$dni' and teacher_tutor.status_mentor = '1'; ";

$ejecucion_conuslta = mysqli_query($conexion,$sql_consulta_photo);

$lista = [];
$i = 0;

while ($data = mysqli_fetch_array($ejecucion_conuslta)) {
    $lista[$i]['id_staff'] = $data['id_staff'];
    $lista[$i]['id_card_number_staff'] = $data['id_card_number_staff'];
    $lista[$i]['email_staff'] = $data['email_staff'];
    $lista[$i]['id_teacher_tutor'] = $data['id_teacher_tutor'];
    $lista[$i]['grade'] = $data['grade'];
    $lista[$i]['section'] = $data['section'];
    $i++;
}

echo json_encode($lista);

