enyo.kind({
	name: "sous.RecipeView",
	kind: "enyo.FittableRows",

	bindings: [
		{from: ".recipe.name", to: ".$.name.value"}
	],

	components: [
		{kind: "onyx.Toolbar", layoutKind: "enyo.FittableColumnsLayout", components:[
			{kind: "onyx.InputDecorator", fit: true, components: [
				{name: "name", placeholder: "Name", kind: "onyx.Input"}
			]}
		]},

		{kind: "enyo.Scroller", fit: true, components:[
			{content: "Here is where the steps would go."}
		]},

		{kind: "onyx.Toolbar", layoutKind: "enyo.FittableColumnsLayout", components:[
			{kind: "onyx.Button", content: "Back", ontap: "goBack"},
			{fit: true},
			{kind: "onyx.Button", content: "Save", classes: "onyx-affirmative", ontap: "save"},
			{kind: "onyx.Button", content: "Delete", classes: "onyx-negative", ontap: "deleteRecipe"}
		]}
	],

	save: function() {
		this.recipe.set({ name: this.$.name.value });
		this.recipe.commit();
	},

	goBack: function() {
		history.back();
	},

	deleteRecipe: function() {
		if(confirm("Delete recipe? It will be lost forever."))
			this.recipe.destroy({commit: true});
	}
});
