const express = require('express');
const AunpComponent = require('../../../lib/components/Component').constructor;

class Component extends AunpComponent {
	constructor () {
		super(__dirname);
		this.routes = [];
	}
}

module.exports = new Component;