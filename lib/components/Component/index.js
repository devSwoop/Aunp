var express = require('express');

class AunpComponent {
	constructor (dirname = __dirname) {
		this.dirname 		= dirname;
		this.rootUrl 		= '/';
		this.router 		= express.Router();
		this.data 			= {};
		this.services 		= [];
		this.events			= {
			created : [],
			mounted : []
		};
		this.name 			= this.dirname.split('/').reverse()[0];;
	}

	get aunp () {
		return require('../../../');
	}

	get waterfall () {
		return ['getServices', 'applyServices', 'created', 'setRoutes', 'applyRoutes', 'mounted'];
	}

	getServices (app, next) {
		let result = [];

		for (let key in this.services) {
			let service = this.aunp.services[this.services[key]];

			if (service === undefined) {
				throw 'Unknown ' + this.services[key] + ' service';
			}
			result.push(service);
		}
		this.services = result;
		next();
	}

	applyServices (app, next) {
		for (let key in this.services) {
			this.services[key].apply(this, this.app, () => {});
		}
		next();
	}

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

	created (app, next) {
		next();
	}

	mounted (app, next) {
		next();
	}

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

	setRoutes (app, next) {
		next();
	}

	applyRoutes (app, next) {
		app.use(this.router);
		next();
	}

	sendData (data, req, res) {
		res.send(data);
	}
}

module.exports = new AunpComponent;