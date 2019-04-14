import React from 'react';
import {
	storiesOf
} from '../../helpers/stories';
import VisuallyHidden from './';

export const stylableApi = `
Stylable API
---
- :focusable
`;

export default storiesOf('VisuallyHidden', module)
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
