import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
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
- DropdownContent
- Button
- ::placeholder
- ::options
- ::option
- ::input
`;

const events = {
	onChange: action('change')
};

const defaultValue = [1, 2]; // eslint-disable-line

storiesOf('CustomSelect', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with basic state',
		() => (
			<CustomSelect
				{...events}
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
		'with placeholder',
		() => (
			<CustomSelect
				{...events}
				placeholder={text('Placeholder', 'Placeholder')}
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
				defaultValue={defaultValue}
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
				value={defaultValue}
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
