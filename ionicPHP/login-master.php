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
 

	require_once __DIR__ . '/db2.inc.php';  // NEW MYSQL //

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$nome = $request->username;
$password = $request->password;

$nome = mysqli_real_escape_string($db, $nome);
$password = mysqli_real_escape_string($db, $password);

	
// pulizia periodica
$MM="DELETE FROM dadi WHERE DATE_ADD( Ora , INTERVAL 24 HOUR )<NOW()";
mysqli_query($db, $MM);	
//

$MySql = "SELECT idutente FROM utente WHERE nome = '$nome' AND password = '$password' AND admin != 0 ";
$Result = mysqli_query($db, $MySql);
if ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$output = json_encode($res);
	echo $output;
} else {    
header("HTTP/1.1 401 Unauthorized");
//echo "KO";
} 



?>
