import 'babel-polyfill';
import React from 'react';
import {
	configure,
	addDecorator,
	setAddon
} from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { Stylable } from '../src/helpers';
import pkg from '../package.json';
import TestIcon from './star.svg';
import testTheme from '../src/themes/test-index.st.css';

global.TestIcon = TestIcon;

addDecorator(story => Stylable(testTheme)(() => (
	<div style={{ padding: '12px' }}>
		{story()}
	</div>
))({}));

const stories = require.context(
	'../src/',
	true,
	/\.stories\.js$/
);

function loadStories() {
	stories.keys().forEach(filename =>
		stories(filename)
	);
}

setOptions({
	name:              'Flexis UI',
	url:               pkg.repository.url.replace(/(^git\+)|(\.git$)/g, ''),
	addonPanelInRight: true
});

configure(loadStories, module);
