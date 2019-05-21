<?php

function db_connect($query){
	mb_language("ja");
	mb_internal_encoding("UTF-8");

	$url = "localhost";
	$user = "";
	$pass = "";
	$db = "";

	$mysqli = new mysqli($url, $user, $pass, $db);
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
