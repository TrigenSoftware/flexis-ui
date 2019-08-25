import './injectTestIcon';
import React from 'react';
import {
	configure
} from '@trigen/scripts-preset-react-app/storybook/config';
import {
	addDecorator
} from '@storybook/react';
import stylesheet from '../src/reboot.st.css';

addDecorator(story => (
	<div {...stylesheet('root')}>
		{story()}
	</div>
));

const stories = require.context(
	process.env.PROJECT_SRC,
	true,
	/\.stories\.tsx$/
);

configure(module, stories);
