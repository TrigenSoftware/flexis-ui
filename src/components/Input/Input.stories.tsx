import React from 'react';
import {
	action
} from '@storybook/addon-actions';
import {
	text,
	boolean,
	select
} from '@storybook/addon-knobs/react';
import {
	storiesOf
} from '../../helpers/stories';
import Input from './';

const {
	TestIcon
} = global as any;

export const stylableApi = `
Stylable API
---
- :withIcon
- ::icon
	- :leftAlign
	- :rightAlign
- ::input
- ::border
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
	)
	.add(
		'with icon',
		() => (
			<Input
				{...events}
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				value={text('Value', 'Value')}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'left')}
			/>
		)
	)
	.add(
		'with right aligned icon',
		() => (
			<Input
				{...events}
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				value={text('Value', 'Value')}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'right')}
			/>
		)
	);
