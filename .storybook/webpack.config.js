const StylablePlugin = require('stylable-integration/webpack-plugin');
const stylelint = require('stylelint');
const postcssReporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');
const { atLoaderOptions } = require('../tsconfig.json');

module.exports = configureStorybook;

function configureStorybook(storybookBaseConfig) {

	storybookBaseConfig.resolve.extensions.push('.ts', '.tsx');

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
						autoprefixer()
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

		if (String(rule.test) == '/\\.jsx?$/') {

			storybookBaseConfigRules[i] = {
				test:    rule.test,
				include: rule.include,
				exclude: rule.exclude,
				loader:  require.resolve('babel-loader')
			};

			storybookBaseConfigRules.push({
				test:    /\.tsx?$/,
				include: rule.include,
				exclude: rule.exclude,
				use:     [
					{
						loader:  'awesome-typescript-loader',
						options: Object.assign({
							forceIsolatedModules: true,
							useCache:             true,
							reportFiles:          ['src/**/*.{ts,tsx}']
						}, atLoaderOptions)
					},
					{
						loader:  'tslint-loader',
						options: {
							configFile: './tsconfig.json'
						}
					}
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
