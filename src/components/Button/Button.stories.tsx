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
import Button from './';

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

export default storiesOf('Button', module)
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
				alignIcon={select('Align icon', AlignSideValues, 'left')}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with icon only',
		() => (
			<Button
				{...events}
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, 'left')}
			/>
		)
	)
	.add(
		'with right aligned icon',
		() => (
			<Button
				{...events}
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, 'right')}
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
				alignIcon={select('Align icon', AlignSideValues, 'right')}
				flexIcon={boolean('Flex icon', true)}
			>
				{text('Label', 'Button')}
			</Button>
		)
	);
