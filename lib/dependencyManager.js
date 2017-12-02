const helper = require('./helper');
const path = require('path');

module.exports = {
	getDependencies : function () {
		let source = path.join(__dirname, 'dependencies');
		const directories = helper.readDirDir(source);
		let dependencies = {};

		for (var i = 0; i < directories.length; i++) {
			let dependencyName = directories[i].split('/').reverse()[0];

			dependencies[dependencyName] 				= require(directories[i]);
			dependencies[dependencyName].dependencyName = dependencyName;
			if (i === directories.length - 1) {
				return dependencies;
			}
		}
	}
}