const assert 	= require('assert');
const express	= require('express');
const init 		= require('../lib/initialize');
const app 		= express();
const aunp 		= require('../');
const manager 	= require('../lib/serviceManager');

var expressApp;

describe('Services', function() {

	before(function () {
		init.initAunp(aunp, app, __dirname);
		expressApp = app.listen(3001);
	});

	after(function () {
		expressApp.close();
	});

	describe('Services loading', function () {

		afterEach(function () {
			aunp.services = {};
		});

		it('should load service (native)', function () {
			let service = require('../lib/services/Event');

			init.loadServices(aunp);
			assert.equal(aunp.services.Event, service);
		});

		it('should load service (in app directory)', function () {
			let service = require('./services/ValidService');

			init.loadServices(aunp);
			assert.equal(aunp.services.ValidService, service);
		});

		it('should load service (on the fly)', function () {
			let service = require('../lib/services/Event');

			aunp.add.service(service);
			assert.equal(aunp.services.Event, service);
		});

	});
});
