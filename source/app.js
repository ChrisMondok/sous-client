enyo.kind({
	name: "sous.Application",
	kind: "enyo.Application",
	view: null,

	components:[
		{kind: "Router", useHistory: true, triggerOnStart: true, routes:[
			{path: "login", handler: "showLogin", context: "owner", "default": true},
			{path: "cookbook", handler: "showCookbook", context: "owner"},
			{path: "recipes", handler: "newRecipe", context: "owner"},
			{path: "recipes/:id", handler: "showRecipe", context: "owner"}
		]}
	],

	constructor: function() {
		this.inherited(arguments);
		Notification.requestPermission();
	},

	showLogin: function() {
		this.changeView(new sous.AuthenticationView());
	},

	showCookbook: function() {
		this.changeView(new sous.CookBookView());
	},

	newRecipe: function() {
		this.changeView(new sous.RecipeView({recipe: new sous.Recipe()}));
	},

	showRecipe: function(id) {
		this.changeView(new sous.RecipeView({
			recipe: new sous.Recipe({_id: id}, {options: {fetch: !!id}})
		}));
	},

	changeView: function(newView) {
		if(this.view)
			this.view.destroy();
		this.set('view', newView);
		this.render();
	},

	showNotification: function(title, body) {
		return new Notification(title, {body: body || ""});
	}
});

enyo.kind({
	name: "sous.Source",
	kind: "enyo.AjaxSource",
	commit: function(model, opts) {
		opts.method = model.get(model.primaryKey) ? "PUT" : "POST";
		opts.url = this.buildUrl(model, opts);
		opts.postBody = model.toJSON();
		this.go(opts);
	}
});

enyo.ready(function () {
	enyo.Source.create({name: "ajax", kind: "sous.Source"});

	new sous.Application({name: "app"});
});
