<?php

  //http://stackoverflow.com/questions/18382740/cors-not-working-php
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
      header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
  }


  //http://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined


  $idutente=$_GET['id'];


    include ('db.inc.php');

    $out1 = [];

    $MySql = "SELECT discipline_main.iddisciplina, livellopot, nomepotere, attivo, nomedisc FROM poteri
      LEFT JOIN poteri_main ON poteri.idpotere = poteri_main.idpotere
      LEFT JOIN discipline_main ON poteri_main.iddisciplina = discipline_main.iddisciplina
          WHERE idutente = '$idutente'
      ORDER BY iddisciplina ASC, livellopot ASC";



    $Result = mysql_query($MySql);
    while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
      //print_r ($res);

      $out1[] =  $res;
    }



    $output = json_encode ($out1, JSON_UNESCAPED_UNICODE);
    echo $output;

?>
