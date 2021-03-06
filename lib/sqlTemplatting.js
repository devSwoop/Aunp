module.exports = {
	template : function (string, data) {
		this.separators = /({{|{%)(.*?)(%}|}})/g;
		this.sqlWithDelimiters = string.replace(this.separators, function (match) {
			return '__DELIMITER__' + match + '__DELIMITER__';
		});
		this.splittedSql = this.sqlWithDelimiters.split('__DELIMITER__');
		this.tokens = [];
		this.tokenTypes = [
			{
				regex : /{{.*?}}/,
				type  : 'variable'
			},
			{
				regex : /{%\s*?for.*?%}/,
				type  : 'for'
			},
			{
				regex : /{%\s*?if.*?%}/,
				type  : 'if'
			},
			{
				regex : /{%\s*?else.*?%}/,
				type  : 'else'
			},
			{
				regex : /{%\s*?endif.*?%}/,
				type  : 'endif'
			},
			{
				regex : /{%\s*?endfor.*?%}/,
				type  : 'endfor'
			}
		]
		for (key in this.splittedSql) {
			let item = this.splittedSql[key];

			this.tokens.push(this.getToken(item));
		}
		this.templattedSql = this.processTokens(this.tokens);
		this.stringToEval = this.templattedSql.join('');
		return this.stringToEval;
	},
	getToken : function (item) {
		let result;
		let token = {
			type : 'string',
			value : item
		}

		for (let key in this.tokenTypes) {
			let regex = this.tokenTypes[key].regex;

			if (item.match(regex)) {
				token.type = this.tokenTypes[key].type;
				token.value = token.value.replace(this.separators, function (match, p1, p2) {
					return p2;
				});
			}
		}
		return token;
	},
	processTokens : function (tokens) {
		let result = [];

		for (key in tokens) {
			let token = tokens[key];

			switch (token.type) {
				case 'string':
					token.value = ' + `' + token.value + '`';
					break;
				case 'variable':
					token.value = ' + ' + token.value;
					break;
				case 'for':
					token.value = ' + function() { let loopResult = ""; ' + token.value + ' { loopResult = loopResult';
					break;
				case 'if':
					token.value = ' + function() { let ifResult = ""; ' + token.value + ' { return ifResult';
					break;
				case 'else':
					token.value = '} ' + token.value + ' { return ifResult';
					break;
				case 'endif':
					token.value = '} return ifResult; }()';
					break;
				case 'endfor':
					token.value = '} return loopResult; }()'
					break;
				default:
					break;
			}
			result.push(token.value);
		}
		return result;
	}
}