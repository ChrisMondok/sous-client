enyo.kind({
	name: "sous.CookBook",
	kind: "enyo.Collection",
	source: "ajax",
	model: "sous.Recipe",
	url: "/api/recipes"
});
