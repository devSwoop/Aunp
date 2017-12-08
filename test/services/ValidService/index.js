const path 	= require('path');
const fs 	= require('fs');

class ValidService {
	apply (component, app, callback) {
		component.serviceMethod = this.serviceMethod;
	}

	get name () {
		return 'ValidService';
	}

	serviceMethod (value) {
		return 'im a service';
	}
}

module.exports = new ValidService;