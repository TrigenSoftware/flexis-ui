import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	text,
	boolean,
	select
} from '@storybook/addon-knobs/react';
import Link from './';

const { TestIcon } = global as any;

const stylableApi = `
Stylable API
---
- :withIcon
- :flexIcon
- ::icon
	- :leftAlign
	- :rightAlign
- ::iconContainer
`;

const events = {
	onClick: action('click'),
	onFocus: action('focus'),
	onBlur:  action('blur')
};

storiesOf('Link', module)
	// @ts-ignore
	.addParameters({
		info: stylableApi
	})
	.add(
		'with text',
		() => (
			<Link
				href='#'
				{...events}
			>
				{text('Label', 'Link')}
			</Link>
		)
	)
	.add(
		'with icon',
		() => (
			<Link
				href='#'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'left')}
				{...events}
			>
				{text('Label', 'Link')}
			</Link>
		)
	)
	.add(
		'with right aligned icon',
		() => (
			<Link
				href='#'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'right')}
				{...events}
			>
				{text('Label', 'Link')}
			</Link>
		)
	)
	.add(
		'with flex icon',
		() => (
			<Link
				style={{ width: '100px' }}
				href='#'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'right')}
				flexIcon={boolean('Flex icon', true)}
				{...events}
			>
				{text('Label', 'Link')}
			</Link>
		)
	);
