const assert 	= require('assert');
const express	= require('express');
const init 		= require('../lib/initialize');
const app 		= express();
const aunp 		= require('../');
const manager 	= require('../lib/componentManager');

var expressApp;

describe('Components', function() {

	before(function () {
		init.initAunp(aunp, app, __dirname);
		expressApp = app.listen(3001);
	});

	after(function () {
		expressApp.close();
	});

	describe('Components loading', function () {

		afterEach(function () {
			aunp.components = {};
			aunp.services 	= {};
		});

		it('should load native components', function () {
			let component = require('../lib/components/Component');

			init.loadServices(aunp);
			init.loadComponents(aunp);
			assert.equal(aunp.components.AunpComponent, component);
		});

		it('should load app component', function () {
			let component = require('./components/ValidComponent');

			init.loadServices(aunp);
			init.loadComponents(aunp);
			assert.equal(aunp.components.ValidComponent, component);
		});

		it('should load component on the fly', function () {
			let component = require('./components/ValidComponent');

			aunp.add.component(component);
			assert.equal(aunp.components.ValidComponent, component);
		});

	});

	describe('Components building', function () {

		afterEach(function () {
			aunp.components = {};
		});

		it('should have services', function () {
			let component 	= require('./datasets/components/ComponentWithServices');
			let Event 		= require('../lib/services/Event');
			let Service 	= require('./services/ValidService');
			let got;

			init.loadServices(aunp);
			aunp.add.component(component);
			got = aunp.appliedComponents.ComponentWithServices;
			assert.equal(got.services[0], Event);
			assert.equal(got.services[1], Service);
		});

		it('should apply services', function () {
			let component 	= require('./datasets/components/ComponentWithServices');
			let Event 		= require('../lib/services/Event');
			let Service 	= require('./services/ValidService');
			let got;

			init.loadServices(aunp);
			aunp.add.component(component);
			got = aunp.appliedComponents.ComponentWithServices;
			assert.equal(got.serviceMethod, Service.serviceMethod);
			assert.equal(got.emit, Event.emit);
		});

	});

});
