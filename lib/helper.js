const path = require('path');
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

var helper = {
	/**
	 * Get directories in a directory
	 * @param  {String} 	source 	Directory to search in
	 * @return {Array} 				Found directories
	 */
	readDirDir : function (source) {
		const isDirectory = source => lstatSync(source).isDirectory();
		let directories = readdirSync(source).map(name => join(source, name)).filter(isDirectory);

		return directories;
	}
}

module.exports = helper;