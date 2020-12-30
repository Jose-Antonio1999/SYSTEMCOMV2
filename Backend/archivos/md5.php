<?php


$hola = md5("hello");

$time = time();
$hora =  date('H:i:s', $time);

echo json_encode($hora);
