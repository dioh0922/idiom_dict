<?php

require "database_connect.php";

mb_language("ja");
mb_internal_encoding("UTF-8");

header('Access-Control-Allow-Origin: *');

$query = "SELECT * FROM login WHERE userID = 'addition';";
$str = "";
$result = ["result" => 0, "message" => ""];

$query_result = db_connect($query);
if($query_result){
	$row = $query_result->fetch_assoc();
	$add_obj["target"] = $_POST["target"];
	$add_obj["summary"] = $_POST["summary"];
	$add_obj["category"] = $_POST["category"];

	if( password_verify($_POST["password"], $row["pass"]) ){
		$ins_query = sprintf(
			"INSERT INTO study_memo (target, summary, category)VALUES('%s', '%s', '%s')",
			$add_obj["target"],
			$add_obj["summary"],
			$add_obj["category"]
		);
		$ins_result = db_connect($ins_query);
		$result["result"] = 1;
		$result["message"] = $ins_result;
	}else{
		$result["result"] = -1;
		$result["message"] = "パスワードが間違っています";
	}
}else{
	$result["result"] = -1;
	$result["message"] = "ユーザ情報が取得できませんでした";
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);

?>
