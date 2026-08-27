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



$idutente=$_GET['id'];


  require_once __DIR__ . '/db2.inc.php';  //NEW MYSQL //



//  ================================  //


function controlla_ps ( $idutente, $db ) {  //inizio test su ps

  $Mysql="SELECT PScorrenti, maxps, lastps FROM personaggio
    LEFT JOIN generazione ON personaggio.generazione = generazione.generazione
    LEFT JOIN blood ON personaggio.bloodp = blood.bloodp
  WHERE idutente=$idutente";
  $Result=mysqli_query ($db, $Mysql);
  $res=mysqli_fetch_array($Result);

  $PScorrenti=$res['PScorrenti'];
  $setetot=$res['maxps'];
  $lastps=$res['lastps'];

  if ( $PScorrenti == $setetot ) {  // tutto ok
    //
  } else {
    $now=time();
    $qlastps=strtotime($lastps);

    $diff =  ($now - $qlastps) / (12*60*60);

    if ( $diff > 1 ) {
      $newlastps=date("Y-m-d H:i:s",$now );
      $Mysql="UPDATE personaggio SET PScorrenti = $setetot , lastps = '$newlastps' WHERE idutente=$idutente";
      $Result=mysqli_query ($db, $Mysql);
    }
  }
}  //fine test su ps

function controlla_fdv ( $idutente , $db ) {    //controllo-aggiorno fdv

  $Mysql="SELECT fdv,fdvmax,lastfdv FROM personaggio WHERE idutente=$idutente";
  $Result=mysqli_query ($db, $Mysql);
  $res=mysqli_fetch_array($Result);

  $fdv=$res['fdv'];
  $fdvmax=$res['fdvmax'];
  $lastfdv=$res['lastfdv'];

  if ( $fdv == $fdvmax ) {  // tutto ok
    $Mysql="UPDATE personaggio SET lastfdv=NOW()  WHERE idutente=$idutente";
    $Result=mysqli_query ($db, $Mysql);

  } else {
    $base=strtotime("2017-01-01 18:00:00");
    $qlastftv=strtotime($lastfdv);
    $now=time();

    $tramonti0=floor( ($qlastftv - $base)/( 24*60*60 )) ;
    $tramonti1=floor(($now - $base) / ( 24*60*60 ) );

    $difftramonti=$tramonti1-$tramonti0;

    if ( $difftramonti > 0 ) {
      $newfdv=$fdv+$difftramonti;
      if ($newfdv > $fdvmax)  {$newfdv=$fdvmax ;}

      $newlastfdv=$base + $tramonti1*( 24*60*60 )+1;

      $newlastfdvstring=date("Y-m-d H:i:s",$newlastfdv );

      $Mysql="UPDATE personaggio SET fdv = $newfdv , lastfdv = '$newlastfdvstring' WHERE idutente=$idutente";
      $Result=mysqli_query ($db, $Mysql);

    } else {
      // echo "<br>da quando ho controlato fdv non è passato un tramonto";
    }
  } // fine verifica se fdv < fdvmax
} // fine controllo fdv





function controlla_legami ($idutente, $db) {   /** 2 - 5 - 10 mesi + 5gg di sfrido */
  // legami
  $Mysql="DELETE FROM legami WHERE target = $idutente and livello = 1 and (DATE_ADD(dataultima, INTERVAL 65 DAY) < NOW())";
  $Result = mysqli_query($db, $Mysql);
  $Mysql="UPDATE legami SET livello=1 , dataultima=NOW() WHERE target = $idutente and livello = 2 and (DATE_ADD(dataultima, INTERVAL 155 DAY) < NOW())";
  $Result = mysqli_query($db, $Mysql);
  $Mysql="UPDATE legami SET livello=2 , dataultima=NOW() WHERE target = $idutente and livello = 3 and (DATE_ADD(dataultima, INTERVAL 305 DAY) < NOW())";
  $Result = mysqli_query($db, $Mysql);
}

function controlla_maesta ( $idutente, $db) {  //inizio test su ps

  $Mysql="SELECT nummaesta, lastmaesta, fdv FROM personaggio
  WHERE idutente=$idutente";
  $Result=mysqli_query ($db, $Mysql);
  $res=mysqli_fetch_array($Result);

  $nummaesta=$res['nummaesta'];
  $lastmaesta=$res['lastmaesta'];
  $fdv=$res['fdv'];

  if ( $nummaesta == $fdv ) {  // tutto ok
    //
  } else {
    $now=time();
    $qlastps=strtotime($lastmaesta);

    $diff =  ($now - $qlastps) / (24*60*60);

    if ( $diff > 1 ) {
      $newlastps=date("Y-m-d H:i:s",$now );
      $Mysql="UPDATE personaggio SET nummaesta =$fdv , lastmaesta = NOW() WHERE idutente=$idutente";
      $Result=mysqli_query ($db, $Mysql);
    }
  }
}  //fine test su ps

