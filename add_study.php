<?php

require "database_connect.php";

mb_language("ja");
mb_internal_encoding("UTF-8");

header('Access-Control-Allow-Origin: *');

$query = "SELECT * FROM login WHERE userID = 'addition';";
$str = "";

$query_result = db_connect($query);
if($query_result){
	$row = $query_result->fetch_assoc();

	if( password_verify($_POST["password"], $row["pass"]) ){
		$file_name = "study_memo.json";

		if(file_exists($file_name)){
			//読み込む→最後に追記してファイル
			$file_data = file_get_contents($file_name);
			$file_data_arr = json_decode($file_data, true);
			$add_obj["target"] = $_POST["target"];
			$add_obj["summary"] = $_POST["summary"];
			$add_obj["category"] = $_POST["category"];

			$file_data_arr[] = $add_obj;

			$length = count($file_data_arr);

			unlink($file_name);

			$out_str = "[\n";
			file_put_contents($file_name, $out_str, FILE_APPEND | JSON_PRETTY_PRINT | LOCK_EX);

			for($iter = 0; $iter < $length - 1; $iter++){
				$out_str = json_encode($file_data_arr[$iter], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
				$out_str .= ",\n";
				file_put_contents($file_name, $out_str, FILE_APPEND | JSON_PRETTY_PRINT | LOCK_EX);
			}
			$out_str = json_encode($file_data_arr[$length - 1], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
			$out_str .= "\n]";
			file_put_contents($file_name, $out_str, FILE_APPEND | JSON_PRETTY_PRINT | LOCK_EX);
		}else{
			print "ファイルが見つかりませんでした";
			exit();
		}

	}else{
		print "パスワードが間違っています";
	}
	exit();
}else{
	echo "ユーザ情報が取得できませんでした\n";
	exit();
}

?>
