import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	text,
	boolean,
	select
} from '@storybook/addon-knobs/react';
import Input, {
	colors,
	sizes
} from './';

const { TestIcon } = global;

const stylableApi = `
Stylable API
---
- :pseudoFocus
- :withIcon
${colors.map(_ => `- :${_}Color`).join('\n')}
${sizes.map(_ => `- :${_}Size`).join('\n')}
- ::icon
	- :leftAlign
	- :rightAlign
- ::input
`;

const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

storiesOf('Input', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with default state',
		() => (
			<Input
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
			<Input
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
			<Input
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				value={text('Value', 'Value')}
				{...events}
			/>
		)
	)
	.add(
		'with mask',
		() => (
			<Input
				placeholder={text('Placeholder', '')}
				mask={text('Mask', '+7 (999) 999-99-99')}
				disabled={boolean('Disabled', false)}
				defaultValue='+7 (913) 421-04-04'
				{...events}
			/>
		)
	)
	.add(
		'with icon',
		() => (
			<Input
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				value={text('Value', 'Value')}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'left')}
				{...events}
			/>
		)
	)
	.add(
		'with right aligned icon',
		() => (
			<Input
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				value={text('Value', 'Value')}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'right')}
				{...events}
			/>
		)
	)
	.add(
		'with custom styles',
		() => (
			<Input
				placeholder={text('Placeholder', '')}
				focus={boolean('Focus', false)}
				disabled={boolean('Disabled', false)}
				color={select('Color', colors, colors[0])}
				size={select('Size', sizes, sizes[0])}
				value={text('Value', 'Value')}
				{...events}
			/>
		)
	)
	.add(
		'with custom styles and icon',
		() => (
			<Input
				placeholder={text('Placeholder', '')}
				focus={boolean('Focus', false)}
				disabled={boolean('Disabled', false)}
				color={select('Color', colors, colors[0])}
				size={select('Size', sizes, sizes[0])}
				value={text('Value', 'Value')}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'left')}
				{...events}
			/>
		)
	);
