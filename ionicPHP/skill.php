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

header('Content-Type: text/html; charset=utf-8');

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);

  $userid = $request->userid;

//$userid=1;

  if (isset($postdata)  ) {

    require_once __DIR__ . '/db2.inc.php';  // NEW MYSQL //


    /*********************    SKILL  */
    $skill = [];

    $MySql = "SELECT nomeskill,livello, skill.idskill, tipologia  FROM skill
          LEFT JOIN skill_main ON skill_main.idskill=skill.idskill
          WHERE idutente = '$userid' and subskill = 0 and tipologia = 0
          order by nomeskill";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
      
      $nomeskill = $res['nomeskill'];
      $livello = intval($res['livello']);
      $idx= $res['idskill'];
      $subskill = [];

      $mysql2 = "SELECT skill.idskill, nomeskill, livello from skill
        left join skill_main ON skill_main.idskill=skill.idskill
          where idutente = $userid and subskill = $idx"; 
      $Result2 = mysqli_query($db, $mysql2);
      while ( $res2 = mysqli_fetch_array($Result2,MYSQLI_ASSOC) ) {
        $subskill[] = $res2;
      }

      $skill [] = [
        'idskill' => $idx,
        'nomeskill' => $nomeskill,
        'livello' => $livello,
        'tipologia' => 0,
        'subskill' => $subskill
      ]; 
      
    }

    /*********************    OTHERSKILL  */
    $otherskill = [];

    $MySql = "SELECT skill.idskill, nomeskill,livello , tipologia FROM skill
          LEFT JOIN skill_main ON skill_main.idskill=skill.idskill
          WHERE idutente = '$userid' and (tipologia = 1 or tipologia = 2)
          order by nomeskill";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
      
      $otherskill [] = $res;
      
    }

    /******************    Discipline  */




    $discipline = [];

    $MySql = "SELECT  discipline.iddisciplina , nomedisc ,livello   FROM discipline
          LEFT JOIN discipline_main ON discipline_main.iddisciplina=discipline.iddisciplina
          WHERE idutente = '$userid'
          ORDER BY discipline.iddisciplina";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $idisciplina = $res['iddisciplina'];
      $nomedisc = $res ['nomedisc'];
      $livello = intval($res [ 'livello']);

      $poteri = [];

      $mysql2 = "SELECT poteri_main.idpotere, poteri_main.livellopot, poteri_main.nomepotere, poteri_main.attivo from poteri 
      left join poteri_main on poteri.idpotere = poteri_main.idpotere 
      where poteri_main.iddisciplina = $idisciplina and poteri.idutente = $userid";
      $Result2 = mysqli_query($db, $mysql2);
      while ( $res2 = mysqli_fetch_array($Result2,MYSQLI_ASSOC)) {
        $poteri[] = $res2;
      }

      $discipline[] =  [
        'iddisciplina' => $idisciplina,
        'nomedisc' => $nomedisc,
        'livello' => $livello,
        'poteri' => $poteri
      ];
    }

 

    /********   BACKGROUND ************* */

    $background = [];

    $MySql = "SELECT nomeback , background.idback ,livello FROM background 
      LEFT JOIN background_main ON background_main.idback=background.idback 
      WHERE idutente = '$userid' ORDER BY background.idback";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {



      if ( $res['idback'] == 2 ) {    // RISORSE
        $saldo = $res['livello'];
        $now = time();
        $MySqlX = "SELECT * FROM risorse WHERE idutente = '$userid' order by dataspesa desc";
        $ResultX = mysqli_query($db, $MySqlX);
        while ( $resX = mysqli_fetch_array ($ResultX) ) {
          $spesa = $resX['spesa'];
          $dataspesa = strtotime ( $resX['dataspesa'] );
          $cadenza = $resX['cadenzarecupero'];
          $datediff = $now - $dataspesa;
          $giorni = floor($datediff / (60 * 60 * 24));
          $recuperati = floor ( $giorni / $cadenza);
          if ( $recuperati > $spesa ) {
            $recuperati = $spesa;
          }
          $saldo = $saldo - $spesa + $recuperati;
        }
        $risorseeff = [
          'nomeback' => 'Risorse effettive' ,
          'livello' => $saldo,
          'idback' => 2
        ];
        if ($saldo != $res['livello']) {
          $background[]  = $risorseeff;
        } else {
          $background[] =  $res;
        }

      } else {
        $background[] =  $res;
      }

    }

    /******************** ALLEATI / CONTATTI */

    $alleati = [];
    $contatti = [];

    $MySql = "SELECT  nomealleato , livello  FROM alleati
          WHERE idutente = '$userid'
          ORDER BY livello DESC";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $alleati[] =  $res;
    }
    

    $MySql = "SELECT  nomecontatto   ,livello   FROM contatti
          WHERE idutente = '$userid'
          ORDER BY livello DESC";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $contatti[] =  $res;
    }


    /******************     necro / taum  */

    $taum =[];

   $MySql = "SELECT  nometaum ,  livello  FROM taumaturgie
          LEFT JOIN taumaturgie_main ON taumaturgie_main.idtaum=taumaturgie.idtaum
          WHERE idutente = '$userid' ORDER BY livello DESC";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $taum[] =  $res;
    }

      $necro =[];

		$MySql = "SELECT  nomenecro as nomeskill  ,livello,tipologia  FROM necromanzie
          LEFT JOIN necromanzie_main ON necromanzie_main.idnecro=necromanzie.idnecro
          WHERE idutente = '$userid' ORDER BY livello DESC ";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $necro[] =  $res;
    }



    $MySql = "SELECT  nomecontatto as nomeskill  ,livello,tipologia  FROM contatti
          WHERE idutente = '$userid'
          ORDER BY livello DESC";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $out1[] =  $res;
    }
    $MySql = "SELECT  nomealleato as nomeskill  ,livello,tipologia  FROM alleati
          WHERE idutente = '$userid'
          ORDER BY livello DESC";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $out1[] =  $res;
    }

    $MySql = "SELECT  nomepregio as nomeskill  ,valore as livello,tipologia  FROM pregidifetti
      LEFT JOIN pregidifetti_main ON pregidifetti_main.idpregio=pregidifetti.idpregio
          WHERE idutente = '$userid' ";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $out1[] =  $res;
    }

    $MySql = "SELECT  nomerituale as nomeskill  ,livello,tipologia  FROM rituali_t
      LEFT JOIN rituali_t_main ON rituali_t_main.idrituale=rituali_t.idrituale
               WHERE idutente = '$userid' ";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $out1[] =  $res;
    }
     $MySql = "SELECT  nomerituale as nomeskill  ,livello,tipologia  FROM rituali_n
      LEFT JOIN rituali_n_main ON rituali_n_main.idrituale=rituali_n.idrituale
               WHERE idutente = '$userid' ";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $out1[] =  $res;
    }

    

    // influenze

    
    $out = [
      'skill' => $skill,
      'otherskill' => $otherskill,
      'discipline' => $discipline,
      'background' => $background,
      'alleati' => $alleati,
      'contatti' => $contatti,
      'necro' => $necro,
      'taum' => $taum,
    ];


    $output = json_encode ($out, JSON_UNESCAPED_UNICODE);
    echo $output;




  } else {
       header("HTTP/1.1 401 Unauthorized");
      echo "-1";
}
?>
