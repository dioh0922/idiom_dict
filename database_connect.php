<?php

function db_connect($query){
	mb_language("ja");
	mb_internal_encoding("UTF-8");

	//設定ファイルを別階層の定数にする
	require(dirname(__FILE__)."/../env/connection_setting.php");

	$mysqli = new mysqli($SQL_HOST, $SQL_USER, $SQL_PASS, $SQL_DB);
	if($mysqli->connect_error){
		print $mysqli->connect_error;
		exit();
	}else{
		$mysqli->set_charset("utf8");
	}

	$query_result = $mysqli->query($query);

	$close_result = $mysqli->close();
	if($close_result){
		//print "closeした";
	}else{
		print $mysqli->connect_error;
	}

	return $query_result;
}

?>
