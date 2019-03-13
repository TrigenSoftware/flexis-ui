const StylablePlugin = require('@stylable/webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const postcss = require('postcss');
const postcssrc = require('../.postcssrc');
const { atLoaderOptions } = require('../tsconfig.json');

module.exports = configureStorybook;

const stylesProcessor = postcss(postcssrc().plugins);

function postProcessor(stylableResult) {
	stylesProcessor.process(stylableResult.meta.outputAst).sync();
	return stylableResult;
}

function configureStorybook(storybookBaseConfig) {

	storybookBaseConfig.resolve.extensions.push('.ts', '.tsx');

	const storybookBaseConfigRules = storybookBaseConfig.module.rules;

	storybookBaseConfigRules.unshift({
		test:    /\.svg$/,
		exclude: /node_modules/,
		loader:  'svg-react-loader'
	});

	storybookBaseConfigRules.some((rule) => {

		if (~String(rule.test).indexOf('jsx')) {

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
							reportFiles:          [
								'src/**/*.{ts,tsx}',
								'!globals.d.ts'
							],
							useBabel:             true,
							babelCore:            '@babel/core'
						}, atLoaderOptions)
					},
					{
						loader:  'tslint-loader',
						options: {
							emitErrors: true,
							typeCheck:  false // speed up
						}
					}
				]
			});

			return true;
		}

		return false;
	});

	storybookBaseConfig.plugins.push(
		new StylelintPlugin({
			files: 'src/**/*.st.css'
		}),
		new StylablePlugin({
			transformHooks: { postProcessor }
		})
	);

	return storybookBaseConfig;
}
