import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
	withKnobs,
	text,
	select
} from '@storybook/addon-knobs/react';
import Tooltip from './';

const stylableApi = `
Stylable API
---
- ::box
- ::tooltip:active
- ::tooltip:topPlacement
- ::tooltip:rightPlacement
- ::tooltip:bottomPlacement
- ::tooltip:leftPlacement
- ::tooltip:startAlign
- ::tooltip:centerAlign
- ::tooltip:endAlign
`;

storiesOf('Tooltip', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with text',
		() => (
			<Tooltip
				placement={select('Placement', ['top', 'right', 'bottom', 'left'], 'bottom')}
				align={select('Align', ['start', 'center', 'end'], 'start')}
				content={text('Content', 'Tooltip text')}
			>
				Point mouse on me
			</Tooltip>
		)
	);
