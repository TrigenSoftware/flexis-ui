import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean,
	select
} from '@storybook/addon-knobs/react';
import Radio, {
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
- ::radio
- ::face
`;

const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

storiesOf('Radio', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with default state',
		() => (
			<Radio
				disabled={boolean('Disabled', false)}
				defaultChecked={false}
				{...events}
			/>
		)
	)
	.add(
		'with default checked',
		() => (
			<Radio
				disabled={boolean('Disabled', false)}
				defaultChecked
				{...events}
			/>
		)
	)
	.add(
		'with unchecked state',
		() => (
			<Radio
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', false)}
				{...events}
			/>
		)
	)
	.add(
		'with checked state',
		() => (
			<Radio
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', true)}
				{...events}
			/>
		)
	)
	.add(
		'with custom styles',
		() => (
			<Radio
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
