const AunpComponent = require('../Component').constructor;

class AunpApiComponent extends AunpComponent {
	constructor (dirname = __dirname) {
		super(dirname);
		this.routes = [];
		this.addService(['Event', 'ApiRequest']);
	}

	createApiRoute (route) {
		let defaultRoute = {
			method 		: 'get',
			route 		: '/',
			description : 'This is an Aunp route',
			before      : (req, res, done) => { done(req); },
			after       : (req, res, done) => { done(); }
		}

		route = Object.assign(defaultRoute, route);
		this.routes.push(route);
		this.router[route.method](route.route, (req, res) => {
			this.$emit('matchedRoute', route);
			route.before(req, res, (req) => {
				this.query(req, route.query, (data) => {
					route.after(req, res, () => {
						this.sendData(data, req, res);
					});
				});
			});
		});
	}
}

module.exports = new AunpApiComponent;