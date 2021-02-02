<?php

//al igual que las demas se requiere conexiona la BD
require_once("../conexion/conexion.php");
//inlcuir a archivos con funciones de consulta
include 'archivoConsultas.php';
//uso requrido por la libreria
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

//obtenemos la data de registro
$data = file_get_contents("php://input");

if(isset($data)){

  //decodificar la data
  $data = json_decode($data);
  $asunto = $data->asunto ;
  $cuerpo = $data->cuerpo;
  $destinoGrupal = $data->destinoGrupal;
  $emaildestino = $data->emaildestino;
  $origen = $data->origen;
  $grado = $data->grado;
  $pass = $data->pass;
  $seccion = $data->seccion;
  $tipo = $data->tipo;
  $rutaArchivo = $data->rutaArchivo;

  $direccion_envio = "";

//codigo para aceptar caracteres
$usuario = utf8_decode('Belén de Osma y Pardo');
// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

  try {
      //Server settings
      $mail->SMTPDebug = 0;                      // Enable verbose debug output
      $mail->isSMTP();                                            // Send using SMTP
      $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
      $mail->Username   = $origen;                     // SMTP username
      $mail->Password   = $pass;                               // SMTP password
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
      $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

      //Recipients
      $mail->setFrom($origen, $usuario);

      //si es cero será a padres en general
      if ($destinoGrupal==0) {
          $direccion_envio = "Apoderados en general";
          foreach(emailPadres() as $email) {
            $mail->addAddress($email['email_parent'], 'Apoderado');
          }
      }
      //si es 1 será a docentes en general
      if ($destinoGrupal==1) {
          $direccion_envio = "Docententes en general";
          foreach(emailDocentes() as $email) {
            $mail->addAddress($email['email_staff'], 'Docente');
          }
      }
      //si es 2 será a docentes tutores en general
      if ($destinoGrupal==2) {
          $direccion_envio = "Tutores en general";
          foreach(emailTutores() as $email) {
            $mail->addAddress($email['email_staff'], 'Docente tutor');
          }
      }
      //si es 3 el envio será para una sola persona
      if ($destinoGrupal==3) {
        $direccion_envio = $emaildestino;
        $mail->addAddress($emaildestino, 'Usted');
      }
      //si es 4 será a sera a una sección en especifico
      if ($destinoGrupal==4) {
          $direccion_envio = $grado." ".$seccion;
          foreach(emailsGradoSeccion($grado,$seccion) as $email) {
            $mail->addAddress($email['email_parent'], 'Apoderado');
          }
      }
      //verificar archivo
      $data_file = "";
      if ($rutaArchivo!="" || $rutaArchivo!=null) {
          $data_file = "<div style='font-size: 14px;'>Archivo adjuntado: <a href='$rutaArchivo' target='_blank'>click para ver archivo</a></div>";
      }
      //Codigo html
      $htmlEnviar = "
      <!DOCTYPE html>

      <html lang='es'>
      <head>
          <meta charset='utf-8'>
          <title>Comunicado</title>
          <style>
              table{
                border-collapse:separate;
                border-spacing: 5;
                border-radius:5px;
                -moz-border-radius:5px;
                -webkit-border-radius: 5px;
              }
          </style>
      </head>
      <body>
      <table style='max-width: 600px;padding: 10px;margin:0 auto; background:#F1F3F4'>
          <div style='width:100%; margin: 0 auto; margin-bottom: 5px; height:5px; background:#1B386E;'></div>
          <tr>
              <td style='text-align: center; padding: 0; display: flex; justify-content: space-between'>
                  <img width='90%' style='margin: 1.5% auto; text-align: left' src='https://i.postimg.cc/ZKJ9xQH3/belen3.png'>
              </td>
          </tr>

          <tr>
              <td style='font-family: Times, serif;'>
                  <h2 style='text-align: center;font-size: 25px; font-family:Cardana; '>$asunto</h2>
              </td>
          </tr>
          <tr>
              <td>
                  <div style=' text-align: justify;'>
                      <p style='margin: 2px; font-size: 14px;'>$cuerpo</p>
                  </div>
              </td>
          </tr>
          <tr>
              <td>
                $data_file
              </td>
          </tr>

          <div style='width:100%; margin: 0 auto; margin-bottom: 5px; margin-top:60px; padding-top:20px; height:70px; background:#1B386E;'>
              <p style='color:#FFF; text-align: center; margin:20px;'>Belén de Osma y Pardo - Andahuaylas</p>
          </div>
      </table>
      </body>
      </html>";

       // Add attachments
      // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

      // Content
      $asunto_enviar = utf8_decode($asunto);
      $htmlEnviar = utf8_decode($htmlEnviar);

      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = $asunto_enviar;
      $mail->Body    = $htmlEnviar;
      $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
      $mail->send();

      echo json_encode("1");
      //insert del mensaje a la base de datos
      //obtener id de empleado registrado
      $consulta_id = "SELECT id_staff FROM STAFFS WHERE email_staff = '$origen' ";
      $sql_consulta_id = mysqli_query($conexion,$consulta_id);

      while($id = mysqli_fetch_array($sql_consulta_id)) {
        $id_staff = $id[0];
      }

      $fechaActual = date('Y-m-d');
      $time = time();
      $hora =  date('H:i:s', $time);
      $sql_insert_comu = "INSERT INTO COMMUNIQUES VALUES (NULL,'$asunto','$fechaActual','$cuerpo','$hora','enviado','$tipo','$direccion_envio','$id_staff')";
      $ejecucion_query = mysqli_query($conexion,$sql_insert_comu);

      if ($rutaArchivo!="" || $rutaArchivo!=null) {
        //obtnener el ID del
        $rs = mysqli_query($conexion,"SELECT MAX(id_communiques) AS id FROM COMMUNIQUES");
        if ($row = mysqli_fetch_array($rs)) {
            $id = trim($row[0]);
        }
        $ql_file = "INSERT INTO FILES VALUES (NULL,'$asunto','$rutaArchivo','$id')";
        $ejecucion_query_file = mysqli_query($conexion,$ql_file);
      }

  } catch (Exception $e) {
      //echo json_encode("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
      echo json_encode("0");
  }

}

?>
