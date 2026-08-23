<?php
	include ('messaggi.inc.php');

	header("Access-Control-Allow-Origin: *");

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





	require_once __DIR__ . '/db2.inc.php';    // NEW MSQLI //

 	$idutente=$_GET['id'];

	// $idutente = 1 ;   // TEST *****************

	

 	$Mysql="SELECT nomepg,  maxps, idlds from personaggio 
		LEFT JOIN generazione ON personaggio.generazione = generazione.generazione
		WHERE idutente=$idutente";
	$Result=mysqli_query ($db, $Mysql);
	$res=mysqli_fetch_array($Result);

	$PScorrenti=$res['PScorrenti'];
	$maxps=$res['maxps'];
	$nomepg=$res['nomepg'];
	$xnomepg=mysqli_real_escape_string($db,$nomepg);
	$idslds=$res['idlds'];

	$newps = $PScorrenti + 3;
	if ($newps > $maxps) {
		$newps = $maxps;
	}

	$Mysql="UPDATE personaggio SET PScorrenti = $newps , lastps=NOW()  WHERE idutente=$idutente";
	mysqli_query ($db, $Mysql);




	$testo="ha utilizzato Animalità.3 Richiamo";
	$xtesto=mysqli_real_escape_string($db, $testo);
	//$Mysql="INSERT INTO dadi ( idutente, nomepg, Ora, Testo, Destinatario) VALUES ( $idutente, '$xnomepg', NOW(), '$xtesto' , $idutente ) ";
	$Mysql="INSERT INTO dadi ( idutente, nomepg, Ora, Testo, Destinatario) VALUES ( $idutente, '$xnomepg', NOW(), '$xtesto' , 0 ) ";
	mysqli_query($db, $Mysql);


	user2master($idutente, $testo, $db);



	$out= "OK";
	echo json_encode($out, JSON_UNESCAPED_UNICODE);

?>
