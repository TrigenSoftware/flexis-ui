import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean,
	number
} from '@storybook/addon-knobs/react';
import ToggleSelect, {
	ToggleSelectOption
} from './';

const stylableApi = `
Stylable API
---
- Button
- ::option
- ::input
`;

const events = {
	onChange: action('change')
};

const defaultValue = [1, 2]; // eslint-disable-line

storiesOf('ToggleSelect', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with basic state',
		() => (
			<ToggleSelect
				{...events}
				style={{ width: '10rem' }}
				disabled={boolean('Disabled', false)}
			>
				<ToggleSelectOption value={0}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={1}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	)
	.add(
		'with disabled state',
		() => (
			<ToggleSelect
				{...events}
				style={{ width: '10rem' }}
				disabled={boolean('Disabled', true)}
			>
				<ToggleSelectOption value={0}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={1}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	)
	.add(
		'with default value',
		() => (
			<ToggleSelect
				{...events}
				style={{ width: '10rem' }}
				name='select'
				defaultValue={1}
				disabled={boolean('Disabled', false)}
			>
				<ToggleSelectOption value={0}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={1}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	)
	.add(
		'with value',
		() => (
			<ToggleSelect
				{...events}
				style={{ width: '10rem' }}
				name='select'
				value={number('Value', 1)}
				disabled={boolean('Disabled', false)}
			>
				<ToggleSelectOption value={0}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={1}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	)
	.add(
		'with default multiple values',
		() => (
			<ToggleSelect
				{...events}
				style={{ width: '10rem' }}
				name='select'
				defaultValue={defaultValue}
				disabled={boolean('Disabled', false)}
				multiple
			>
				<ToggleSelectOption value={0}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={1}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	)
	.add(
		'with basic multiple state',
		() => (
			<ToggleSelect
				{...events}
				style={{ width: '10rem' }}
				name='select'
				disabled={boolean('Disabled', false)}
				multiple
			>
				<ToggleSelectOption value={0}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={1}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	)
	.add(
		'with multiple values',
		() => (
			<ToggleSelect
				{...events}
				style={{ width: '10rem' }}
				name='select'
				value={defaultValue}
				disabled={boolean('Disabled', false)}
				multiple
			>
				<ToggleSelectOption value={0}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={1}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	);
