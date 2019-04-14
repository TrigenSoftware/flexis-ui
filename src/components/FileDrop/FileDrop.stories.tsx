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
import FileDrop from './';

export const stylableApi = `
Stylable API
---
- :disabled
- :dragOver
`;

export const events = {
	onChange: action('change')
};

export default storiesOf('FileDrop', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with content',
		() => (
			<FileDrop
				{...events}
				style={{
					border: '1px dashed black',
					width:  '40rem',
					height: '40rem'
				}}
				disabled={boolean('Disabled', false)}
			>
				Drop files here
			</FileDrop>
		)
	)
	.add(
		'with disabled state',
		() => (
			<FileDrop
				{...events}
				style={{
					border: '1px dashed black',
					width:  '40rem',
					height: '40rem'
				}}
				disabled={boolean('Disabled', true)}
			>
				Drop files here
			</FileDrop>
		)
	);
