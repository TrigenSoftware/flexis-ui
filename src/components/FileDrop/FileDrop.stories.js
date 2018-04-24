import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import FileDrop from './';

const stylableApi = `
Stylable API
---
- :dragOver
`;

const events = {
	onChange: action('change')
};

storiesOf('FileDrop', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.add(
		'with content',
		() => (
			<FileDrop
				{...events}
				style={{
					border: '1px dashed black',
					width:  '40rem',
					height: '40rem'
				}}
			>
				Drop files here
			</FileDrop>
		)
	);
