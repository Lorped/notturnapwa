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




    include ('db.inc.php');

    $out = [];
    $out1 = [];
    $out2 = [];

    $MySql = "SELECT iddisciplina, nomedisc FROM discipline_main ORDER BY nomedisc";
    $Result = mysql_query($MySql);
    while ( $res = mysql_fetch_array($Result, MYSQL_ASSOC)   ) {
      $out1[] = $res;
    }

    $MySql = "SELECT idpotere, nomepotere, livellopot FROM poteri_main ORDER BY livellopot, nomepotere";
    $Result = mysql_query($MySql);
    while ( $res = mysql_fetch_array($Result, MYSQL_ASSOC)   ) {
      $out2[] = $res;
    }

    $MySql = "SELECT idskill, nomeskill FROM skill_main ORDER BY nomeskill";
    $Result = mysql_query($MySql);
    while ( $res = mysql_fetch_array($Result, MYSQL_ASSOC)   ) {
      $out3[] = $res;
    }



    $out [] = [
        'discipline' => $out1,
        'poteri'  => $out2,
        'skill' => $out3
    ];



    $output = json_encode ($out, JSON_UNESCAPED_UNICODE);
    echo $output;

?>
