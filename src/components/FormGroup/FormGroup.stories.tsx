import React from 'react';
import {
	action
} from '@storybook/addon-actions';
import {
	text,
	boolean
} from '@storybook/addon-knobs/react';
import {
	storiesOf
} from '../../helpers/stories';
import Input from '../Input';
import FormGroup from './';

export const stylableApi = `
Stylable API
---
- :required
- ::label
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
		'with text label',
		() => (
			<FormGroup
				id='input-id'
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
		'with text description',
		() => (
			<FormGroup
				id='input-id'
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
				required={boolean('Required', true)}
			>
				<Input
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
