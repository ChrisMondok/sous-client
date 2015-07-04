enyo.kind({
	name: "sous.DurationInput",
	kind: "onyx.Input",

	published:{
		duration: null
	},

	bindings: [
		{from: ".value", to: ".duration", transform: "transformDuration", oneWay: false}
	],

	transformDuration: function(value, direction, binding) {
		switch(direction) { //the docs say "source" and "target", but that's not what I'm seeing.
			case 1:
				return this.parseDuration(value, binding);
			case 2:
				return this.formatDuration(value, binding);
			default:
				throw new Error("Unrecognized transform direction "+direction);
		}
	},

	validChanged: function(was, valid) {
		this.addRemoveClass("invalid", !valid);
	},

	parseDuration: function(value, binding) {
		var self = this;
		var parts = value.toString().split(':');

		if(parts.any(function(p) {return p.length == 0}))
			return nope();

		if(parts.length > 3)
			return nope();

		var seconds = Number(parts.pop() || 0);
		var minutes = Number(parts.pop() || 0);
		var hours = Number(parts.pop() || 0);

		if([seconds, minutes, hours].any(function(n) {return isNaN(n);}))
			return nope();

		if(Math.max(seconds, minutes) >= 60)
			return nope();

		if(Math.min(seconds, minutes, hours) < 0)
			return nope();

		minutes += 60 * hours;
		seconds += 60 * minutes;

		return yep(1000 * seconds);

		function yep(value) {
			self.set("valid", true);
			return value;
		}

		function nope() {
			self.set("valid", false);
			binding.stop();
			return null;
		}
	},

	formatDuration: function(value, binding) {
		return sous.formatters.duration(value);
	}
});
