/* tslint:disable: no-magic-numbers */
import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	action
} from '@storybook/addon-actions';
import {
	boolean,
	number
} from '@storybook/addon-knobs/react';
import Button from '../Button';
import CustomFlatSelect, {
	CustomFlatSelectOptionFace,
	CustomFlatSelectOption
} from './';

export const stylableApi = `
Stylable API
---
- ::option
- ::label
- ::input
`;

export const events = {
	onChange: action('change')
};

storiesOf('CustomFlatSelect', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with basic state',
		() => (
			<CustomFlatSelect
				{...events}
				id='toggleSelect'
				style={{ width: '10rem' }}
				disabled={boolean('Disabled', false)}
			>
				<CustomFlatSelectOption value={0}>
					Option #1
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={1}>
					Option #2
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={2}>
					Option #3
				</CustomFlatSelectOption>
			</CustomFlatSelect>
		)
	)
	.add(
		'with custom face',
		() => (
			<CustomFlatSelect
				{...events}
				id='toggleSelect'
				style={{ width: '10rem' }}
				disabled={boolean('Disabled', false)}
			>
				<CustomFlatSelectOptionFace>
					{(label, props) => (
						<Button
							{...props}
							type='button'
						>
							{label}
						</Button>
					)}
				</CustomFlatSelectOptionFace>
				<CustomFlatSelectOption value={0}>
					Option #1
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={1}>
					Option #2
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={2}>
					Option #3
				</CustomFlatSelectOption>
			</CustomFlatSelect>
		)
	)
	.add(
		'with disabled state',
		() => (
			<CustomFlatSelect
				{...events}
				style={{ width: '10rem' }}
				disabled={boolean('Disabled', true)}
			>
				<CustomFlatSelectOption value={0}>
					Option #1
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={1}>
					Option #2
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={2}>
					Option #3
				</CustomFlatSelectOption>
			</CustomFlatSelect>
		)
	)
	.add(
		'with default value',
		() => (
			<CustomFlatSelect
				{...events}
				style={{ width: '10rem' }}
				name='select'
				defaultValue={1}
				disabled={boolean('Disabled', false)}
			>
				<CustomFlatSelectOption value={0}>
					Option #1
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={1}>
					Option #2
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={2}>
					Option #3
				</CustomFlatSelectOption>
			</CustomFlatSelect>
		)
	)
	.add(
		'with value',
		() => (
			<CustomFlatSelect
				{...events}
				style={{ width: '10rem' }}
				name='select'
				value={number('Value', 1)}
				disabled={boolean('Disabled', false)}
			>
				<CustomFlatSelectOption value={0}>
					Option #1
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={1}>
					Option #2
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={2}>
					Option #3
				</CustomFlatSelectOption>
			</CustomFlatSelect>
		)
	)
	.add(
		'with default multiple values',
		() => (
			<CustomFlatSelect
				{...events}
				style={{ width: '10rem' }}
				name='select'
				defaultValue={[1, 2]}
				disabled={boolean('Disabled', false)}
				multiple
			>
				<CustomFlatSelectOption value={0}>
					Option #1
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={1}>
					Option #2
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={2}>
					Option #3
				</CustomFlatSelectOption>
			</CustomFlatSelect>
		)
	)
	.add(
		'with basic multiple state',
		() => (
			<CustomFlatSelect
				{...events}
				style={{ width: '10rem' }}
				name='select'
				disabled={boolean('Disabled', false)}
				multiple
			>
				<CustomFlatSelectOption value={0}>
					Option #1
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={1}>
					Option #2
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={2}>
					Option #3
				</CustomFlatSelectOption>
			</CustomFlatSelect>
		)
	)
	.add(
		'with multiple values',
		() => (
			<CustomFlatSelect
				{...events}
				style={{ width: '10rem' }}
				name='select'
				value={[1, 2]}
				disabled={boolean('Disabled', false)}
				multiple
			>
				<CustomFlatSelectOption value={0}>
					Option #1
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={1}>
					Option #2
				</CustomFlatSelectOption>
				<CustomFlatSelectOption value={2}>
					Option #3
				</CustomFlatSelectOption>
			</CustomFlatSelect>
		)
	);
