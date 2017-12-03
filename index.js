const express 			= require('express');
const helper 			= require('./lib/helper');
const path 				= require('path');
const init 				= require('./lib/initialize');
const stringTemplatter 	= require('./lib/sqlTemplatting');

module.exports = {
	init : function (app, directory) {
		init.initAunp(this, app, directory);
		init.loadDependencies(this);
		init.loadComponents(this);
	},
	helper 				: helper,
	stringTemplatter 	: stringTemplatter
}