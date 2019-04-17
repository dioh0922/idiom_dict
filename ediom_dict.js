
var V_test = new Vue({
	el: "#discription",
	data:{
		text: "Vue"
	}
});


//読み込みが終わってから要素を指定する
document.addEventListener("DOMContentLoaded", function(event){

	var test = new Vue({ el: "#components-demo"});

	//v-bindで決めた変数名で表示内容を指定→表示形式に格納
	//test_listでは情報を渡すだけ(表示形式はcomponentに持たせる)
	var test_list = new Vue({
		el: "#todo-list-example",
		data: {
			newTodoText: "",
			todos: [
				{
					id: 1,
					title: "Do the X1",
				},
				{
					id: 2,
					title: "Do the X2",
				}
			],

			nextTodoId: 4
		},
		methods: {
			addNewTodo: function(){
				this.todos.push({
					id: this.nextTodoId++,
					title: this.newTodoText
				})
				this.newTodoText = ""
			}
		}
	});


	var test_func = new Vue({
		el: "#idiom_dictionary",
		data: function (){

			//表の項目行の部分 jsonのオブジェクトで持つ
			var columns = {
				word: "英単語",
				mean: "意味",
				category: "分類"
			}

			return {
				//項目行としてオブジェクトを返す
				columns: columns,

				//内容自体は配列でjsonを要素ごとに持つ
				words: [
					{
						word: "idiom",
						mean: "慣習的な言い回し",
						category: "サンプル"
					},
					{
						word: "sample",
						mean: "例",
						category: "サンプル"
					},
					{
						word: "test",
						mean: "テスト",
						category: "サンプル"
					}
				]
			}
		}
	});
}); //addEventListenerのやつ

Vue.component('button-counter', {
	data: function () {
		return {
			ret: "戻り"
		}
	},

	//HTML要素を返す
	template: "<div>{{ret}}</div>"
});


//v-forのテスト
//コンポーネント側で変数を入れるHTMLを定義しておく(データ側で変数をいれて表示される)
Vue.component("todo-item", {
	template: "<li> {{title}} </li>",
	props: ["title"]
});
