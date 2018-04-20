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
import Button from './';

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

storiesOf('Button', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with text',
		() => (
			<Button
				disabled={boolean('Disabled', false)}
				{...events}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with icon',
		() => (
			<Button
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'left')}
				{...events}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with right aligned icon',
		() => (
			<Button
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'right')}
				{...events}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with flex icon',
		() => (
			<Button
				style={{ width: '100px' }}
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'right')}
				flexIcon={boolean('Flex icon', true)}
				{...events}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with custom styles',
		() => (
			<Button
				focus={boolean('Focus', false)}
				hover={boolean('Hover', false)}
				active={boolean('Active', false)}
				disabled={boolean('Disabled', false)}
				{...events}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with custom styles and icon',
		() => (
			<Button
				focus={boolean('Focus', false)}
				hover={boolean('Hover', false)}
				active={boolean('Active', false)}
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', ['left', 'right'], 'left')}
				{...events}
			>
				{text('Label', 'Button')}
			</Button>
		)
	);
