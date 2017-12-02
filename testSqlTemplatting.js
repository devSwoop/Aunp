var templatter = require('./lib/sqlTemplatting');

var sql =
		'{% for (i = 0; i < 5; i++) %}'+
			'SELECT * FROM "users" WHERE "users".id = {{ i + "_" + data.decoded.id }}'+
			'{% if (i >= 3) %}'+
				'\nWHERE "users".name = {{ data.toto }}'+
			'{% else %}'+
				' {{data.void}} '+
			'{% endif %}'+
		'{% endfor %}';
var data = {
	void : '',
	toto : ' TOTO ',
	decoded : {
		id : 'ID_USER'
	}
}
console.log(templatter.template(sql, data));
