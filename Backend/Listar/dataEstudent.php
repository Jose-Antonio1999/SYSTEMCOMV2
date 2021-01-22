<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)) {

  //decodificar
  $data = json_decode($data);
  $grado = $data->grado;
  $seccion = $data->seccion;
  $idTutor = $data->idTutor;

  $sql = "SELECT grade, section,id_student,DNI_student, name_student, firts_name_student, last_name_student,
                  promotion_student, email_student, path_photo_students, id_parent, DNI_parent, name_parent,
                  firts_name_parent, last_name_parent, email_parent, phone_number_parent

FROM teacher_tutor INNER JOIN grades on teacher_tutor.id_grade1 = grades.id_grade
            INNER JOIN students ON grades.id_grade = students.id_grade2
            INNER JOIN section ON section.id_section = students.id_section1
            INNER JOIN photos_students ON photos_students.id_student2 = students.id_student
            INNER JOIN parents ON students.id_parent1 = parents.id_parent
            WHERE teacher_tutor.id_staff2 = '$idTutor' AND students.status_student = '1' AND grades.grade = '$grado'
            AND section.section = '$seccion' and teacher_tutor.status_mentor = '1'" ;

  $query = mysqli_query($conexion,$sql);

  $lista = [];
  $i = 0;

  while ($fila = mysqli_fetch_array($query)) {
    $lista[$i]['grade'] = $fila['grade'];
    $lista[$i]['section'] = $fila['section'];
    $lista[$i]['id_student'] = $fila['id_student'];
    $lista[$i]['DNI_student'] = $fila['DNI_student'];
    $lista[$i]['name_student'] = $fila['name_student'];
    $lista[$i]['firts_name_student'] = $fila['firts_name_student'];
    $lista[$i]['last_name_student'] = $fila['last_name_student'];
    $lista[$i]['promotion_student'] = $fila['promotion_student'];
    $lista[$i]['email_student'] = $fila['email_student'];
    $lista[$i]['path_photo_students'] = $fila['path_photo_students'];
    $lista[$i]['id_parent'] = $fila['id_parent'];
    $lista[$i]['DNI_parent'] = $fila['DNI_parent'];
    $lista[$i]['name_parent'] = $fila['name_parent'];
    $lista[$i]['firts_name_parent'] = $fila['firts_name_parent'];
    $lista[$i]['last_name_parent'] = $fila['last_name_parent'];
    $lista[$i]['email_parent'] = $fila['email_parent'];
    $lista[$i]['phone_number_parent'] = $fila['phone_number_parent'];
    $i++;
  }

  echo json_encode($lista);

}
