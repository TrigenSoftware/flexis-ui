import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean,
	select
} from '@storybook/addon-knobs/react';
import Checkbox, {
	colors,
	sizes
} from './';

const stylableApi = `
Stylable API
---
- :pseudoFocus
${colors.map(_ => `- :${_}Color`).join('\n')}
${sizes.map(_ => `- :${_}Size`).join('\n')}
- ::checkbox
- ::face
`;

const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

storiesOf('Checkbox', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with default state',
		() => (
			<Checkbox
				disabled={boolean('Disabled', false)}
				defaultChecked={false}
				{...events}
			/>
		)
	)
	.add(
		'with default checked',
		() => (
			<Checkbox
				disabled={boolean('Disabled', false)}
				defaultChecked
				{...events}
			/>
		)
	)
	.add(
		'with unchecked state',
		() => (
			<Checkbox
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', false)}
				{...events}
			/>
		)
	)
	.add(
		'with checked state',
		() => (
			<Checkbox
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', true)}
				{...events}
			/>
		)
	)
	.add(
		'with custom styles',
		() => (
			<Checkbox
				focus={boolean('Focus', false)}
				disabled={boolean('Disabled', false)}
				color={select('Color', colors, colors[0])}
				size={select('Size', sizes, sizes[0])}
				checked={boolean('Checked', true)}
				{...events}
			/>
		)
	);
