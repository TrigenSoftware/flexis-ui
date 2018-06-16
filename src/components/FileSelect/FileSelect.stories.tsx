import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean
} from '@storybook/addon-knobs/react';
import Button from '../Button';
import FileSelect from './';

const stylableApi = `
Stylable API
---
- :disabled
- ::input
- ::border
`;

const events = {
	onChange: action('change')
};

storiesOf('FileSelect', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with button',
		() => (
			<FileSelect
				{...events}
				disabled={boolean('Disabled', false)}
			>
				<Button>
					Select file
				</Button>
			</FileSelect>
		)
	)
	.add(
		'with disabled state',
		() => (
			<FileSelect
				{...events}
				disabled={boolean('Disabled', true)}
			>
				<Button>
					Select file
				</Button>
			</FileSelect>
		)
	);
