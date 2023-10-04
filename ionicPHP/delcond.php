<?
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

	include ('db.inc.php');

	$idcondizione=$_GET['idcondizione'];

	$Mysql="DELETE FROM cond_oggetti WHERE idcondizione=$idcondizione ";
	$Result=mysql_query($Mysql);
	if (mysql_errno()) die ( mysql_errno().": ".mysql_error() ."+".$Mysql);




	$newout = [];



	$output = json_encode ($newout, JSON_UNESCAPED_UNICODE);
    echo $output;


?>
