/* tslint:disable: no-magic-numbers */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	boolean,
	number
} from '@storybook/addon-knobs/react';
import ToggleSelect, {
	ToggleSelectOption
} from './';

const stylableApi = `
Stylable API
---
- ::option
- ::label
- ::input
- ::button
`;

const events = {
	onChange: action('change')
};

storiesOf('ToggleSelect', module)
	// @ts-ignore
	.addParameters({
		info: stylableApi
	})
	.add(
		'with basic state',
		() => (
			<ToggleSelect
				{...events}
				id='toggleSelect'
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
				defaultValue={[1, 2]}
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
				value={[1, 2]}
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
