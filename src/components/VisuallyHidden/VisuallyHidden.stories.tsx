import React from 'react';
import { storiesOf } from '@storybook/react';
import VisuallyHidden from './';

const stylableApi = `
Stylable API
---
- :focusable
`;

storiesOf('VisuallyHidden', module)
	// @ts-ignore
	.addParameters({
		info: stylableApi
	})
	.add(
		'with heading',
		() => (
			<VisuallyHidden>
				<h1>Very important but hidden title</h1>
			</VisuallyHidden>
		)
	)
	.add(
		'with focusable state',
		() => (
			<VisuallyHidden focusable>
				<button>Very important but hidden button</button>
			</VisuallyHidden>
		)
	);
