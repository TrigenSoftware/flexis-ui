import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	action
} from '@storybook/addon-actions';
import {
	text
} from '@storybook/addon-knobs/react';
import Input from '../Input';
import FormGroup from './';

export const stylableApi = `
Stylable API
---
- ::label
`;

export const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

storiesOf('FormGroup', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with text label',
		() => (
			<FormGroup
				id='input-id'
				label={text('Label', 'Text label')}
			>
				<Input
					{...events}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with custom label',
		() => (
			<FormGroup
				id='input-id'
				label={(
					<b>
						{text('Label', 'Custom label')}
					</b>
				)}
			>
				<Input
					{...events}
					defaultValue=''
				/>
			</FormGroup>
		)
	);
