<?php


require_once("../conexion/conexion.php");

$sql_query_student = "SELECT `id_student`,`DNI_student`,`name_student`,`firts_name_student`,`last_name_student`,`promotion_student`,
                              `email_student`,`status_student`,`id_parent`,`DNI_parent`,`name_parent`,`firts_name_parent`,`last_name_parent`,
                              `email_parent`, `phone_number_parent`,`id_grade`,`grade`,`id_section`,`section`,`id_photos_student`,
                              `path_photo_students`
                      FROM parents INNER JOIN students ON parents.id_parent = students.id_parent1
                                    INNER JOIN grades ON grades.id_grade = students.id_grade2
                                    INNER JOIN section ON section.id_section = students.id_section1
                                    INNER JOIN photos_students ON photos_students.id_student2 = students.id_student
                                    WHERE students.status_student = '1' ";

$query = mysqli_query($conexion,$sql_query_student);

$lista = [];
$i = 0;

while ($fila = mysqli_fetch_array($query)) {
  $lista[$i]['id_student'] = $fila['id_student'];
  $lista[$i]['DNI_student'] = $fila['DNI_student'];
  $lista[$i]['name_student'] = $fila['name_student'];
  $lista[$i]['firts_name_student'] = $fila['firts_name_student'];
  $lista[$i]['last_name_student'] = $fila['last_name_student'];
  $lista[$i]['promotion_student'] = $fila['promotion_student'];
  $lista[$i]['email_student'] = $fila['email_student'];
  $lista[$i]['status_student'] = $fila['status_student'];
  $lista[$i]['id_parent'] = $fila['id_parent'];
  $lista[$i]['DNI_parent'] = $fila['DNI_parent'];
  $lista[$i]['name_parent'] = $fila['name_parent'];
  $lista[$i]['firts_name_parent'] = $fila['firts_name_parent'];
  $lista[$i]['last_name_parent'] = $fila['last_name_parent'];
  $lista[$i]['email_parent'] = $fila['email_parent'];
  $lista[$i]['phone_number_parent'] = $fila['phone_number_parent'];
  $lista[$i]['id_grade'] = $fila['id_grade'];
  $lista[$i]['grade'] = $fila['grade'];
  $lista[$i]['id_section'] = $fila['id_section'];
  $lista[$i]['section'] = $fila['section'];
  $lista[$i]['id_photos_student'] = $fila['id_photos_student'];
  $lista[$i]['path_photo_students'] = $fila['path_photo_students'];
  $i++;
}

echo json_encode($lista);
