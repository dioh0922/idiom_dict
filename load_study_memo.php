<?php

require "database_connect.php";

mb_language("ja");
mb_internal_encoding("UTF-8");

header('Access-Control-Allow-Origin: *');

$query_result = db_connect("SELECT target, summary, category FROM study_memo");
$result = [];
if($query_result){
	while($row = $query_result->fetch_assoc()){
		$tmp = array("target" => $row["target"], "summary" => $row["summary"], "category" => $row["category"]);
		$result[] = $tmp;
	}
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
	exit();
}else{
	echo "ユーザ情報が取得できませんでした\n";
	exit();
}

?>
