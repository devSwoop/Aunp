class ApiRequestDependency {
	apply (component, app, callback) {
		console.log(component);
		callback();
	}
}

module.exports = new ApiRequestDependency;