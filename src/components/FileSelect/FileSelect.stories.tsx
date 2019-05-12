import React from 'react';
import {
	action
} from '@storybook/addon-actions';
import {
	boolean
} from '@storybook/addon-knobs/react';
import {
	storiesOf
} from '../../helpers/stories';
import Button from '../Button';
import FileSelect from './';

export const stylableApi = `
Stylable API
---
- ::input
`;

export const events = {
	onChange: action('change')
};

export default storiesOf('FileSelect', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with button',
		() => (
			<FileSelect
				{...events}
				disabled={boolean('Disabled', false)}
			>
				<Button>
					Select file
				</Button>
			</FileSelect>
		)
	)
	.add(
		'with disabled state',
		() => (
			<FileSelect
				{...events}
				disabled={boolean('Disabled', true)}
			>
				<Button>
					Select file
				</Button>
			</FileSelect>
		)
	);
