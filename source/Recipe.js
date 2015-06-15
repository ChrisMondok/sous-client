enyo.kind({
	name: "sous.Recipe",
	kind: "enyo.Model",
	primaryKey: "_id",
	url: "/api/recipes",
	getUrl: function() {
		var id = this.get(this.primaryKey);
		if(id)
			return [this.url, id].join('/');
		return this.url;
	},
	source: "ajax"
});
