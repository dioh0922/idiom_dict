<?php

require "database_connect.php";

mb_language("ja");
mb_internal_encoding("UTF-8");

header('Access-Control-Allow-Origin: *');

$query_result = db_connect("SELECT target, summary, category FROM study_memo");
$result = ["result" => 0, "list" => []];
if($query_result){
	try{
		$tmp_list = [];
		while($row = $query_result->fetch_assoc()){
			$tmp = array("target" => $row["target"], "summary" => $row["summary"], "category" => $row["category"]);
			$tmp_list[] = $tmp;
		}
		$result["result"] = 1;
		$result["list"] = $tmp_list;
	}catch(Exveption $e){
		$result["result"] = -1;
		$result["message"] = $e->getMessage();
	}
}else{
	$result["result"] = -1;
	$result["message"] = "ユーザ情報が取得できませんでした\n";
}
echo json_encode($result, JSON_UNESCAPED_UNICODE);

?>
