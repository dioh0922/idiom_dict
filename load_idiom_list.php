<?php

require "database_connect.php";

mb_language("ja");
mb_internal_encoding("UTF-8");

header('Access-Control-Allow-Origin: *');

$query_result = db_connect("SELECT word, mean, category FROM idiom_dict");
$result = ["result" => 0, "list" => []];
if($query_result){
	try{
		$tmp_list = [];
		while($row = $query_result->fetch_assoc()){
			$tmp = array("word" => $row["word"], "mean" => $row["mean"], "category" => $row["category"]);
			$tmp_list[] = $tmp;
		}
		$result["result"] = 1;
		$result["list"] = $tmp_list;
	}catch(Exception $e){
		$result["result"] = -1;
		$result["message"] = $e->getMessage();
	}
}else{
	$result["result"] = -1;
	$result["message"] = "ユーザ情報が取得できませんでした\n";
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>
