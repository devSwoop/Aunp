var templatter = require('./lib/sqlTemplatting');

var sql = "bonjour c'est un fichier\
{{ data.toto }}\
sql qui possède des\
{% for (i = 0; i < 5; i++) %}\
	truc dedans\
	{% if (1 + 1) %}\
		qui s'affichent\
	{% else %}\
		ou pas\
	{% endif %}\
{% endfor %}";
var data = {
	toto : ' TOTO '
}
console.log(templatter.template(sql, data));
