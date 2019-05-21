
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

//フォームのテンプレート クリックイベントはコンポーネント側のメソッドに持つ
const form_template =
	'<input type="text" v-model:value="target_name" v-on:click="target_text_click"><br>\n'
	+ '<input type="text" v-model:value="discription" v-on:click="discription_text_click"><br>\n'
	+ '<input type="text" v-model:value="study_category" v-on:click="category_text_click"><br>\n'
	+ 'PW:<input type="password" v-model:value="password">\n'
	+	'<input type="button" value="追記" v-on:click="onclick">\n';

Vue.component("add_form_container", {
	data: function(){
		return{
			//入力フォームの各入力文字列をbindして持つ
			target_name: "対象を入力",
			discription: "内容を記入する",
			study_category: "分類を入力",
			password: ""
		}
	},
	methods:{
		onclick(){
			var POST_data = {};
			POST_data["target"] = this.target_name;
			POST_data["summary"] = this.discription;
			POST_data["category"] = this.study_category;
			POST_data["password"] = this.password;

			$.ajax({
				type: "POST",
				url: "http://localhost/idiom_dict/add_study.php",
				cacha: false,
				data: POST_data
			})
			.done(function(){
				$.getJSON("study_memo.json", function(data){
					study_list_arr = data;
					study_list_control.list = study_list_arr;
				});
			})
			.fail(function(){
				console.log("AJAX失敗");
			});
		},
		target_text_click(){
			this.target_name = "";
		},
		discription_text_click(){
			this.discription = "";
		},
		category_text_click(){
			this.study_category = "";
		}
	},
	template: '<form id="add_study_form">' + form_template + '</form>'
});

var add_study_form_control = new Vue({
	el: "#input_form",
	data: {
		display: false
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

function control_form_disp(){
	if(add_study_form_control.display == false){
		add_study_form_control.display = true;
	}else{
		add_study_form_control.display = false;
	}
}
