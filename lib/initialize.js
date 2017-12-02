const path 				= require('path');
const componentManager 	= require('./componentManager');
const config 			= require('../config/aunp.js');

module.exports = {
	initAunp : function (aunp, app, directory) {
		let appConfig = require(path.join(directory, 'config', 'aunp.js'));

		aunp.app 	= app;
		aunp.appDir = directory;
		aunp.config = Object.assign(config, appConfig);
	},
	loadComponents : function (aunp) {
		aunp.componentsDir 		= path.join(aunp.appDir, 'components');
		aunp.nativeComponents 	= componentManager.getNativeComponents();
		aunp.components 		= componentManager.getComponents(path.join(aunp.appDir, aunp.config.appDirectory));
		componentManager.applyComponents(aunp.app, aunp.components);
	}
}