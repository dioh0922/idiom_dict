<?php

require "database_connect.php";

mb_language("ja");
mb_internal_encoding("UTF-8");

header('Access-Control-Allow-Origin: *');

$query_result = db_connect("SELECT word, mean, category FROM idiom_dict");
$result = [];
if($query_result){
	while($row = $query_result->fetch_assoc()){
		$tmp = array("word" => $row["word"], "mean" => $row["mean"], "category" => $row["category"]);
		$result[] = $tmp;
	}
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
	exit();
}else{
	echo "ユーザ情報が取得できませんでした\n";
	exit();
}

?>
