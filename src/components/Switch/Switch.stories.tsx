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
import Switch from './';

export const stylableApi = `
Stylable API
---
- ::input
- ::face
`;

export const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

export default storiesOf('Switch', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with default state',
		() => (
			<Switch
				{...events}
				type='checkbox'
				disabled={boolean('Disabled', false)}
				defaultChecked={false}
			/>
		)
	)
	.add(
		'with default checked',
		() => (
			<Switch
				{...events}
				type='checkbox'
				disabled={boolean('Disabled', false)}
				defaultChecked
			/>
		)
	)
	.add(
		'with unchecked state',
		() => (
			<Switch
				{...events}
				type='checkbox'
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', false)}
			/>
		)
	)
	.add(
		'with checked state',
		() => (
			<Switch
				{...events}
				type='checkbox'
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', true)}
			/>
		)
	);
