import React from 'react';
import {
	action
} from '@storybook/addon-actions';
import {
	text,
	boolean
} from '@storybook/addon-knobs/react';
import {
	storiesOf
} from '../../helpers/stories';
import Textarea from './';

export const stylableApi = `
Stylable API
---
`;

export const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

export default storiesOf('Textarea', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with default state',
		() => (
			<Textarea
				{...events}
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				defaultValue=''
			/>
		)
	)
	.add(
		'with default value',
		() => (
			<Textarea
				{...events}
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				defaultValue='Default value'
			/>
		)
	)
	.add(
		'with value',
		() => (
			<Textarea
				{...events}
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				value={text('Value', 'Value')}
			/>
		)
	);
