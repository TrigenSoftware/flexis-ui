import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import Button from '../Button';
import FileSelect from './';

const stylableApi = `
Stylable API
---
- ::input
`;

const events = {
	onChange: action('change')
};

storiesOf('FileSelect', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.add(
		'with button',
		() => (
			<FileSelect
				{...events}
			>
				<Button>
					Select file
				</Button>
			</FileSelect>
		)
	);
