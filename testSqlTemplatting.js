var templatter = require('./lib/sqlTemplatting');
const fs = require('fs');

var data = {
	void : '',
	toto : ' TOTO ',
	decoded : {
		id : 'ID_USER'
	},
	tables : [
		'user',
		'articles',
		'comments'
	]
}
var sql = fs.readFileSync('./test.sql', 'utf8');
console.log(templatter.template(sql, data));
