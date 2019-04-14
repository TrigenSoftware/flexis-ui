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
import Link from './';

const {
	TestIcon
} = global as any;

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

export default storiesOf('Link', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with text',
		() => (
			<Link
				{...events}
				href='#'
			>
				{text('Label', 'Link')}
			</Link>
		)
	)
	.add(
		'with icon',
		() => (
			<Link
				{...events}
				href='#'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'left')}
			>
				{text('Label', 'Link')}
			</Link>
		)
	)
	.add(
		'with right aligned icon',
		() => (
			<Link
				{...events}
				href='#'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'right')}
			>
				{text('Label', 'Link')}
			</Link>
		)
	)
	.add(
		'with flex icon',
		() => (
			<Link
				{...events}
				style={{ width: '100px' }}
				href='#'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'right')}
				flexIcon={boolean('Flex icon', true)}
			>
				{text('Label', 'Link')}
			</Link>
		)
	);
