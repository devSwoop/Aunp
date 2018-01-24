const AunpComponent = require('../Component');

/**
 * This is the API component for Aunp
 */
class AunpApiComponent extends AunpComponent {
	constructor (dirname = __dirname) {
		super(dirname);
		// The component just need some services to work
		this.addService(['Event', 'MongoQuery', 'ApiRoutes', 'ResFormatter']);
	}

	send (res, data) {
		this.emit('formatRes', data, function (data) {
			res.send(data);
		});
	}
}

module.exports = AunpApiComponent;