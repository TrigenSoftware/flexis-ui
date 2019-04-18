import './injectTestIcon';
import {
	loadStories
} from '@trigen/scripts/storybook/config';
import React from 'react';
import {
	addDecorator,
	configure
} from '@storybook/react';
import stylesheet from '../src/reboot.st.css';

addDecorator(story => (
	<div {...stylesheet('root')}>
		{story()}
	</div>
));

configure(loadStories, module);
