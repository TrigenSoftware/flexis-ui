import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	text,
	boolean,
	select
} from '@storybook/addon-knobs/react';
import Button from './';

const { TestIcon } = global as any;

export const stylableApi = `
Stylable API
---
- :withIcon
- :flexIcon
- ::icon
	- :leftAlign
	- :rightAlign
- ::iconContainer
`;

export const events = {
	onClick: action('click'),
	onFocus: action('focus'),
	onBlur:  action('blur')
};

storiesOf('Button', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with text',
		() => (
			<Button
				{...events}
				disabled={boolean('Disabled', false)}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with icon',
		() => (
			<Button
				{...events}
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'left')}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with right aligned icon',
		() => (
			<Button
				{...events}
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'right')}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with flex icon',
		() => (
			<Button
				{...events}
				style={{ width: '100px' }}
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'right')}
				flexIcon={boolean('Flex icon', true)}
			>
				{text('Label', 'Button')}
			</Button>
		)
	);
