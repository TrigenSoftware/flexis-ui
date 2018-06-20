/* tslint:disable: no-magic-numbers */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean,
	number
} from '@storybook/addon-knobs/react';
import Select, {
	SelectOption
} from './';

const stylableApi = `
Stylable API
---
- ::select
- ::border
`;

const events = {
	onChange: action('change')
};

storiesOf('Select', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with basic state',
		() => (
			<Select
				{...events}
				disabled={boolean('Disabled', false)}
			>
				<SelectOption value={0}>
					Option #1
				</SelectOption>
				<SelectOption value={1}>
					Option #2
				</SelectOption>
				<SelectOption value={2}>
					Option #3
				</SelectOption>
			</Select>
		)
	)
	.add(
		'with disabled state',
		() => (
			<Select
				{...events}
				disabled={boolean('Disabled', true)}
			>
				<SelectOption value={0}>
					Option #1
				</SelectOption>
				<SelectOption value={1}>
					Option #2
				</SelectOption>
				<SelectOption value={2}>
					Option #3
				</SelectOption>
			</Select>
		)
	)
	.add(
		'with default value',
		() => (
			<Select
				{...events}
				name='select'
				defaultValue={1}
				disabled={boolean('Disabled', false)}
			>
				<SelectOption value={0}>
					Option #1
				</SelectOption>
				<SelectOption value={1}>
					Option #2
				</SelectOption>
				<SelectOption value={2}>
					Option #3
				</SelectOption>
			</Select>
		)
	)
	.add(
		'with value',
		() => (
			<Select
				{...events}
				name='select'
				value={number('Value', 1)}
				disabled={boolean('Disabled', false)}
			>
				<SelectOption value={0}>
					Option #1
				</SelectOption>
				<SelectOption value={1}>
					Option #2
				</SelectOption>
				<SelectOption value={2}>
					Option #3
				</SelectOption>
			</Select>
		)
	)
	.add(
		'with text around',
		() => {

			const select = (
				<Select>
					<SelectOption value={0}>
						Option #1
					</SelectOption>
					<SelectOption value={1}>
						Option #2
					</SelectOption>
					<SelectOption value={2}>
						Option #3
					</SelectOption>
				</Select>
			);

			return (
				<div>
					Text {select} text
				</div>
			);
		}
	);
