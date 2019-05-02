
//表示内容のリストファイルの配列
var dictionary_arr = [];
var study_list_arr = [];

//表の項目行の部分 jsonのオブジェクトで持つ
const idiom_column_title = {
	word: "英単語",
	mean: "意味"
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

const category_item = {
	0: "内部操作",	//0から
	1: "外部操作",
	2: "データべース",
	3: "取得",
	4: "計算",
	5: "データ出し入れ",
	6: "権限",
	7: "状態変化",
	8: "処理する",
	9: "確認",
	10: "比較",
	11: "認証",
	12: "通信",
	13: "その他"
};

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
				mean: ""
			}
		],
		items: category_item,
		select_category: ""
	},
	computed: {
		filter_items: function(){
			if(this.select_category != ""){
				return this.words.filter(function(item){
					if(idiom_list_control.select_category == item.category){
						return item;
					}
				});
			}else{
				return this.words;
			}
		}
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
		],
		filter_word: ""
	},
	computed: {
		filter_study_item: function(){
			if(this.filter_word != ""){
				return this.list.filter(function(list_item){
					if(list_item.target.toLowerCase().indexOf(study_list_control.filter_word.toLowerCase() ) > -1){
						return list_item;
					}
				});
			}else{
				return this.list;
			}
		}
	}
});

//イディオム側タブのチェックボックスの制御インスタンス
var idiom_chkbox_control = new Vue({
	el: "#tab1",
	data: {
		checked: true,
	},
	methods: {
		idiom_display(){
			study_list_control.display = disp_mode.false;
			idiom_list_control.display = disp_mode.true;
			tab1_label_control.tab_style.background = "#AAAAAA";
			tab2_label_control.tab_style.background = "#EEEEEE";
		}
	}
});

//イディオム側のラベルのインスタンス
var tab1_label_control = new Vue({
	el: "#tab1_label",
	data: {
		tab_style: {
			"background": "#AAAAAA",
			"color": "#000000"
		}
	}
});

//勉強側のタブのチェックボックスの制御インスタンス
var study_chkbox_control = new Vue({
	el: "#tab2",
	data: {
		checked: false,
	},
	methods: {
		study_display(){
			study_list_control.display = disp_mode.true;
			idiom_list_control.display = disp_mode.false;
			tab1_label_control.tab_style.background = "#EEEEEE";
			tab2_label_control.tab_style.background = "#AAAAAA";
		}
	}
});

//勉強側のラベルのインスタンス
var tab2_label_control = new Vue({
	el: "#tab2_label",
	data: {
		tab_style: {
			"background": "#EEEEEE",
			"color": "#000000"
		}
	}
});

//読み込みが終わってから要素を指定する
document.addEventListener("DOMContentLoaded", function(event){

	$.getJSON("idiom.json", function(data){
		dictionary_arr = data;
		idiom_list_control.words = dictionary_arr;
	});

	$.getJSON("study_memo.json", function(data){
		study_list_arr = data;
		study_list_control.list = study_list_arr;
	});

}); //addEventListenerのやつ
