const superConfigureStorybook = require('@trigen/scripts-preset-react-app/storybook/webpack.config');
const findIndex = require('@trigen/scripts-preset-react-app/helpers/findIndex').default;
const { atLoaderOptions } = require('../tsconfig.json');

module.exports = configureStorybook;

process.env.FLEXISUI_STORIES = JSON.stringify(true);

function configureStorybook(input) {

	const storybookConfig = superConfigureStorybook(input);
	const { rules } = storybookConfig.module;
	const awLoader = rules[findIndex('test', '/\\.tsx?$/', rules)].use[0];

	Object.assign(awLoader.options, atLoaderOptions);

	return storybookConfig;
}
