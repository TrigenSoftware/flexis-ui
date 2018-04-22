import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean
} from '@storybook/addon-knobs/react';
import Radio from './';

const stylableApi = `
Stylable API
---
- :pseudoFocus
- :pseudoHover
- :pseudoActive
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
	);
