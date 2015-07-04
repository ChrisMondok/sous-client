enyo.kind({
	name: "sous.Timer",

	published: {
		startTime: null,
		duration: null,
		title: null,
		description: null
	},

	observers: {
		endTimeChanged: ["duration", "startTime"]
	},

	computed: {
		timeRemaining: ["duration", "startTime"]
	},

	bindings: [
		{name: "timerBinding", from: ".timeRemaining", to: ".content", transform: "formatTimeRemaining"}
	],

	tick: function tick() {
		this.notify('timeRemaining');
	},

	formatTimeRemaining: function(timeRemaining) {
		return sous.formatters.duration(Math.max(0, timeRemaining));
	},

	timeRemaining: function getTimeRemaining() {
		if(!this.startTime)
			return this.duration;

		return (this.startTime.getTime() + this.duration) - new Date();
	},

	showNotification: function() {
		app.showNotification(this.get("title") || "Timer", this.get("description"));
	},

	endTimeChanged: function endTimeChanged() {
		if(this.tickInterval)
			clearInterval(this.tickInterval);
		if(this.notifyTimeout)
			clearTimeout(this.notifyTimeout);

		if(this.startTime && this.duration) {
			this.tickInterval = setInterval(this.tick.bind(this), 1000);
			this.notifyTimeout = setTimeout(this.showNotification.bind(this), this.get("timeRemaining"));
		}
	},

	destroy: function() {
		if(this.tickInterval)
			clearInterval(this.tickInterval);
		if(this.notifyTimeout)
			clearTimeout(this.notifyTimeout);
	}
});

enyo.setPath('sous.formatters.duration', function formatDuration(ms) {
	var hours = Math.floor(ms / hour);
	var minutes = Math.floor( (ms % hour) / minute);
	var seconds = Math.floor( (ms % minute) / second);

	var parts = [minutes, seconds].map(function(n) {
		return n.toString().padLeft(2, "0");
	});

	if(hours)
		parts.unshift(hours);

	return parts.join(":");
});
