
//表示内容のリストファイルの配列
var dictionary_arr = [];
var study_list_arr = [];

//表の項目行の部分 jsonのオブジェクトで持つ
const idiom_column_title = {
	word: "英単語",
	mean: "意味",
	category: "分類"
}

//勉強内容メモの項目行
const study_column_title = {
	target: "勉強対象",
	summary: "内容まとめ",
	category: "分類"
}

//表示可否の制御定数
const disp_mode = {
	true: 1,
	false: 0
}


//Vueインスタンス群
//イディオムの表示制御インスタンス
var idiom_list_control = new Vue({
	el: "#idiom_dictionary",
	data: {
		display: disp_mode.true,
		columns: idiom_column_title,
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
		display: disp_mode.false,
		columns: study_column_title,
		list:[
			{
				target: "",
				summary: "",
				category: ""
			}
		]
	}
});

//表示切替のタブ用のインスタンス
var select_list_mode = new Vue({
	el: "#select_tab",
	data: {
		//v-modelはinputのvalueを持つ
		selected_mode: ""
	},
	methods: {
		onChange(){
			console.log("onChange");
		}
	}
});

//読み込みが終わってから要素を指定する
document.addEventListener("DOMContentLoaded", function(event){

	//表示内容をjsonから読み込んでおく
	$.getJSON("idiom.json", function(data){
		dictionary_arr = data;

		//読み込んだ用語を指定して表示させる
		idiom_list_control.words = dictionary_arr;

		idiom_list_control.display = 0;
		study_list_control.display = 1;

	});

	$.getJSON("study_memo.json", function(data){
		study_list_arr = data;
		study_list_control.list = study_list_arr;
	});

}); //addEventListenerのやつ
