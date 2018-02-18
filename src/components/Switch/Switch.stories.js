import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean,
	select
} from '@storybook/addon-knobs/react';
import Switch, {
	colors,
	sizes
} from './';

const stylableApi = `
Stylable API
---
- :pseudoFocus
- :pseudoHover
- :pseudoActive
${colors.map(_ => `- :${_}Color`).join('\n')}
${sizes.map(_ => `- :${_}Size`).join('\n')}
- ::input
- ::face
`;

const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

storiesOf('Switch', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
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
	)
	.add(
		'with custom styles',
		() => (
			<Switch
				type='checkbox'
				focus={boolean('Focus', false)}
				hover={boolean('Hover', false)}
				active={boolean('Active', false)}
				disabled={boolean('Disabled', false)}
				color={select('Color', colors, colors[0])}
				size={select('Size', sizes, sizes[0])}
				checked={boolean('Checked', true)}
				{...events}
			/>
		)
	);
