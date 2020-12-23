<?php

require_once("../conexion/conexion.php");
//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){
  //Decodificar la data personal
  $data_staff = json_decode($data);

  //obtener los datos
  $apellidoM = $data_staff->apellidoM;
  $apellidoP = $data_staff->apellidoP;
  $celular = $data_staff->celular;
  $correo = $data_staff->correo;
  $dni = $data_staff->dni;
  $nombre = $data_staff->nombre;
  $photo_ruta = $data_staff->photo;
  $tipoPersonal = $data_staff->tipoPersonal;
  $estadoTutor = $data_staff->estadoTutor;
  $grado = $data_staff->grado;
  $seccion = $data_staff->seccion;

  $insert_staff = "INSERT INTO STAFFS VALUES(null,'$dni','$nombre','$apellidoP','$apellidoM','$correo','$celular','$tipoPersonal')";
  $query_staff = mysqli_query($conexion,$insert_staff);

  if (!$query_staff) {

    echo json_encode("ERROR AL INSERTAR PERSONAL");

  } else {
      //obtener id de empleado registrado
      $consulta_id = "SELECT id_staff FROM STAFFS WHERE id_card_number_staff = '$dni' ";
      $sql_consulta_id = mysqli_query($conexion,$consulta_id);

      while($id = mysqli_fetch_array($sql_consulta_id)) {
        $id_staff = $id[0];
      }

      //insert a la tabla photo
      $insert_photo = "INSERT INTO STAFF_PHOTOS VALUES(null,'$dni','$photo_ruta','$id_staff')";
      $sql_insert_photo = mysqli_query($conexion,$insert_photo);

      if (!$sql_insert_photo) {
        echo json_encode("ERROR AL INSERTAR PHOTO");
      } else {
        //obtener el valor del perfil
        $perfil = $tipoPersonal*10;
        //insertar a la tabla usuarios
        $insert_user = "INSERT INTO USERS VALUES(null,'$perfil','$correo','$dni','habilitado')";
        $sql_insert_user = mysqli_query($conexion,$insert_user);

        if(!$sql_insert_user) {
          echo json_encode("ERROR AL INSERTAR USUARIO");
        } else {

          if ($estadoTutor=="Si") {
            //registrar tabla tutor
            $fechaActual = date('Y-m-d');
            //obtener id de empleado registrado
            $consulta_id_grado = "SELECT id_grade FROM GRADES WHERE grade = '$grado' ";
            $sql_consulta_id_grado = mysqli_query($conexion,$consulta_id_grado);

            while($id = mysqli_fetch_array($sql_consulta_id_grado)) {
              $id_grado = $id[0];
            }
            //ejercutar la consulta
            $insert_teacher_tutor = "INSERT INTO TEACHER_TUTOR VALUES (NULL,'$fechaActual','1','$id_staff','$id_grado')";
            $sql_teacher_tutor = mysqli_query($conexion,$insert_teacher_tutor);
            if (!$sql_teacher_tutor) {
              echo json_encode("ERROR AL INSERTAR TABLA TUTOR");
            } else {
              echo json_encode("REGISTRO EXITOSO");
            }

          } else {
            echo json_encode("REGISTRO EXITOSO");
          }
        }
      }

    }

}


