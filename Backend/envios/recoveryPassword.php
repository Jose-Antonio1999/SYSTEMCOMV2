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

//creamos una función para generar contraseña
function generarPassword(){
  //Carácteres para la contraseña
  $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  $password = "";
    //Reconstruimos la contraseña segun la longitud que se quiera
  for($i=0;$i<10;$i++) {
      //obtenemos un caracter aleatorio escogido de la cadena de caracteres
    $password .= substr($str,rand(0,62),1);
  }
    //Mostramos la contraseña generada
  return $password;
}
// Get obtenemos los datos
$data = file_get_contents("php://input");

if(isset($data)){

  $DATA = json_decode($data);
  //obtenemos los dartos
  $email = mysqli_real_escape_string($conexion,trim($DATA->email));
  //seleccionar si el email existe
  $sql = "SELECT user FROM users WHERE user = '$email' ";
  $query = mysqli_query($conexion,$sql);
  //verificar si hay un registro
  if(mysqli_num_rows($query)>0){
    //actualización del password
    $newPassword = generarPassword();
    $encrypPass = md5($newPassword);
    $sqlUpdatePass =  "UPDATE users SET pass = '$encrypPass' WHERE user ='$email' ";
    //ejecutar la consulta
    $queryUpdate = mysqli_query($conexion,$sqlUpdatePass);

    $usuario = utf8_decode('BELÉN DE OSMA Y PARDO');
    // Instantiation and passing `true` enables exceptions
    $mail = new PHPMailer(true);
    $codigo = "<!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='utf-8'>
        <title>Comunicado</title>
    </head>
    <body>
    <table style='max-width: 600px;  margin: auto; background: #E5E7E9; padding: 20px; border-radius: 5px; -webkit-box-shadow: 0px 5px 3px 2px rgba(40,116,166,1);
      -moz-box-shadow: 0px 5px 3px 2px rgba(40,116,166,1);
      box-shadow: 0px 5px 3px 2px rgba(40,116,166,1); text-align: justify'>
        <tr>
            <td style='font-family: 'Times New Roman', Times, serif; '>
                <h2 style='text-align: center;color: #0B619E;font-family: Candara; '>INSTITUCIÓN EDUCATIVA BELEN DE OSMA Y PARDO</h2>
                <img src='https://i.postimg.cc/9Xw71wvk/Insignia1.png' style='width: 10%; margin: auto; display: flex;'>
                <p style='font-family: Candara;'>Recibimos la solicitud de enviarte tu usuario (email) y clave de acceso para acceder al Sistema de comunicado de willanaApp
                                                Recuerda cambiar su contraseña</p>
                <p><b style='color: #1F618D; font-size: 16px;'>Usuario:</b> <b style='font-size: 16px;'> $email</b></p>
                <p><b style='color: #1F618D ; font-size: 16px;'>Contraseña:</b> <b style='font-size: 16px;'> $newPassword</b></p>
                <br>
                <p style='text-align: center; font-family: Candara; '>BOP © 2021 - Andahuaylas</p>
            </td>
        </tr>
    </table>
    </body>
    </html>";

    try {
        //Server settings
        $mail->SMTPDebug = 0;                      // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'your email for recovery password';      // SMTP 
        $mail->Password   = 'your password';                               // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
        //Recipients
        $mail->setFrom('pruebaunajma@gmail.com', $usuario);
        $mail->addAddress($email, 'Usuario de WillanaApp');     // Add a recipient
        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Restablecer password';
        $mail->Body    = $codigo;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        echo json_encode('1');
    } catch (Exception $e) {
        //echo json_encode("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
        echo json_encode('0');
    }

  }else{
    echo json_encode('0');
  }


}


