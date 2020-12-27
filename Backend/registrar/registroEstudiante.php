<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //Decodificar la data personal
  $data_student = json_decode($data);

  //recogemos la data
  $nombre_apoderado = $data_student->nombre_apoderado;
  $nombre_estudiante = $data_student->nombre_estudiante;
  $apellidoM_apoderado = $data_student->apellidoM_apoderado;
  $apellidoM_estudiante = $data_student->apellidoM_estudiante;
  $apellidoP_apoderado = $data_student->apellidoP_apoderado;
  $apellidoP_estudiante = $data_student->apellidoP_estudiante;
  $celular_apoderado = $data_student->celular_apoderado;
  $correo_apoderado = $data_student->correo_apoderado;
  $correo_estudiante = $data_student->correo_estudiante;
  $dni_apoderado = $data_student->dni_apoderado;
  $dni_estudiante = $data_student->dni_estudiante;
  $grado = $data_student->grado;
  $photo_tuta = $data_student->photo;
  $seccion = $data_student->seccion;

  //consultas SQL
  $sql_insert_parents = "INSERT INTO PARENTS VALUES (NULL,'$dni_apoderado','$nombre_apoderado','$apellidoP_apoderado',
                                                      '$apellidoM_apoderado','$correo_apoderado','$celular_apoderado')";
  $ejecucion_parents = mysqli_query($conexion,$sql_insert_parents);

  if (!$ejecucion_parents) {
    echo json_encode("ERROR AL INSERTAR APODERANDO");
  } else {

    //recuperar id del padre
    $sql_id_parent = "SELECT id_parent FROM PARENTS WHERE DNI_parent = '$dni_apoderado' ";
    $ejecucion_id_parent = mysqli_query($conexion,$sql_id_parent);

    while($id=mysqli_fetch_array($ejecucion_id_parent)){
      $id_parent = $id[0];
    }

    //insert al estudiante
    $anioActual = date('Y');
    $sql_insert_student = "INSERT INTO STUDENTS VALUES (NULL,'$dni_estudiante','$nombre_estudiante','$apellidoP_estudiante','$apellidoM_estudiante',
                                                        '$anioActual','1','$correo_estudiante','5','$id_parent','$seccion','$grado')";
    $ejecucion_insert_student = mysqli_query($conexion,$sql_insert_student);

    if(!$ejecucion_insert_student) {
      echo json_encode("ERROR AL INSERTAR ESTUDIANTE");
    } else {

      //recuperar id del estudiante
      $sql_id_student = "SELECT id_student FROM STUDENTS WHERE DNI_student = '$dni_estudiante' ";
      $ejecucion_id_student = mysqli_query($conexion,$sql_id_student);

      while($ids=mysqli_fetch_array($ejecucion_id_student)){
        $id_student = $ids[0];
      }
      //inserta foto
      $sql_insert_photo = "INSERT INTO PHOTOS_STUDENTS VALUES(null,'$dni_estudiante','$photo_tuta','$id_student')";
      $ejecucion_insert_photo  = mysqli_query($conexion,$sql_insert_photo);
      //verificar la consulta ejecutada
      if (!$ejecucion_insert_photo) {
        echo json_encode("ERROR AL INSERTAR PHOTO");
      } else {
        //obtener el valor del perfil
        $perfil = 50;
        //pasw new
        $pass_new = md5($dni_estudiante);
        //insertar a la tabla usuarios
        $insert_user = "INSERT INTO USERS VALUES(null,'$perfil','$correo_estudiante','$pass_new','habilitado')";
        $sql_insert_user = mysqli_query($conexion,$insert_user);

        if(!$sql_insert_user) {
          echo json_encode("ERROR AL INSERTAR USUARIO");
        } else {
          //devolver 1 si el registro fue exitoso
          echo json_encode("REGISTRO EXITOSO");
        }

      }

    }

  }

}
