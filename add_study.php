<?php

	$file_name = "study_memo.json";

	if(file_exists($file_name)){
		//読み込む→最後に追記してファイル
		$file_data = file_get_contents($file_name);
		$file_data_arr = json_decode($file_data, true);
		$file_data_arr[] = $_POST;

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
		exit();
	}

?>
