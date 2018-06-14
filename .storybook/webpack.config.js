const StylablePlugin = require('stylable-integration/webpack-plugin');
const stylelint = require('stylelint');
const postcssReporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');
const { browsers } = require('../package.json');

module.exports = configureStorybook;

function configureStorybook(storybookBaseConfig) {

	const storybookBaseConfigRules = storybookBaseConfig.module.rules;

	storybookBaseConfigRules.unshift(
		StylablePlugin.rule(),
		{
			enforce: 'pre',
			test:    /(?!<\.st)\.css$/,
			exclude: /node_modules/,
			use:     [{
				loader:  'postcss-loader',
				options: {
					plugins:   () => [
						stylelint(),
						postcssReporter({ clearReportedMessages: true })
					]
				}
			}]
		}, {
			test: /(?!<\.st)\.css$/,
			use:  [{
				loader:  'postcss-loader',
				options: {
					sourceMap: true,
					plugins:   () => [
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

	storybookBaseConfigRules.some((rule, i) => {

		if (rule.loader && rule.loader.includes('babel-loader')) {

			storybookBaseConfigRules[i] = {
				test:    rule.test,
				include: rule.include,
				exclude: rule.exclude,
				use:     [
					'babel-loader',
					'eslint-loader'
				]
			};

			storybookBaseConfigRules.push({
				test:    /\.tsx?$/,
				include: rule.include,
				exclude: rule.exclude,
				use:     [
					{
						loader:  'at-loader',
						options: {
							forceIsolatedModules: true,
							useCache:             true,
							reportFiles:          ['src/**/*.{ts,tsx}']
						}
					},
					'tslint-loader'
				]
			});

			return true;
		}

		return false;
	});

	storybookBaseConfig.plugins.push(
		new StylablePlugin({
			rootScope:       false,
			injectBundleCss: true,
			nsDelimiter:     '🦄'
		})
	);

	return storybookBaseConfig;
}
