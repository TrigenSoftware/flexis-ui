import React from 'react';
import {
	storiesOf
} from '../../helpers/stories';
import SROnly from './';

export const stylableApi = `
Stylable API
---
- :focusable
`;

export default storiesOf('SROnly', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with heading',
		() => (
			<SROnly>
				<h1>Very important but hidden title</h1>
			</SROnly>
		)
	)
	.add(
		'with focusable state',
		() => (
			<SROnly focusable>
				<button>Very important but hidden button</button>
			</SROnly>
		)
	);
