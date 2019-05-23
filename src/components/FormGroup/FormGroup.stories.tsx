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
import Input from '../Input';
import Textarea from '../Textarea';
import FormGroup from './';

const {
	TestIcon
} = global as any;

export const stylableApi = `
Stylable API
---
- :withIcon
- ::label
- ::input
	- :flex
${buildInfo([
	{
		values:  AlignSideValues,
		prefix:  ':',
		postfix: 'icon',
		indent:  1
	}
])}
- ::description
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
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

export default storiesOf('FormGroup', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with input',
		() => (
			<FormGroup
				id='input-id'
				flex={boolean('Flex', true)}
				label={text('Label', 'Text label')}
			>
				<Input
					{...events}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with textarea',
		() => (
			<FormGroup
				id='input-id'
				flex={boolean('Flex', true)}
				label={text('Label', 'Text label')}
			>
				<Textarea
					{...events}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with input and text description',
		() => (
			<FormGroup
				id='input-id'
				flex={boolean('Flex', true)}
				label={text('Label', 'Text label')}
				description={text('Description', 'Description label')}
			>
				<Input
					{...events}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with required state',
		() => (
			<FormGroup
				id='input-id'
				label={text('Label', 'Text label')}
				description={text('Description', 'Description label')}
			>
				<Input
					{...events}
					required={boolean('Required', true)}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with input and icon',
		() => (
			<FormGroup
				id='input-id'
				flex={boolean('Flex', true)}
				label={text('Label', 'Text label')}
				description={text('Description', 'Description label')}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, 'left')}
			>
				<Input
					{...events}
					required={boolean('Required', false)}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with textarea and icon',
		() => (
			<FormGroup
				id='input-id'
				label={text('Label', 'Text label')}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, 'left')}
			>
				<Textarea
					{...events}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with custom label',
		() => (
			<FormGroup
				id='input-id'
				label={(
					<b>
						{text('Label', 'Custom label')}
					</b>
				)}
			>
				<Input
					{...events}
					defaultValue=''
				/>
			</FormGroup>
		)
	);
