const path 	= require('path');
const fs 	= require('fs');

class ApiRequestDependency {
	apply (component, app, callback) {
		component.query = this.query;
		this.component = component
		this.loadQueries(callback);
	}

	loadQueries (callback) {
		let component = this.component;
		let requests = {};
		let requestsDir = path.join(component.dirname, 'requests');

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

	query (req, queryName, done) {
		let query = this.requests[queryName];

		try {
			query = query(req);
		} catch (e) {
			throw 'There is an error in your ' + queryName + ' query';
		}
		done(query);
	}
}

module.exports = new ApiRequestDependency;