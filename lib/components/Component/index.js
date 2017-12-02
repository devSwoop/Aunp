var express = require('express');

class AunpComponent {
	constructor (rootUrl) {
		this.rootUrl = rootUrl || '/';
		this.router = express.Router();
		this.data = {};
	}

	get waterfall () {
		return ['setRoutes', 'applyRoutes'];
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