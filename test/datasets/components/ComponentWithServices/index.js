const express = require('express');
const AunpComponent = require('../../../../lib/components/Component');

class ComponentWithServices extends AunpComponent {
	constructor () {
		super(__dirname);
		this.addService(['Event', 'ValidService']);
	}
}

module.exports = ComponentWithServices;