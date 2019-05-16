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
	storiesOf,
	buildInfo
} from '../../helpers/stories';
import {
	AlignSideValues
} from '../common/types';
import Link from './';

const {
	TestIcon
} = global as any;

export const stylableApi = `
Stylable API
---
- :withIcon
- :flexIcon
- ::iconContainer
- ::icon
${buildInfo([
	{
		values:  AlignSideValues,
		prefix:  ':',
		postfix: 'align',
		indent:  1
	}
])}
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
				alignIcon={select('Align icon', AlignSideValues, 'left')}
			>
				{text('Label', 'Link')}
			</Link>
		)
	)
	.add(
		'with icon only',
		() => (
			<Link
				{...events}
				href='#'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, 'left')}
			/>
		)
	)
	.add(
		'with right aligned icon',
		() => (
			<Link
				{...events}
				href='#'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, 'right')}
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
				alignIcon={select('Align icon', AlignSideValues, 'right')}
				flexIcon={boolean('Flex icon', true)}
			>
				{text('Label', 'Link')}
			</Link>
		)
	);
