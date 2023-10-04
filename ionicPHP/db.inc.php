<? 
$par_DbHost = '62.149.150.60' ;
// $par_DbHost = 'localhost' ;
$par_DbUser = 'Sql153576';
// $par_DbUser = 'rbn2user';
$par_DbPassword = 'lQVCp2oI' ;
// $par_DbPassword = 'rbn2passwd' ;
$par_DbName = 'Sql153576_1' ;
// $par_DbName = 'rbn2' ;

$db = mysql_connect($par_DbHost,$par_DbUser,$par_DbPassword) or die();
mysql_set_charset('utf8',$db);
$dbselect=mysql_select_db($par_DbName);

if(!$dbselect) {
		mysql_close($db);
		die();
}
?>