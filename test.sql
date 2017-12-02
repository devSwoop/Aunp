{% for (i = 0; i < 5; i++) %}
	SELECT * FROM "users" WHERE "users".id = {{ i + "_" + data.decoded.id }}
	{% if (i >= 3) %}
		WHERE "users".name = {{ data.toto }}
	{% else %}
		{{data.void}}
	{% endif %}
{% endfor %}