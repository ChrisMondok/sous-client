enyo.kind({
	name: "sous.AuthenticationView",
	kind: "FittableRows",

	bindings: [
		{from: "^sous.Authentication.user", to: ".$.signInButton.showing", kind: "enyo.InvertBooleanBinding"},
		{from: "^sous.Authentication.user", to: ".$.signOutButton.showing", kind: "enyo.BooleanBinding"}
	],

	components:[
		{name: "signInButton", kind: "onyx.Button", classes: "onyx-blue", content: "Sign in / Sign up", ontap: "request"},
		{name: "signOutButton", kind: "onyx.Button", content: "Sign out", ontap: "logout"},
		{name: "user"}
	],

	request: function() {
		sous.Authentication.signIn();
	},

	logout: function() {
		sous.Authentication.signOut();
	}
});

enyo.singleton({
	name: "sous.Authentication",

	published: {
		user: null
	},

	constructor: function() {
		var self = this;
		navigator.id.watch({
			loggedInUser: localStorage.getItem("user"),
			onlogin: function(assertion) {
				new enyo.Ajax({method: 'POST', url: '/api/authenticate', postBody: assertion})
					.response(self.authenticated, self)
					.error(self.authError, self)
					.go();
			},
			onlogout: function() {
				enyo.bind(self, "signOut");
			}
		});

		return this.inherited(arguments);
	},

	signIn: function() {
		navigator.id.request();
	},

	signOut: function() {
		navigator.id.logout();
	},

	userChanged: function(was, user) {
		localStorage.setItem("user", user);
	},

	authenticated: function(ajax, response) {
		this.set("user", response.email);
	},

	signedOut: function() {
		this.set("user", null);
	},

	authError: function(ajax, error, c, d) {
		alert("Sign in failed");
		this.signedOut();
	}
});
