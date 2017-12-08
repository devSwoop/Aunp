const helper = require('./helper');
const path = require('path');

var manager = {
	addComponent : function (aunp, components) {
		if (components === undefined) {
			throw 'Given service is undefined';
		}
		if (components.constructor === Array) {
			for (let key in components) {
				manager.addComponent(aunp, components[key]);
			}
		} else {
			if (aunp.components[components.name] !== undefined) {
				throw 'Component ' + components.name + ' already exists';
			} else {
				aunp.components[components.name] = components;
			}
		}
		manager.applyComponents(aunp.app, aunp.components, aunp);
	},
	getComponentsObject : function (source) {
		let components = [];
		let directories;

		try {
			directories = helper.readDirDir(source);
		} catch (e) {
			return [];
		}
		for (var i = 0; i < directories.length; i++) {
			let componentName 	= directories[i].split('/').reverse()[0];
			let component 		= require(directories[i]);

			components.push(component);
		}
		return components;
	},
	getNativeComponents : function () {
		return this.getComponents(path.join(__dirname, 'components'));
	},
	getComponents : function (source) {
		let directories;
		try {
			directories = helper.readDirDir(source);
		} catch (e) {
			throw 'Wrong components directory, please fix your config/aunp.js';
		}
		let components = {};

		for (var i = 0; i < directories.length; i++) {
			let componentName = directories[i].split('/').reverse()[0];

			components[componentName] 		= require(directories[i]);
			components[componentName].name 	= componentName;
			if (i === directories.length - 1) {
				return components;
			}
		}
	},
	applyComponents : function (app, components, aunp) {
		for (var key in components) {
			let component = components[key];
			let waterfall = component.waterfall;

			if (component.execWaterfall === undefined) {
				throw component.componentName + ' component does not provide execWaterfall method and cannot be loaded';
			}
			if (component.isApplied === false || component.isApplied === undefined) {
				component.execWaterfall(app, waterfall, 0);
			}
			component.isApplied = true;
		}
	}
}

module.exports = manager;