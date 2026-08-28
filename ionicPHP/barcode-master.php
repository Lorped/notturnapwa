<?php
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


	header('Content-Type: text/html; charset=utf-8');

	include ('messaggi.inc.php');
	require_once __DIR__ . '/db2.inc.php';    // NEW MYSQL //



	

	$barcode=$_GET['barcode'];


	if ( $barcode == "999999999999" || $barcode == "999999999998" || $barcode == "999999999997" || $barcode == "999999999996" ) {

		$testo='';
		switch ($barcode) {
			case "999999999999":
				$testo=" Segreteria - Lazio";
				break;
			case "999999999998":
				$testo=" Segreteria - Umbria";
				break;
			case "999999999997":
				$testo=" Segreteria - Abruzzo";
				break;
			case "999999999996":	
				$testo=" Segreteria - Lombardia";
				break;
		}
					

		$out = [
			'nomeoggetto' => 'SEGRETERIA',
			'descrizione' => $testo,
			'esito' => [],
			'esitoSI' => [],
			'esitoNO' => [],
			'domanda' => null,
			'R1' => null,
			'R2' => null,
		];
				
		$output = json_encode ($out, JSON_UNESCAPED_UNICODE);
		echo $output;
		die();

	} 

	// OGGETTO NORMALE //

	$condizioni = [];
	$nomeoggetto= '';
	$descrizione='';
	$esito = [];

	//verifica PARIRED //

	$Mysql8="SELECT * FROM oggetti WHERE barcode='$barcode' ";
	$Result8=mysqli_query($db, $Mysql8);

	$res8=mysqli_fetch_array($Result8);

	if ( mysqli_num_rows($Result8) == 0 ) {
		$out = [
			'nomeoggetto' => 'ATTENZIONE',
			'descrizione' => 'Oggetto non definito',
			'esito' => [],
			'esitoSI' => [],
			'esitoNO' => [],
			'domanda' => null,
			'R1' => null,
			'R2' => null,
		];
		$output = json_encode ($out, JSON_UNESCAPED_UNICODE);
		echo $output;
		die();
	}


	$idx=$res8['idoggetto'];
	$nomeoggetto=$res8['nomeoggetto'];
	$descrizione=$res8['descrizione'];
	$domanda=$res8['domanda'];
	$ifdomanda=$res8['ifdomanda'];
	$R1=$res8['r1'];
	$R2=$res8['r2'];


	$Mysql="SELECT tipocond, tabcond, valcond, descrX, risp, subskill  FROM oggetti LEFT JOIN cond_oggetti ON oggetti.idoggetto = cond_oggetti.idoggetto WHERE barcode='$barcode' ORDER BY cond_oggetti.valcond ASC ";
	$Result=mysqli_query($db, $Mysql);

	while ( $res=mysqli_fetch_array($Result)) {
		$condizioni[]=$res;
	}


	foreach ($condizioni as $cond) {

		//condizioni su attributi

		if ($cond['tipocond'] == 'A' ){
			switch ( $cond['tabcond'] ) {
				case 1: $cc="forza" ; break;
				case 2: $cc="destrezza" ; break;
				case 3: $cc="attutimento" ; break;
				case 4: $cc="carisma" ; break;
				case 5: $cc="persuasione" ; break;
				case 6: $cc="saggezza" ; break;
				case 7: $cc="percezione" ; break;
				case 8: $cc="intelligenza" ; break;
				case 9: $cc="prontezza" ; break;
			}

			$rigarisp = [
				'motivo' => ucfirst($cc)." >= ".$cond['valcond'],
				'descrizione' => $cond['descrX'],
				'sino' => $cond['risp']
			];
			$esito[] = $rigarisp;	

			
		}
				

		// CONTROLLO DISCIPLINE

		if ($cond['tipocond'] == 'D' ){
			$ids=$cond['tabcond'];
			$Mysql4="SELECT * FROM  discipline_main 
				WHERE discipline_main.iddisciplina = $ids  ";
			$Result4=mysqli_query($db, $Mysql4);

			if ( $res4=mysqli_fetch_array($Result4)  ) {		
				
				$rigarisp = [
					'motivo' => $res4['nomedisc']." >= ".$cond['valcond'],
					'descrizione' => $cond['descrX'],
					'sino' => $cond['risp']
				];
				$esito[] = $rigarisp;	
				
			}
		}

		// POTERI

		if ($cond['tipocond'] == 'P' ){
			$ids=$cond['tabcond'];
			$Mysql4="SELECT * FROM  poteri_main 
				WHERE poteri_main.idpotere = $ids  ";
			$Result4=mysqli_query($db, $Mysql4);

			if ( $res4=mysqli_fetch_array($Result4)  ) {
				
				$rigarisp = [
					'motivo' => $res4['nomepotere'],
					'descrizione' => $cond['descrX'],
					'sino' => $cond['risp']
				];
				$esito[] = $rigarisp;	

			}
		}

		// SKILL DI OGNI TIPO

		if ($cond['tipocond'] == 'X' || $cond['tipocond'] == 'S' || $cond['tipocond'] == 'SS'){
			$ids=$cond['tabcond'];
			$Mysql4="SELECT * FROM skill_main 
				WHERE skill_main.idskill = $ids  ";
			$Result4=mysqli_query($db, $Mysql4);


			if ( $res4=mysqli_fetch_array($Result4)  ) {
				
				$rigarisp = [
					'motivo' => $res4['nomeskill']." >= ".$cond['valcond'],
					'descrizione' => $cond['descrX'],
					'sino' => $cond['risp']
				];
				$esito[] = $rigarisp;	

			}
		}

	}

	if ($ifdomanda == 'S' && $domanda != '' ) {
		$rigarisp = [
			'motivo' => 'Domanda',
			'descrizione' => $domanda,
			'sino' => null
		];
		$esito[] = $rigarisp;	

		$rigarisp = [
			'motivo' => 'Risposta SI',
			'descrizione' => $R1,
			'sino' => null
		];
		$esito[] = $rigarisp;

		$rigarisp = [
			'motivo' => 'Risposta NO',
			'descrizione' => $R2,
			'sino' => null
		];
		$esito[] = $rigarisp;		

	}

	$Mysql="SELECT * FROM paired WHERE IDoggetto1='$idx' OR IDoggetto2='$idx' ";
	$Result=mysqli_query($db, $Mysql);	
	if ( $res=mysqli_fetch_array($Result) ) {

		$paired = $res['Paired'];

		if ($res['IDoggetto1'] == $idx) {
			$idxother=$res['IDoggetto2'];
		} else {
			$idxother=$res['IDoggetto1'];
		}

		$Mysql2="SELECT * FROM oggetti WHERE idoggetto='$idxother' ";
		$Result2=mysqli_query($db, $Mysql2);
		$res2=mysqli_fetch_array($Result2);
		$altrooggetto=$res2['nomeoggetto'];

		$rigarisp = [
			'motivo' => 'Oggetto abbinato',
			'descrizione' => 'Abbinato a "'.$altrooggetto. '" fornisce: "'.$paired .'"',
			'sino' => null
		];
		$esito[] = $rigarisp;	
	}




	$out = [
		'nomeoggetto' => $nomeoggetto,
		'descrizione' => $descrizione,
		'esito' => $esito,
		'esitoSI' => '',
		'esitoNO' => '',
		'domanda' => '',
		'R1' => '',
		'R2' => '',
	];

	header("HTTP/1.1 200 OK");
	$output = json_encode ($out, JSON_UNESCAPED_UNICODE);
    echo $output;


?>