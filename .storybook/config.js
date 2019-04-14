import './injectTestIcon';
import '@trigen/scripts/storybook/config';
import React from 'react';
import {
	addDecorator
} from '@storybook/react';
import stylesheet from '../src/reboot.st.css';

addDecorator(story => (
	<div {...stylesheet('root')}>
		{story()}
	</div>
));
