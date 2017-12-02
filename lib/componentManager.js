const helper = require('./helper');
const path = require('path');

module.exports = {
	getNativeComponents : function () {
		return this.getComponents(path.join(__dirname, 'components'));
	},
	getComponents : function (source) {
		const directories = helper.readDirDir(source);
		let components = {};

		for (var i = 0; i < directories.length; i++) {
			let componentName = directories[i].split('/').reverse()[0];

			components[componentName] 				= require(directories[i]);
			components[componentName].componentName = componentName;
			if (i === directories.length - 1) {
				return components;
			}
		}
	},
	applyComponents : function (app, components, aunp) {
		for (var key in components) {
			let component = components[key];
			let waterfall = component.waterfall;

			component.execWaterfall(app, waterfall, 0);
		}
	}
}