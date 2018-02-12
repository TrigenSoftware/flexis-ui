const StylablePlugin = require('stylable-integration/webpack-plugin');
const stylelint = require('stylelint');
const postcssReporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');
const { browsers } = require('../package.json');

module.exports = configureStorybook;

function configureStorybook(storybookBaseConfig) {

	storybookBaseConfig.module.rules.unshift(
		StylablePlugin.rule(),
		{
			test: /(?!<\.st)\.css$/,
			use: [{
				loader:  'postcss-loader',
				options: {
					sourceMap: true,
					plugins:   () => [
						stylelint(),
						postcssReporter({ clearReportedMessages: true }),
						autoprefixer({
							browsers
						})
					]
				}
			}]
		}, {
			test:    /\.svg$/,
			exclude: /node_modules/,
			loader:  'svg-react-loader'
		}
	);

	storybookBaseConfig.module.rules.some((rule, i) => {

		if (rule.loader && rule.loader.includes('babel-loader')) {

			storybookBaseConfig.module.rules[i] = {
				test:    rule.test,
				include: rule.include,
				exclude: rule.exclude,
				use:     [
					'babel-loader',
					'eslint-loader'
				]
			};

			return true;
		}

		return false;
	});

	storybookBaseConfig.plugins.push(
		new StylablePlugin({
			injectBundleCss: true,
			nsDelimiter:     '🦄'
		})
	);

	return storybookBaseConfig;
}
