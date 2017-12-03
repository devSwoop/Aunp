class Event {
	apply (component, app, callback) {
		component.$emit = this.$emit;
		component.$on 	= this.$on;
	}

	$emit (event, opts, callback) {
		if (Object.keys(arguments).length === 1) {
			callback = () => {};
		} else if (Object.keys(arguments).length === 2) {
			if (opts.constructor === Function) {
				callback = opts;
				opts = undefined;
			}
		}
		for (let key in this.events[event]) {
			let action = this.events[event][key];

			if (opts === undefined) {
				action(callback);
			} else {
				action(opts, callback);
			}
		}
	}

	$on (event, callback) {
		if (this.events[event] === undefined) {
			this.events[event] = [];
		}
		this.events[event].push(callback);
	}
}

module.exports = new Event;