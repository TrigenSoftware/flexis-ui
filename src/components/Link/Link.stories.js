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
import Link from './';

const { TestIcon } = global;

const stylableApi = `
Stylable API
---
- :pseudoFocus
- :pseudoHover
- :pseudoActive
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
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
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
		'with disguised variant',
		() => (
			<Link
				href='#'
				variant='disguised'
				{...events}
			>
				<button>
					{text('Label', 'Link')}
				</button>
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
