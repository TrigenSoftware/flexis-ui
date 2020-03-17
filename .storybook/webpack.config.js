const configureStorybook = require('@trigen/scripts-preset-react-app/storybook/webpack.config');

process.env.FLEXISUI_STORIES = JSON.stringify(true);

module.exports = configureStorybook;
