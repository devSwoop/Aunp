class ApiRequestDependency {
	apply (component, app, callback) {
		component.$on('matchedRoute', (route, callback) => {
			console.log(route.route + ' path has been matched');
		});
		component.$on('hasData', (callback) => {
			callback('data from dependency');
		});
		callback();
	}
}

module.exports = new ApiRequestDependency;