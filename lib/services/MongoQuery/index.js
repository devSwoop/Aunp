const path 	= require('path');
const fs 	= require('fs');

/**
 * Aunp service to make API request with PostgreSQL database
 */
class MongoQueryService {
	/**
	 * @param  {Object} 	component 	Component to apply the service on
	 * @param  {Object} 	app 		Express app
	 * @param  {Function}	callback 	Callback
	 */
	apply (component, app, callback) {
		this.component = component;
		component.query = this.query;
		this.loadQueries(callback);
	}

	/**
	 * Mandatory method
	 */
	get name () {
		return 'MongoQuery';
	}

	/**
	 * Load queries which are in mongoQueries/ directory of the component
	 * @param  {Function} 	callback
	 */
	loadQueries (callback) {
		let component = this.component;
		let requests = {};
		let requestsDir = path.join(component.dirname, 'mongoQueries');

		fs.readdir(requestsDir, function (err, files) {
			for (let key in files) {
				let file 		= files[key];
				let requestName = file.split('.')[0];
				let requestFile	= path.join(requestsDir, file);
				let query 		= require(requestFile);

				requests[requestName] = query;
			}
			component.requests = requests;
			callback();
		});
	}

	/**
	 * @param  {Object} 	req 		Express req
	 * @param  {String} 	queryName 	Name of the query to execute
	 * @param  {Function} 	done 		Callback with query result
	 */
	query (req, queryName, done) {
		let db = this.aunp.mongo;

		this.requests[queryName](db, req, (result) => {
			result.toArray(function(err, result) {
				done(result);
			});
		});
	}
}

module.exports = new MongoQueryService;