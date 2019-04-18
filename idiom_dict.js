
//イディオムのリストファイルの配列
var dictionary_arr = [];

//表の項目行の部分 jsonのオブジェクトで持つ
const column_title = {
	word: "英単語",
	mean: "意味",
	category: "分類"
}

var test_func = new Vue({
	el: "#idiom_dictionary",
	data: {
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

//読み込みが終わってから要素を指定する
document.addEventListener("DOMContentLoaded", function(event){

	//表示内容をjsonから読み込んでおく
	$.getJSON("idiom.json", function(data){
		dictionary_arr = data;

		//読み込んだ用語を指定して表示させる
		test_func.words = dictionary_arr;

	});
}); //addEventListenerのやつ
