var second = 1000;
var minute = second * 60;
var hour = minute * 60;

enyo.kind({
	name: "sous.StepView",
	kind: "onyx.Item",

	published:{
		step: null,
		done: false,
		editing: false
	},

	bindings: [
		{from: ".step.description", to: ".$.description.content"},
		{from: ".step.description", to: ".$.descriptionInput.value", oneWay: false},
		{from: ".done", to: ".$.checkbox.checked", oneWay: false},

		{from: ".step.cookTime", to: ".$.timer.duration"},
		{from: ".step.cookTime", to: ".$.cookTimeInput.duration", oneWay: false},

		{from: ".step.description", to: ".$.timer.title"},

		{from: ".editing", to: ".$.editDrawer.open"},
		{from: ".editing", to: ".$.descriptionInputDecorator.showing"},
		{from: ".editing", to: ".$.description.showing", kind: "enyo.InvertBooleanBinding"},

		{from: ".$.timer.startTime", to: ".$.startButton.showing", kind: "enyo.InvertBooleanBinding"},
		{from: ".$.timer.startTime", to: ".$.resetButton.showing", kind: "enyo.BooleanBinding"}
	],

	components:[
		{kind: "FittableColumns", classes:"align-middle", components:[
			{name: "checkbox", kind: "onyx.Checkbox"},
			{name: "description", onhold: "startEditing", fit: true},
			{name: "descriptionInputDecorator", kind: "onyx.InputDecorator", layoutKind: "FittableColumnsLayout", fit: true, components:[
				{name: "descriptionInput", kind: "onyx.Input", fit: true}
			]},
			{kind: "sous.Timer", name: "timer"},
			{name: "startButton", kind: "onyx.Button", content: "Start", ontap: "start"},
			{name: "resetButton", kind: "onyx.Button", content: "Reset", ontap: "resetTimer"}
		]},
		{name: "editDrawer", kind: "enyo.Drawer", components:[
			{kind: "onyx.InputDecorator", components:[
				{name: "cookTimeInput", kind: "sous.DurationInput"}
			]},
			{kind: "onyx.Button", content: "Done", classes:"onyx-blue", ontap: "doneEditing"}
		]}
	],

	start: function() {
		this.$.timer.set("startTime", new Date());
	},

	resetTimer: function() {
		this.$.timer.set("startTime", null);
	},

	startEditing: function() {
		this.set("editing", true);
	},

	doneEditing: function() {
		this.set("editing", false);
	}
});
