import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	boolean
} from '@storybook/addon-knobs/react';
import Checkbox from './';

export const stylableApi = `
Stylable API
---
- ::checkbox
- ::face
`;

export const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

storiesOf('Checkbox', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with default state',
		() => (
			<Checkbox
				disabled={boolean('Disabled', false)}
				defaultChecked={false}
			/>
		)
	)
	.add(
		'with default checked',
		() => (
			<Checkbox
				{...events}
				disabled={boolean('Disabled', false)}
				defaultChecked
			/>
		)
	)
	.add(
		'with unchecked state',
		() => (
			<Checkbox
				{...events}
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', false)}
			/>
		)
	)
	.add(
		'with checked state',
		() => (
			<Checkbox
				{...events}
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', true)}
			/>
		)
	);
