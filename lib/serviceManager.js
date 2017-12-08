const helper 	= require('./helper');

manager = {
	addService : function (aunp, services) {
		if (services === undefined) {
			throw 'Given service is undefined';
		}
		if (services.constructor === Array) {
			for (let key in services) {
				manager.addService(aunp, services[key]);
			}
		} else {
			aunp.services[services.name] = services;
		}
	},
	getServicesObject : function (source) {
		let services = [];
		let directories;

		try {
			directories = helper.readDirDir(source);
		} catch (e) {
			return [];
		}
		for (var i = 0; i < directories.length; i++) {
			let serviceName = directories[i].split('/').reverse()[0];

			services.push(require(directories[i]));
		}
		return services;
	},
	getServices : function (source) {
		let directories 	= helper.readDirDir(source);
		let services 		= {};

		for (var i = 0; i < directories.length; i++) {
			let serviceName = directories[i].split('/').reverse()[0];

			services[serviceName] 				= require(directories[i]);
			services[serviceName].serviceName 	= serviceName;
			if (i === directories.length - 1) {
				return services;
			}
		}
	}
}

module.exports = manager;