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


	$id =  isset($_GET['id']) ? $_GET['id'] :"";
	

	require_once __DIR__ . '/db2.inc.php';  // NEW MYSQL //

 	$out = [];
	
	
	if ($id != '') {

		$mysql="SELECT * from personaggio WHERE idutente = $id";
		$result=mysqli_query($db,$mysql);
		$res = mysqli_fetch_array($result,MYSQLI_ASSOC);
	
		$forza = $res['forza'];
		$destrezza = $res['destrezza'];
		$attutimento = $res['attutimento'];
		$carisma = $res['carisma'];
		$persuasione = $res['persuasione'];
		$saggezza = $res['saggezza'];
		$percezione = $res['percezione'];
		$intelligenza = $res['intelligenza'];
		$prontezza = $res['prontezza'];
		


		$bonus = [];
		$mysql="SELECT * FROM `focusattr` WHERE focusattr.livelloattr <= $forza AND nomeattr = 'forza'";
		$result=mysqli_query($db,$mysql);
		while ( $res = mysqli_fetch_array($result,MYSQLI_ASSOC)   ) {
			$bonus [] =$res;
		}
		$out[] = [
			'attr'=> 'Forza',
			'bonus'=> $bonus	
		];

		$bonus = [];
		$mysql="SELECT * FROM `focusattr` WHERE focusattr.livelloattr <= $destrezza AND nomeattr = 'destrezza'";
		$result=mysqli_query($db,$mysql);
		while ( $res = mysqli_fetch_array($result,MYSQLI_ASSOC)   ) {
			$bonus [] =$res;
		}
		$out[] = [
			'attr'=> 'Destrezza',
			'bonus'=> $bonus	
		];

		$bonus = [];
		$mysql="SELECT * FROM `focusattr` WHERE focusattr.livelloattr <= $attutimento AND nomeattr = 'attutimento'";
		$result=mysqli_query($db,$mysql);
		while ( $res = mysqli_fetch_array($result,MYSQLI_ASSOC)   ) {
			$bonus [] =$res;
		}
		$out[] = [
			'attr'=> 'Attutimento',
			'bonus'=> $bonus	
		];

		$bonus = [];
		$mysql="SELECT * FROM `focusattr` WHERE focusattr.livelloattr <= $carisma AND nomeattr = 'carisma'";
		$result=mysqli_query($db,$mysql);
		while ( $res = mysqli_fetch_array($result,MYSQLI_ASSOC)   ) {
			$bonus [] =$res;
		}
		$out[] = [
			'attr'=> 'Carisma',
			'bonus'=> $bonus	
		];

		$bonus = [];
		$mysql="SELECT * FROM `focusattr` WHERE focusattr.livelloattr <= $persuasione AND nomeattr = 'persuasione'";
		$result=mysqli_query($db,$mysql);
		while ( $res = mysqli_fetch_array($result,MYSQLI_ASSOC)   ) {
			$bonus [] =$res;
		}
		$out[] = [
			'attr'=> 'Persuasione',
			'bonus'=> $bonus	
		];


		$bonus = [];
		$mysql="SELECT * FROM `focusattr` WHERE focusattr.livelloattr <= $saggezza AND nomeattr = 'saggezza'";
		$result=mysqli_query($db,$mysql);
		while ( $res = mysqli_fetch_array($result,MYSQLI_ASSOC)   ) {
			$bonus [] =$res;
		}
		$out[] = [
			'attr'=> 'Saggezza',
			'bonus'=> $bonus	
		];

		$bonus = [];
		$mysql="SELECT * FROM `focusattr` WHERE focusattr.livelloattr <= $percezione AND nomeattr = 'percezione'";
		$result=mysqli_query($db,$mysql);
		while ( $res = mysqli_fetch_array($result,MYSQLI_ASSOC)   ) {
			$bonus [] =$res;
		}
		$out[] = [
			'attr'=> 'Percezione',
			'bonus'=> $bonus	
		];

		$bonus = [];
		$mysql="SELECT * FROM `focusattr` WHERE focusattr.livelloattr <= $intelligenza AND nomeattr = 'intelligenza'";
		$result=mysqli_query($db,$mysql);
		while ( $res = mysqli_fetch_array($result,MYSQLI_ASSOC)   ) {
			$bonus [] =$res;
		}
		$out[] = [
			'attr'=> 'Intelligenza',
			'bonus'=> $bonus	
		];

		$bonus = [];
		$mysql="SELECT * FROM `focusattr` WHERE focusattr.livelloattr <= $prontezza AND nomeattr = 'prontezza'";
		$result=mysqli_query($db,$mysql);
		while ( $res = mysqli_fetch_array($result,MYSQLI_ASSOC)   ) {
			$bonus [] =$res;
		}
		$out[] = [
			'attr'=> 'Prontezza',
			'bonus'=> $bonus	
		];

	}
	$output = json_encode ($out, JSON_UNESCAPED_UNICODE);

	echo $output;
	

?>
