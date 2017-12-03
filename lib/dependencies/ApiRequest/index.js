const path 	= require('path');
const fs 	= require('fs');

class ApiRequestDependency {
	apply (component, app, callback) {
		let requests = {};
		let requestsDir = path.join(component.dirname, 'requests');
		fs.readdir(requestsDir, function (err, files) {
			for (let key in files) {
				let file 		= files[key];
				let requestName = file.split('.')[0];
				let requestFile	= path.join(requestsDir, file);
				let request 	= fs.readFileSync(requestFile, 'utf8');
				let templatted	= component.aunp.stringTemplatter.template(request);
				let requestFunc	= new Function ('data', templatted);

				console.log(templatted);
			}
		});
	}
}

module.exports = new ApiRequestDependency;