const path = require('path');
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

var helper = {
	readDirDir : function (source) {
		const isDirectory = source => lstatSync(source).isDirectory();
		let directories = readdirSync(source).map(name => join(source, name)).filter(isDirectory);

		return directories;
	}
}

module.exports = helper;