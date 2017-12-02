var express = require('express');

class AunpComponent {
	constructor (rootUrl) {
		this.rootUrl 		= rootUrl || '/';
		this.router 		= express.Router();
		this.data 			= {};
		this.dependencies 	= [];
	}

	get aunp () {
		return require('../../../');
	}

	get waterfall () {
		return ['created', 'getDependencies', 'applyDependencies', 'setRoutes', 'applyRoutes', 'mounted'];
	}

	getDependencies (app, next) {
		let result = [];

		for (let key in this.dependencies) {
			let dependency = this.aunp.dependencies[this.dependencies[key]];

			if (dependency === undefined) {
				throw 'Unknow ' + this.dependencies[key] + ' dependency';
			}
			result.push(dependency);
		}
		this.dependencies = result;
		next();
	}

	applyDependencies (app, next) {
		for (let key in this.dependencies) {
			this.dependencies[key].apply(this, this.app, () => {});
		}
		next();
	}

	addDependency (list) {
		if (list.constructor === Array) {
			for (let key in list) {
				let item = list[key];

				this.dependencies.push(item);
			}
		} else {
			this.dependencies.push(list);
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
		this.router.get('/', function(req, res) {
			res.send('Hello from component');
		});
		next();
	}

	applyRoutes (app, next) {
		app.use(this.router);
		next();
	}

	sendData (req, res) {
		res.send(this.data);
	}
}

module.exports = AunpComponent;