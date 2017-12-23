const express = require('express');
const AunpComponent = require('../../../lib/components/Component');

class ValidComponent extends AunpComponent {
	constructor () {
		super(__dirname);
	}
}

module.exports = ValidComponent;