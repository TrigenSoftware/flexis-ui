const superConfigureStorybook = require('@trigen/scripts/storybook/webpack.config');
const findIndex = require('@trigen/scripts/helpers/findIndex').default;
const { atLoaderOptions } = require('../tsconfig.json');

module.exports = configureStorybook;

function configureStorybook(input) {

	const storybookConfig = superConfigureStorybook(input);
	const { rules } = storybookConfig.module;
	const awLoader = rules[findIndex('test', '/\\.tsx?$/', rules)].use[0];

	Object.assign(awLoader.options, atLoaderOptions);

	return storybookConfig;
}
