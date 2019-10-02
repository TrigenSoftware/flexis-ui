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

import BurgerButton from './';

const stylableApi = `
Stylable API
---
_empty_
`;

export const events = {
	onClick: action('click'),
	onFocus: action('focus'),
	onBlur:  action('blur')
};

storiesOf('BurgerButton', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with default state',
		() => (
			<BurgerButton
				{...events}
				active={boolean('Active', false)}
			>
				{text('Text', 'Open menu')}
			</BurgerButton>
		)
	)
	.add(
		'with active state',
		() => (
			<BurgerButton
				{...events}
				active={boolean('Active', true)}
			>
				{text('Text', 'Open menu')}
			</BurgerButton>
		)
	);
