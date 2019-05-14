/* tslint:disable no-magic-numbers */
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
import Input from './';

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

export default storiesOf('Input', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with default state',
		() => (
			<Input
				{...events}
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
			/>
		)
	)
	.add(
		'with default value',
		() => (
			<Input
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
			<Input
				{...events}
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				value={text('Value', 'Value')}
			/>
		)
	)
	.add(
		'with type number',
		() => (
			<Input
				{...events}
				type='number'
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				defaultValue={4}
			/>
		)
	)
	.add(
		'with mask',
		() => (
			<Input
				{...events}
				placeholder={text('Placeholder', '')}
				mask={text('Mask', '+7 (999) 999-99-99')}
				disabled={boolean('Disabled', false)}
				defaultValue='+7 (913) 421-04-04'
			/>
		)
	);
