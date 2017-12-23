const path 	= require('path');
const fs 	= require('fs');

/**
 * Aunp service to make API request with PostgreSQL database
 */
class PostgreApiQueryService {
	/**
	 * @param  {Object} 	component 	Component to apply the service on
	 * @param  {Object} 	app 		Express app
	 * @param  {Function}	callback 	Callback
	 */
	apply (component, app, callback) {
		component.query = this.query;
		this.component 	= component
		this.loadQueries(callback);
	}

	/**
	 * Mandatory method
	 */
	get name () {
		return 'PGApiQuery';
	}

	/**
	 * Load queries which are in postgreQueries/ directory of the component
	 * @param  {Function} 	callback
	 */
	loadQueries (callback) {
		let component = this.component;
		let requests = {};
		let requestsDir = path.join(component.dirname, 'postgreQueries');

		fs.readdir(requestsDir, function (err, files) {
			for (let key in files) {
				let file 		= files[key];
				let requestName = file.split('.')[0];
				let requestFile	= path.join(requestsDir, file);
				let request 	= fs.readFileSync(requestFile, 'utf8');
				let templatted	= 'return ""' + component.aunp.stringTemplatter.template(request);
				let requestFunc	= new Function ('data', templatted);

				requests[requestName] = requestFunc;
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
		let query = this.requests[queryName];
		let result;

		if (!query) {
			throw 'Postgre query "' + queryName + '" does not exist';
		}
		try {
			query = query(req);
		} catch (e) {
			throw 'Cannot execute "' + queryName + '" postgre query';
		}
		result = query;
		done(result);
	}
}

module.exports = new PostgreApiQueryService;