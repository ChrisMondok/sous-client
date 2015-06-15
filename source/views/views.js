/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
	name: "sous.Home",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "Sous"},
		{kind: "enyo.Scroller", components:[
			{content: "Here is some content"}
		]}
	]
});
