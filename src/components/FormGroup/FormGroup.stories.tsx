import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	text
} from '@storybook/addon-knobs/react';
import Input from '../Input';
import FormGroup from './';

const stylableApi = `
Stylable API
---
- ::label
`;

const events = {
	onChange: action('change'),
	onFocus:  action('focus'),
	onBlur:   action('blur')
};

storiesOf('FormGroup', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with text label',
		() => (
			<FormGroup
				label={text('Label', 'Text label')}
			>
				<Input
					defaultValue=''
					{...events}
				/>
			</FormGroup>
		)
	)
	.add(
		'with custom label',
		() => (
			<FormGroup
				label={(
					<b>
						{text('Label', 'Custom label')}
					</b>
				)}
			>
				<Input
					defaultValue=''
					{...events}
				/>
			</FormGroup>
		)
	);
