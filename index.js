const express 			= require('express');
const helper 			= require('./lib/helper');
const path 				= require('path');
const init 				= require('./lib/initialize');
const stringTemplatter 	= require('./lib/sqlTemplatting');
const serviceManager 	= require('./lib/serviceManager');
const componentManager 	= require('./lib/componentManager');

var aunp = {
	init 	: function (app, directory) {
		init.initAunp(aunp, app, directory);
		init.loadServices(aunp);
		init.loadComponents(aunp);
	},
	add 	: {
		service 	: function (toAdd) {
			serviceManager.addService(aunp, toAdd);
		},
		component 	: function (toAdd) {
			componentManager.addComponent(aunp, toAdd);
		}
	},
	helper 				: helper,
	stringTemplatter 	: stringTemplatter
}

module.exports = aunp;