enyo.kind({
	name: "sous.CookBookView",
	kind: "enyo.FittableRows",

	published: {
		cookbook: null
	},

	bindings: [
		{from: ".cookbook", to: ".$.list.collection"}
	],

	components:[
		{kind: "onyx.Toolbar", content: "Cook book"},
		{name: "list", kind: "enyo.DataList", fit: true, components: [
			{
				kind: "onyx.Item",
				ontap: "recipeTapped",
				bindings: [
					{from: ".model.name", to: ".content"}
				]
			}
		]},
		{kind: "onyx.Toolbar", components:[
			{fit: true},
			{kind: "onyx.Button", content: "New Recipe", ontap: "createRecipeTapped"}
		]}
	],

	recipeTapped: function(item, tapEvent) {
		window.location.hash = "recipes/"+item.model.get('_id');
	},

	createRecipeTapped: function() {
		window.location.hash = "recipes";
	},

	create: function() {
		this.inherited(arguments);

		this.cookbook = new sous.CookBook();

		this.cookbook.fetch();
	}
});
