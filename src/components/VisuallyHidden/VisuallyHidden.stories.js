import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';
import VisuallyHidden from './';

const stylableApi = `
Stylable API
---
`;

storiesOf('VisuallyHidden', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with heading',
		() => (
			<VisuallyHidden>
				<h1>Very important but hidden title</h1>
			</VisuallyHidden>
		)
	);
