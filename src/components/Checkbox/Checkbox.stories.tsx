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
import Checkbox from './';

export const stylableApi = `
Stylable API
---
_empty_
`;

export const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

export default storiesOf('Checkbox', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with default state',
		() => (
			<Checkbox
				{...events}
				name='checkbox'
				disabled={boolean('Disabled', false)}
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
	)
	.add(
		'with value',
		() => (
			<Checkbox
				{...events}
				name='checkbox'
				value={Math.PI}
				disabled={boolean('Disabled', false)}
			/>
		)
	);
