import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import Button from '../Button';
import FileUpload from './';

const stylableApi = `
Stylable API
---
- ::input
`;

const events = {
	onChange: action('change')
};

storiesOf('FileUpload', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.add(
		'with button',
		() => (
			<FileUpload
				{...events}
			>
				<Button>
					Select file
				</Button>
			</FileUpload>
		)
	);
