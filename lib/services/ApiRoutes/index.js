/**
 * API call model
 */
class ApiRoutesService {
	/**
	 * @param  {Object} 	component 	Component to apply the service on
	 * @param  {Object} 	app 		Express app
	 * @param  {Function}	callback 	Callback
	 */
	apply (component, app, callback) {
		this.component 	= component
		this.extendExpressRouter(component);
	}

	/**
	 * Mandatory method
	 */
	get name () {
		return 'ApiRoutes';
	}

	/**
	 * Modify local Express Router get, post, put etc. functions to add a lifecyle (before, query, afer, send)
	 * @param  {Object} 	component 	Component to apply the service on
	 */
	extendExpressRouter (component) {
		for (let key in component.methods) {
			let method 	= component.methods[key];
			let newFunc = (function (opts) {
				var old = component.router[method];

				return function (opts) {
					if (opts && opts.constructor === Object) {
						var before = function (req, res, next) {
							component.emit('matchedRoute');
							opts.before(req, res, next);
						};
						var query = function (req, res, next) {
							component.query(req, opts.query, (data) => {
								if (res.aunpComponentResult === undefined) {
									res.aunpComponentResult = data;
								}
								next();
							});
						};
						var after = function (req, res, next) {
							opts.after(req, res, next);
						};
						var send = function (req, res) {
							component.send(res, res.aunpComponentResult);
						};
						var result = old.apply(this, [opts.route, before, query, after, send]);
					} else {
						var result = old;
					}
					return result;
				}
			})();
			component.router[method] = newFunc;
		}
	}
}

module.exports = new ApiRoutesService;