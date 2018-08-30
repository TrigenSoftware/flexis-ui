import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	text,
	boolean
} from '@storybook/addon-knobs/react';
import Textarea from './';

const stylableApi = `
Stylable API
---
`;

const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

storiesOf('Textarea', module)
	// @ts-ignore
	.addParameters({
		info: stylableApi
	})
	.add(
		'with default state',
		() => (
			<Textarea
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				defaultValue=''
				{...events}
			/>
		)
	)
	.add(
		'with default value',
		() => (
			<Textarea
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				defaultValue='Default value'
				{...events}
			/>
		)
	)
	.add(
		'with value',
		() => (
			<Textarea
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				value={text('Value', 'Value')}
				{...events}
			/>
		)
	);
