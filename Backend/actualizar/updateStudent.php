<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //Decodificar la data personal
  $data = json_decode($data);

  $apellidoM_apoderado = $data->apellidoM_apoderado;
  $apellidoM_estudiante = $data->apellidoM_estudiante;
  $apellidoP_apoderado = $data->apellidoP_apoderado;
  $apellidoP_estudiante = $data->apellidoP_estudiante;
  $celular_apoderado = $data->celular_apoderado;
  $correo_apoderado = $data->correo_apoderado;
  $correo_estudiante = $data->correo_estudiante;
  $dni_apoderado = $data->dni_apoderado;
  $dni_estudiante_2 = $data->dni_estudiante_2;
  $grado = $data->grado;
  $nombre_apoderado = $data->nombre_apoderado;
  $nombre_estudiante = $data->nombre_estudiante;
  $seccion = $data->seccion;

  //codigo sql
  $sql_verificar_data_parent= "SELECT DNI_parent FROM  parents  WHERE DNI_parent = '$dni_apoderado' ";
  $query_verificar_parent = mysqli_query($conexion, $sql_verificar_data_parent);

  if(!$query_verificar_parent){
    echo json_encode("Error al verificar parent");
  } else {

    if (mysqli_num_rows($query_verificar_parent)>0) {
      //si existe data del padre actualizar
      $sql_update_parent = "UPDATE parents SET DNI_parent = '$dni_apoderado', name_parent = '$nombre_apoderado',
                            firts_name_parent = '$apellidoP_apoderado', last_name_parent = '$apellidoM_apoderado',
                            email_parent = '$correo_apoderado', phone_number_parent = '$celular_apoderado'
                            WHERE DNI_parent = '$dni_apoderado'; ";

      //actualizar con nueva data del alumno
      $sql_update_student = " UPDATE students
      SET name_student = '$nombre_estudiante', firts_name_student = '$apellidoP_estudiante', last_name_student = '$apellidoM_estudiante',
      email_student = '$correo_estudiante', id_section1 = '$seccion', id_grade2 = '$grado'
      WHERE DNI_student = '$dni_estudiante_2'; ";

      //$sql_user = "UPDATE  users  SET user = '$correo_estudiante' WHERE user = ''"
      $sql_update_user = "UPDATE users SET user = '$correo_estudiante' WHERE  DNI = '$dni_estudiante_2'; ";

      $query_update_student = mysqli_query($conexion, $sql_update_student);
      $query_update_parent= mysqli_query($conexion, $sql_update_parent);
      $ejecutar_user = mysqli_query($conexion, $sql_update_user);

      if (!$query_update_student || !$query_update_parent || !$ejecutar_user) {
        echo json_encode("Error al actualizar estudiante");
      } else {
        echo json_encode("Datos actualizados correctamente");
      }

    } else {
      //inserta nuevo parent
      $sql_insert_parents = "INSERT INTO PARENTS VALUES (NULL,'$dni_apoderado','$nombre_apoderado','$apellidoP_apoderado',
      '$apellidoM_apoderado','$correo_apoderado','$celular_apoderado')";
      $ejecucion_parents = mysqli_query($conexion,$sql_insert_parents);

      if (!$ejecucion_parents) {
        echo json_encode("Error al insertar parent");
      } else {

        //recuperar id del padre
        $sql_id_parent = "SELECT id_parent FROM PARENTS WHERE DNI_parent = '$dni_apoderado' ";
        $ejecucion_id_parent = mysqli_query($conexion,$sql_id_parent);

        while($id=mysqli_fetch_array($ejecucion_id_parent)){
          $id_parent = $id[0];
        }

        //actualizar con nueva data del alumno
        $sql_update_student = " UPDATE students
        SET name_student = '$nombre_estudiante', firts_name_student = '$apellidoP_estudiante', last_name_student = '$apellidoM_estudiante',
        email_student = '$correo_estudiante', id_parent1 = '$id_parent', id_section1 = '$seccion', id_grade2 = '$grado'
        WHERE DNI_student = '$dni_estudiante_2'; ";

        $sql_update_user = "UPDATE users SET user = '$correo_estudiante' WHERE  DNI = '$dni_estudiante_2'; ";

        $query_update_student = mysqli_query($conexion, $sql_update_student);
        $ejecutar_user = mysqli_query($conexion, $sql_update_user);

        if (!$query_update_student || !$ejecutar_user) {
            echo json_encode("Error al actualizar estudiante");
        } else {
            echo json_encode("Datos actualizados correctamente");
        }

      }
    }

  }


}
