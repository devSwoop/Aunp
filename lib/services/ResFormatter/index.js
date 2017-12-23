/**
 * Format your res
 */
class ResFormatterService {
	/**
	 * @param  {Object} 	component 	Component to apply the service on
	 * @param  {Object} 	app 		Express app
	 * @param  {Function}	callback 	Callback
	 */
	apply (component, app, callback) {
		this.component 	= component;
		component.on('formatRes', (data, callback) => {
			callback(this.formatRes(data));
		});
	}

	/**
	 * Mandatory method
	 */
	get name () {
		return 'ResFormatter';
	}

	/**
	 * @param  {Object} 	data 	Component data (query result)
	 * @return {Object} 			Formatted res
	 */
	formatRes (data) {
		let res = {
			data	: data,
			message	: 'Ok'
		}

		return res;
	}
}

module.exports = new ResFormatterService;