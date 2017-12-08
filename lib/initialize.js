const path 				= require('path');
const componentManager 	= require('./componentManager');
const serviceManager 	= require('./serviceManager');
const config 			= require('../config/aunp.js');

module.exports = {
	initAunp : function (aunp, app, directory) {
		let appConfig = require(path.join(directory, 'config', 'aunp.js'));

		aunp.app 			= app;
		aunp.appDir 		= directory;
		aunp.config 		= Object.assign(config, appConfig);
		aunp.services 		= {};
		aunp.components 	= {};
	},
	loadServices : function (aunp) {
		let services = [];

		services 			= serviceManager.getServicesObject(path.join(__dirname, 'services'));
		aunp.servicesDir	= path.join(aunp.appDir, aunp.config.servicesDirectory);
		services 			= services.concat(serviceManager.getServicesObject(aunp.servicesDir));
		aunp.add.service(services);
	},
	loadComponents : function (aunp) {
		let nativeComponentsList = [];
		let componentsList;

		aunp.componentsDir 					= path.join(aunp.appDir, aunp.config.componentsDirectory);
		nativeComponentsList 				= componentManager.getComponentsObject(path.join(__dirname, 'components'));
		aunp.add.component(nativeComponentsList);
		aunp.components.Component.aunp 		= aunp;
		componentsList 						= componentManager.getComponentsObject(path.join(aunp.appDir, aunp.config.componentsDirectory));
		aunp.add.component(componentsList);
	}
}