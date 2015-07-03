enyo.kind({
	name: "sous.Recipe",
	kind: "enyo.RelationalModel",
	primaryKey: "_id",
	url: "/api/recipes",

	getUrl: function() {
		var id = this.get(this.primaryKey);
		if(id)
			return [this.url, id].join('/');
		return this.url;
	},
	source: "ajax",

	relations: [
		{
			key: "steps",
			type: "toMany",
			model: "sous.Step",
			isOwner: true, create: true, parse: true
		}
	]
});

enyo.kind({
	name: "sous.Step",
	kind: "enyo.RelationalModel"
});
