import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean
} from '@storybook/addon-knobs/react';
import ToggleSelect, {
	ToggleSelectOption
} from './';

const stylableApi = `
Stylable API
---
- ::item
- ::input
- ::button
`;

const defaultValue = [2, 3]; // eslint-disable-line

storiesOf('ToggleSelect', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with basic state',
		() => (
			<ToggleSelect
				style={{ width: '10rem' }}
				onChange={action('change')}
				disabled={boolean('Disabled', false)}
			>
				<ToggleSelectOption value={1}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={3}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	)
	.add(
		'with disabled state',
		() => (
			<ToggleSelect
				style={{ width: '10rem' }}
				onChange={action('change')}
				disabled={boolean('Disabled', true)}
			>
				<ToggleSelectOption value={1}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={3}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	)
	.add(
		'with default value',
		() => (
			<ToggleSelect
				style={{ width: '10rem' }}
				name='select'
				onChange={action('change')}
				defaultValue={2}
				disabled={boolean('Disabled', false)}
			>
				<ToggleSelectOption value={1}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={3}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	)
	.add(
		'with value',
		() => (
			<ToggleSelect
				style={{ width: '10rem' }}
				name='select'
				onChange={action('change')}
				value={2}
				disabled={boolean('Disabled', false)}
			>
				<ToggleSelectOption value={1}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={3}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	)
	.add(
		'with default multiple values',
		() => (
			<ToggleSelect
				style={{ width: '10rem' }}
				name='select'
				onChange={action('change')}
				defaultValue={defaultValue}
				disabled={boolean('Disabled', false)}
				multiple
			>
				<ToggleSelectOption value={1}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={3}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	)
	.add(
		'with multiple values',
		() => (
			<ToggleSelect
				style={{ width: '10rem' }}
				name='select'
				onChange={action('change')}
				value={defaultValue}
				disabled={boolean('Disabled', false)}
				multiple
			>
				<ToggleSelectOption value={1}>
					Option #1
				</ToggleSelectOption>
				<ToggleSelectOption value={2}>
					Option #2
				</ToggleSelectOption>
				<ToggleSelectOption value={3}>
					Option #3
				</ToggleSelectOption>
			</ToggleSelect>
		)
	);
