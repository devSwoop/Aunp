const path 				= require('path');
const componentManager 	= require('./componentManager');
const serviceManager 	= require('./serviceManager');
const config 			= require('../config/aunp.js');

module.exports = {
	/**
	 * Initialize Aunp
	 * @param  {Object} 	aunp 		Aunp instance
	 * @param  {Object}		app 		Express app
	 * @param  {String} 	directory 	App directory
	 */
	initAunp : function (aunp, app, directory) {
		let appConfig = require(path.join(directory, 'config', 'aunp.js'));

		aunp.app 				= app;
		aunp.appDir 			= directory;
		aunp.config 			= Object.assign(config, appConfig);
		aunp.services 			= {};
		aunp.components 		= {};
		aunp.appliedComponents 	= {};
	},
	/**
	 * Load services which are in services app directory
	 * @param  {Object} 	aunp 	Aunp instance
	 */
	loadServices : function (aunp) {
		let services = [];

		// Add native services
		services 			= serviceManager.getServicesObject(path.join(__dirname, 'services'));
		// Services app directory
		aunp.servicesDir	= path.join(aunp.appDir, aunp.config.servicesDirectory);
		// Concat services defined in services/ in the app
		services 			= services.concat(serviceManager.getServicesObject(aunp.servicesDir));
		// Add all services
		aunp.add.service(services);
	},
	/**
	 * Load components which are in components app directory
	 * @param  {Object} 	aunp 	Aunp instance
	 */
	loadComponents : function (aunp) {
		let nativeComponentsList = [];
		let componentsList;

		// App components directory
		aunp.componentsDir 					= path.join(aunp.appDir, aunp.config.componentsDirectory);
		// Get native components
		nativeComponentsList 				= componentManager.getComponentsObject(path.join(__dirname, 'components'));
		// Add them
		aunp.add.component(nativeComponentsList);
		// Give Aunp instance to components
		aunp.components.AunpComponent.aunp 	= aunp;
		// Get app components
		componentsList 						= componentManager.getComponentsObject(path.join(aunp.appDir, aunp.config.componentsDirectory));
		// And add them
		aunp.add.component(componentsList);
	}
}