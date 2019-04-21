
//イディオムのリストファイルの配列
var dictionary_arr = [];

//表の項目行の部分 jsonのオブジェクトで持つ
const column_title = {
	word: "英単語",
	mean: "意味",
	category: "分類"
}

//イディオムの表示制御インスタンス
var idiom_list_control = new Vue({
	el: "#idiom_dictionary",
	data: {
		display: true,
		columns: column_title,
		words: [
			{
				word: "",
				mean: "",
				category: ""
			}
		]
	}
});

//勉強内容メモの表示制御インスタンス
var study_list_control = new Vue({
	el: "#study_list",
	data:{
		display: false,
	}
});


//読み込みが終わってから要素を指定する
document.addEventListener("DOMContentLoaded", function(event){

	//表示内容をjsonから読み込んでおく
	$.getJSON("idiom.json", function(data){
		dictionary_arr = data;

		//読み込んだ用語を指定して表示させる
		idiom_list_control.words = dictionary_arr;

	});
}); //addEventListenerのやつ
