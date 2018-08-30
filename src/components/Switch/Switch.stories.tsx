import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	boolean
} from '@storybook/addon-knobs/react';
import Switch from './';

const stylableApi = `
Stylable API
---
- ::input
- ::face
`;

const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

storiesOf('Switch', module)
	// @ts-ignore
	.addParameters({
		info: stylableApi
	})
	.add(
		'with default state',
		() => (
			<Switch
				type='checkbox'
				disabled={boolean('Disabled', false)}
				defaultChecked={false}
				{...events}
			/>
		)
	)
	.add(
		'with default checked',
		() => (
			<Switch
				type='checkbox'
				disabled={boolean('Disabled', false)}
				defaultChecked
				{...events}
			/>
		)
	)
	.add(
		'with unchecked state',
		() => (
			<Switch
				type='checkbox'
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', false)}
				{...events}
			/>
		)
	)
	.add(
		'with checked state',
		() => (
			<Switch
				type='checkbox'
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', true)}
				{...events}
			/>
		)
	);
