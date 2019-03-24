import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	boolean
} from '@storybook/addon-knobs/react';
import Radio from './';

export const stylableApi = `
Stylable API
---
- ::radio
- ::face
`;

export const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

storiesOf('Radio', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with default state',
		() => (
			<Radio
				{...events}
				disabled={boolean('Disabled', false)}
				defaultChecked={false}
			/>
		)
	)
	.add(
		'with default checked',
		() => (
			<Radio
				{...events}
				disabled={boolean('Disabled', false)}
				defaultChecked
			/>
		)
	)
	.add(
		'with unchecked state',
		() => (
			<Radio
				{...events}
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', false)}
			/>
		)
	)
	.add(
		'with checked state',
		() => (
			<Radio
				{...events}
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', true)}
			/>
		)
	);
