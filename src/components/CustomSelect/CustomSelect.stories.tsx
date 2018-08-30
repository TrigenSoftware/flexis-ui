/* tslint:disable: no-magic-numbers */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	text,
	boolean,
	number
} from '@storybook/addon-knobs/react';
import CustomSelect, {
	CustomSelectFace,
	CustomSelectOption
} from './';

const stylableApi = `
Stylable API
---
- ::dropdownContent
- ::label
- ::button
- ::placeholder
- ::options
- ::option
- ::input
`;

const events = {
	onChange: action('change')
};

storiesOf('CustomSelect', module)
	// @ts-ignore
	.addParameters({
		info: stylableApi
	})
	.add(
		'with basic state',
		() => (
			<CustomSelect
				{...events}
				disabled={boolean('Disabled', false)}
			>
				<CustomSelectFace>
					{(label, { disabled }) => (
						<button
							id='customSelectFace'
							disabled={disabled}
						>
							{label}
						</button>
					)}
				</CustomSelectFace>
				<CustomSelectOption value={0}>
					Option #1
				</CustomSelectOption>
				<CustomSelectOption value={1}>
					Option #2
				</CustomSelectOption>
				<CustomSelectOption value={2}>
					Option #3
				</CustomSelectOption>
			</CustomSelect>
		)
	)
	.add(
		'with placeholder',
		() => (
			<CustomSelect
				{...events}
				id='customSelect'
				placeholder={text('Placeholder', 'Placeholder')}
				disabled={boolean('Disabled', false)}
			>
				<CustomSelectFace>
					{(label, { disabled }) => (
						<button
							id='customSelectFace'
							disabled={disabled}
						>
							{label}
						</button>
					)}
				</CustomSelectFace>
				<CustomSelectOption value={0}>
					Option #1
				</CustomSelectOption>
				<CustomSelectOption value={1}>
					Option #2
				</CustomSelectOption>
				<CustomSelectOption value={2}>
					Option #3
				</CustomSelectOption>
			</CustomSelect>
		)
	)
	.add(
		'with disabled state',
		() => (
			<CustomSelect
				{...events}
				disabled={boolean('Disabled', true)}
			>
				<CustomSelectFace>
					{(label, { disabled }) => (
						<button disabled={disabled}>
							{label}
						</button>
					)}
				</CustomSelectFace>
				<CustomSelectOption value={0}>
					Option #1
				</CustomSelectOption>
				<CustomSelectOption value={1}>
					Option #2
				</CustomSelectOption>
				<CustomSelectOption value={2}>
					Option #3
				</CustomSelectOption>
			</CustomSelect>
		)
	)
	.add(
		'with default value',
		() => (
			<CustomSelect
				{...events}
				name='select'
				defaultValue={1}
				disabled={boolean('Disabled', false)}
			>
				<CustomSelectFace>
					{(label, { disabled }) => (
						<button disabled={disabled}>
							{label}
						</button>
					)}
				</CustomSelectFace>
				<CustomSelectOption value={0}>
					Option #1
				</CustomSelectOption>
				<CustomSelectOption value={1}>
					Option #2
				</CustomSelectOption>
				<CustomSelectOption value={2}>
					Option #3
				</CustomSelectOption>
			</CustomSelect>
		)
	)
	.add(
		'with value',
		() => (
			<CustomSelect
				{...events}
				name='select'
				value={number('Value', 1)}
				disabled={boolean('Disabled', false)}
			>
				<CustomSelectFace>
					{(label, { disabled }) => (
						<button disabled={disabled}>
							{label}
						</button>
					)}
				</CustomSelectFace>
				<CustomSelectOption value={0}>
					Option #1
				</CustomSelectOption>
				<CustomSelectOption value={1}>
					Option #2
				</CustomSelectOption>
				<CustomSelectOption value={2}>
					Option #3
				</CustomSelectOption>
			</CustomSelect>
		)
	)
	.add(
		'with default multiple values',
		() => (
			<CustomSelect
				{...events}
				name='select'
				defaultValue={[1, 2]}
				disabled={boolean('Disabled', false)}
				multiple
			>
				<CustomSelectFace>
					{(label, { disabled }) => (
						<button disabled={disabled}>
							{label}
						</button>
					)}
				</CustomSelectFace>
				<CustomSelectOption value={0}>
					Option #1
				</CustomSelectOption>
				<CustomSelectOption value={1}>
					Option #2
				</CustomSelectOption>
				<CustomSelectOption value={2}>
					Option #3
				</CustomSelectOption>
			</CustomSelect>
		)
	)
	.add(
		'with basic multiple state',
		() => (
			<CustomSelect
				{...events}
				name='select'
				disabled={boolean('Disabled', false)}
				multiple
			>
				<CustomSelectFace>
					{(label, { disabled }) => (
						<button disabled={disabled}>
							{label}
						</button>
					)}
				</CustomSelectFace>
				<CustomSelectOption value={0}>
					Option #1
				</CustomSelectOption>
				<CustomSelectOption value={1}>
					Option #2
				</CustomSelectOption>
				<CustomSelectOption value={2}>
					Option #3
				</CustomSelectOption>
			</CustomSelect>
		)
	)
	.add(
		'with multiple values',
		() => (
			<CustomSelect
				{...events}
				name='select'
				value={[1, 2]}
				disabled={boolean('Disabled', false)}
				multiple
			>
				<CustomSelectFace>
					{(label, { disabled }) => (
						<button disabled={disabled}>
							{label}
						</button>
					)}
				</CustomSelectFace>
				<CustomSelectOption value={0}>
					Option #1
				</CustomSelectOption>
				<CustomSelectOption value={1}>
					Option #2
				</CustomSelectOption>
				<CustomSelectOption value={2}>
					Option #3
				</CustomSelectOption>
			</CustomSelect>
		)
	);
