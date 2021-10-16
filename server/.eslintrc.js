module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: ['eslint:recommended'],
	plugins: ['eslint-plugin-prettier'],
	parser: 'babel-eslint',
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		indent: ['error', 'tab'],
		'max-len': 'off',
		'prettier/prettier': [
			'error',
			{
				printWidth: 80,
				singleQuote: true,
				useTabs: true,
			},
		],
	},
};
