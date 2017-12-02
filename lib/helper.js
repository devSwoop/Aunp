const fs = require('fs');
const path = require('path');
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

var helper = {
	readDirDir : function (source) {
		const isDirectory = source => lstatSync(source).isDirectory();
		let directories = readdirSync(source).map(name => join(source, name)).filter(isDirectory);
		return directories;
	},
	readFileDir : function (dirPath) {
		fs.readdir(dirPath, function (err, files) {
		    if (err) {
		        throw err;
		    }

		    files.map(function (file) {
		        return path.join(dirPath, file);
		    }).filter(function (file) {
		        return fs.statSync(file).isFile();
		    }).forEach(function (file) {
		        console.log("%s (%s)", file, path.extname(file));
		    });
		});
	}
}

module.exports = helper;