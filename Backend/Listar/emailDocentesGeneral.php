<?php

    require_once("../conexion/conexion.php");
    //consulta de email de los docentes en general
    $sql_consulta_staff = "SELECT email_staff FROM STAFFS WHERE id_profile_staff1 = 3 and status_staff = 1 ";
    $sql_ejecucion = mysqli_query($conexion,$sql_consulta_staff);
    //verifcar si se ejecuto la consulta de manera correcta
    if (!$sql_ejecucion) {
      echo json_encode("ERROR DE CONSULTA");
    } else {
      //mostrar los datos si la consulta se hizo de manera correcta
      $email = [];
      $i = 0;
      //recorrer los datos devueltos
      $fila = mysqli_num_rows($sql_ejecucion);
      $email[$i]["emails"] =  $fila;
    }

    //consulta de email de los docentes en general
    $sql_consulta_staff = "SELECT email_staff FROM STAFFS WHERE id_profile_staff1 = 3 and status_staff = 1 ";
    $sql_ejecucion = mysqli_query($conexion,$sql_consulta_staff);
    //verifcar si se ejecuto la consulta de manera correcta
    if (!$sql_ejecucion) {
      echo json_encode("ERROR DE CONSULTA");
    } else {
      //mostrar los datos si la consulta se hizo de manera correcta
      $fila = mysqli_num_rows($sql_ejecucion);
      $email[$i]["emails"] =  $fila;
    }

    //consulta de email de los padres en general
    $sql_consulta_parent = "SELECT email_parent FROM students INNER JOIN parents ON parents.id_parent=students.id_parent1
                            WHERE students.status_student = 1";
    $sql_ejecucion = mysqli_query($conexion,$sql_consulta_parent);
    //verifcar si se ejecuto la consulta de manera correcta
    if (!$sql_ejecucion) {
      echo json_encode("ERROR DE CONSULTA");
    } else {
      //mostrar los datos si la consulta se hizo de manera correcta
      $fila = mysqli_num_rows($sql_ejecucion);
      $email[$i]["emails"] =  $fila;

    }


    $sql_consulta_tutores = "SELECT email_staff FROM staffs INNER JOIN teacher_tutor on staffs.id_staff=teacher_tutor.id_staff2
                              WHERE teacher_tutor.status_mentor = 1";
    $sql_ejecucion = mysqli_query($conexion,$sql_consulta_tutores);
    //verifcar si se ejecuto la consulta de manera correcta
    if (!$sql_ejecucion) {
      echo json_encode("ERROR DE CONSULTA");
    } else {
      //mostrar los datos si la consulta se hizo de manera correcta
      $fila = mysqli_num_rows($sql_ejecucion);
      $email[$i]["emails"] =  $fila;
    }

    //consulta de email de los padres en general
    $sql_consulta_GS = "SELECT email_parent FROM students INNER JOIN parents ON parents.id_parent=students.id_parent1
                              WHERE students.status_student = 1 and students.id_grade2 = '$grado' and students.id_section1 = '$seccion'";
    $sql_ejecucion = mysqli_query($conexion,$sql_consulta_GS);
    //verifcar si se ejecuto la consulta de manera correcta
    if (!$sql_ejecucion) {
      echo json_encode("ERROR DE CONSULTA");
    } else {
      //mostrar los datos si la consulta se hizo de manera correcta
      $fila = mysqli_num_rows($sql_ejecucion);
      $email[$i]["emails"] =  $fila;
    }

    echo json_encode($email);
