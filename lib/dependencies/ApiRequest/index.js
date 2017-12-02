class ApiRequestDependency {
	apply (component, app, callback) {
		callback();
	}
}

module.exports = new ApiRequestDependency;