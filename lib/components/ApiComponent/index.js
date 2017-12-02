const express = require('express');
const AunpComponent = require('../Component');

class AunpApiComponent extends AunpComponent {
	constructor () {
		super();
		this.routes = [];
		this.dependencies = ['ApiRequest'];
	}

	query (req, file, done) {
		done(file + ' query');
	}

	createApiRoute (route) {
		let defaultRoute = {
			method 		: 'get',
			route 		: '/',
			description : 'This is an Aunp route',
			before      : (req, res, done) => { done(req); },
			after       : (req, res, done) => { done(); }
		}

		route = Object.assign(defaultRoute, route);
		this.routes.push(route);
		this.router[route.method](route.route, (req, res) => {
			route.before(req, res, (req) => {
				this.query(req, route.query, (data) => {
					this.data = data;
					route.after(req, res, () => {
						this.sendData(req, res);
					});
				});
			});
		});
	}
}

module.exports = AunpApiComponent;