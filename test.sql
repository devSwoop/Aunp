{% for (i = 0; i < data.tables.length; i++) %}
	SELECT * FROM "{{ data.tables[i] }}"
	WHERE {{ data.tables[i] + ".id" }} = {{ i }}
	{% if (i >= 1) %}
		AND toto = {{ data.tables.length }}
	{% else %}
	{% endif %}
{% endfor %}