// pulizia periodica
	$MM="DELETE FROM dadi WHERE DATE_ADD( Ora , INTERVAL 24 HOUR )<NOW()";
	mysqli_query($db, $MM);

/* controllo e aggiornamento fdv, ps, legami, maesta */

      controlla_ps ( $idutente, $db) ;
      controlla_fdv ( $idutente, $db ) ;
      controlla_legami ($idutente, $db ) ;
      controlla_maesta ($idutente, $db ) ;
      


    //fine test su ps

     $MySql = "SELECT *  FROM personaggio
            LEFT JOIN clan ON personaggio.idclan=clan.idclan
            LEFT JOIN statuscama ON personaggio.idstatus=statuscama.idstatus
            LEFT JOIN sentieri ON personaggio.idsentiero=sentieri.idsentiero
            LEFT JOIN generazione ON personaggio.generazione=generazione.generazione
            LEFT JOIN blood ON personaggio.bloodp=blood.bloodp
            LEFT JOIN cronaca ON personaggio.IDcronaca=cronaca.IDcronaca
            LEFT JOIN lineedisangue ON personaggio.idlds=lineedisangue.idlds
            WHERE idutente = '$idutente' ";

      $Result = mysqli_query($db, $MySql);
      $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ;
      $utente = $res;
      





      /*********************    SKILL  */
    $skill = [];

    $MySql = "SELECT nomeskill,livello, skill.idskill, tipologia  FROM skill
          LEFT JOIN skill_main ON skill_main.idskill=skill.idskill
          WHERE idutente = '$idutente' and subskill = 0 and tipologia = 0
          order by nomeskill";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
      
      $nomeskill = $res['nomeskill'];
      $livello = intval($res['livello']);
      $idx= $res['idskill'];
      $subskill = [];

      $mysql2 = "SELECT skill.idskill, nomeskill, livello from skill
        left join skill_main ON skill_main.idskill=skill.idskill
          where idutente = $idutente and subskill = $idx"; 
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
          WHERE idutente = '$idutente' and (tipologia = 1 or tipologia = 2)
          order by nomeskill";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
      
      $otherskill [] = $res;
      
    }

    /******************    Discipline  */




    $discipline = [];

    $MySql = "SELECT  discipline.iddisciplina , nomedisc ,livello   FROM discipline
          LEFT JOIN discipline_main ON discipline_main.iddisciplina=discipline.iddisciplina
          WHERE idutente = '$idutente'
          ORDER BY discipline.iddisciplina";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $idisciplina = $res['iddisciplina'];
      $nomedisc = $res ['nomedisc'];
      $livello = intval($res [ 'livello']);

      $poteri = [];

      $mysql2 = "SELECT poteri_main.idpotere, poteri_main.livellopot, poteri_main.nomepotere, poteri_main.attivo from poteri 
      left join poteri_main on poteri.idpotere = poteri_main.idpotere 
      where poteri_main.iddisciplina = $idisciplina and poteri.idutente = $idutente";
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
      WHERE idutente = '$idutente' ORDER BY background.idback";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {



      if ( $res['idback'] == 2 ) {    // RISORSE
        $saldo = $res['livello'];
        $now = time();
        $MySqlX = "SELECT * FROM risorse WHERE idutente = '$idutente' order by dataspesa desc";
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
          WHERE idutente = '$idutente'
          ORDER BY livello DESC";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $alleati[] =  $res;
    }
    

    $MySql = "SELECT  nomecontatto   ,livello   FROM contatti
          WHERE idutente = '$idutente'
          ORDER BY livello DESC";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $contatti[] =  $res;
    }


    /******************     necro / taum  */

    $taum =[];

   $MySql = "SELECT  nometaum ,  livello  FROM taumaturgie
          LEFT JOIN taumaturgie_main ON taumaturgie_main.idtaum=taumaturgie.idtaum
          WHERE idutente = '$idutente' ORDER BY livello DESC";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $taum[] =  $res;
    }

      $necro =[];

		$MySql = "SELECT  nomenecro as nomeskill  ,livello,tipologia  FROM necromanzie
          LEFT JOIN necromanzie_main ON necromanzie_main.idnecro=necromanzie.idnecro
          WHERE idutente = '$idutente' ORDER BY livello DESC ";

    $Result = mysqli_query($db, $MySql);
    while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {

      $necro[] =  $res;
    }



    

    

  

    
    $out = [
      'utente' => $utente,
      'skill' => $skill,
      'otherskill' => $otherskill,
      'discipline' => $discipline,
      'background' => $background,
      'alleati' => $alleati,
      'contatti' => $contatti,
      'necro' => $necro,
      'taum' => $taum,
    ];




    echo json_encode($out);


?>
