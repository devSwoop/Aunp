const helper 	= require('./helper');
const path 		= require('path');

var manager = {
	/**
	 * Add component(s) on the fly
	 * @param {Object} 			aunp 		Aunp instance
	 * @param {Array|Object}	components 	Components list, or one component
	 */
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
	/**
	 * Get components in given directory
	 * @param  {String} source 	Directory to search in
	 * @return {Array}			Found components
	 */
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
	/**
	 * Apply components to the app
	 * @param  {Object} 	app 		Express app
	 * @param  {Array} 		components 	Components list to apply
	 * @param  {Object}		aunp 		Aunp instance
	 */
	applyComponents : function (app, components, aunp) {
		for (var key in components) {
			try {
				var component = new components[key];
				var waterfall = component.waterfall;
			} catch (e) {
				throw '"' + key + '" component does not seem to be a Aunp component';
			}

			if (component.execWaterfall === undefined) {
				throw component.name + ' component does not provide execWaterfall method and cannot be loaded';
			}
			if (component.isApplied === false || component.isApplied === undefined) {
				try {
					component.execWaterfall(app, waterfall, 0);
					aunp.appliedComponents[component.name] = component;
				} catch (e) {
					throw 'Error in "' + component.name + '" component: ' + e;
				}
			}
			component.isApplied = true;
		}
	}
}

module.exports = manager;