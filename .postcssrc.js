const autoprefixer = require('autoprefixer');
const momentum = require('postcss-momentum-scrolling');

module.exports = () => ({
	plugins: [
		autoprefixer(),
		momentum([
			'scroll',
			'auto'
		])
	]
});
