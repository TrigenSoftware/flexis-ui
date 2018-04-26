import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean
} from '@storybook/addon-knobs/react';
import FileDrop from './';

const stylableApi = `
Stylable API
---
- :disabled
- :dragOver
`;

const events = {
	onChange: action('change')
};

storiesOf('FileDrop', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
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
