var express = require('express');

/**
 * This is the root component for Aunp
 */
class AunpComponent {
	constructor (dirname = __dirname) {
		// Dirname of the component in the app
		this.dirname 		= dirname;
		// Root url of the routes
		this.rootUrl 		= '/';
		// Local router
		this.router 		= express.Router();
		// Data to send
		this.data 			= {};
		// Component services list
		this.services 		= [];
		// Event listeners
		this.events			= {
			created : [],
			mounted : []
		};
		// Component name (folder name)
		this.name 			= this.dirname.split('/').reverse()[0];
		// Express methods
		this.methods 		= ['get', 'post', 'put', 'head', 'delete', 'options', 'trace', 'copy', 'lock', 'mkcol', 'move', 'purge', 'unlock', 'report', 'mkactivity', 'checkout', 'merge', 'm-search', 'notify', 'subscribe', 'unsubscribe', 'patch', 'search'];
	}

	/**
	 * @return {String}	Component name
	 */
	get aunp () {
		return require('../../../');
	}

	/**
	 * @return {Array} Functions list
	 */
	get waterfall () {
		return ['getServices', 'applyServices', 'createdHook', 'setRoutes', 'applyRoutes', 'mounted'];
	}

	/**
	 * @param  {Object}		app 	Express instance
	 * @param  {Function}	next 	Continue waterfall
	 */
	getServices (app, next) {
		let result = [];

		for (let key in this.services) {
			let service = this.aunp.services[this.services[key]];

			if (service === undefined) {
				throw 'Unknown "' + this.services[key] + '" service';
			}
			result.push(service);
		}
		this.services = result;
		next();
	}

	/**
	 * @param  {Object}		app 	Express instance
	 * @param  {Function}	next 	Continue waterfall
	 */
	applyServices (app, next) {
		for (let key in this.services) {
			this.services[key].apply(this, this.app, () => {});
		}
		next();
	}

	/**
	 * @param {Array|Object}	list 	List of services to add, or one service
	 */
	addService (list) {
		if (list.constructor === Array) {
			for (let key in list) {
				let item = list[key];

				this.services.push(item);
			}
		} else {
			this.services.push(list);
		}
	}

	/**
	 * @param  {Object}		app 	Express instance
	 * @param  {Function}	next 	Continue waterfall
	 */
	createdHook (app, next) {
		this.created();
		next();
	}

	/**
	 * Function to execute on createdHook
	 */
	created () {
	}

	/**
	 * Hook
	 */
	mounted (app, next) {
		next();
	}

	/**
	 * @param  {Object} 	app 		Express instance
	 * @param  {Array} 		waterfall 	Functions list
	 * @param  {Integer} 	index 		Index in waterfall
	 */
	execWaterfall (app, waterfall, index) {
		if (index >= waterfall.length) {
			return;
		} else {
			let exec = new Function ('that', 'app', 'waterfall', 'index', `
			that.${waterfall[index]}(app, () => {
				that.execWaterfall(app, waterfall, index + 1);
			});`);
			exec(this, app, waterfall, index);
		}
	}

	/**
	 * Component routes
	 */
	routes () {
	}

	/**
	 * @param  {Object}		app 	Express instance
	 * @param  {Function}	next 	Continue waterfall
	 */
	setRoutes (app, next) {
		this.routes(this.router);
		next();
	}

	/**
	 * @param  {Object}		app 	Express instance
	 * @param  {Function}	next 	Continue waterfall
	 */
	applyRoutes (app, next) {
		app.use(this.router);
		next();
	}

	/**
	 * @param  {Object} 	res 	Express res
	 * @param  {*} 			data 	Data to send
	 */
	send (res, data) {
		res.send(data);
	}
}

module.exports = AunpComponent;