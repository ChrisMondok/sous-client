var second = 1000;
var minute = second * 60;
var hour = minute * 60;

enyo.kind({
	name: "sous.StepView",
	kind: "onyx.Item",
	layoutKind: "FittableColumnsLayout",

	published:{
		step: null,
		done: false
	},

	bindings: [
		{from: ".step.description", to: ".$.description.content"},
		{from: ".done", to: ".$.checkbox.checked", oneWay: false},
		{from: ".step.cookTime", to: ".$.timer.duration"},
		{from: ".step.description", to: ".$.timer.title"}
	],

	components:[
		{name: "checkbox", kind: "onyx.Checkbox"},
		{name: "description", fit: true},
		{kind: "sous.Timer", name: "timer"},
		{name: "startButton", kind: "onyx.Button", content: "Start", ontap: "start"}
	],

	start: function() {
		this.$.timer.set("startTime", new Date());
	}
});
