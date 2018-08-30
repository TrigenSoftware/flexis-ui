import React from 'react';
import {
	configure,
	addDecorator
} from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';
import { setOptions } from '@storybook/addon-options';
import pkg from '../package.json';
import TestIcon from './star.svg';
import stylesheet from '../src/index.st.css';

global.TestIcon = TestIcon;

addDecorator(story => (
	<div
		{...stylesheet('root')}
		style={{ padding: '12px' }}
	>
		{story()}
	</div>
));
addDecorator(withInfo);
addDecorator(withKnobs);

const stories = require.context(
	'../src/',
	true,
	/\.stories\.tsx$/
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
