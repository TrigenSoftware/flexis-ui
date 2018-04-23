import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
	withKnobs,
	text,
	select
} from '@storybook/addon-knobs/react';
import Badge, { BadgeContainer } from './';

const { TestIcon } = global;

const stylableApi = `
Stylable API
---
- BadgeContainer
	- :topPlacement
	- :rightPlacement
	- :bottomPlacement
	- :leftPlacement
	- :startAlign
	- :centerAlign
	- :endAlign
`;

storiesOf('Badge', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with text',
		() => (
			<Badge>
				{text('Content', 'Badge')}
			</Badge>
		)
	)
	.add(
		'with container',
		() => (
			<BadgeContainer
				placement={select('Placement', ['top', 'right', 'bottom', 'left'], 'top')}
				align={select('Align', ['start', 'center', 'end'], 'start')}
			>
				<TestIcon
					width='32px'
					height='32px'
				/>
				<Badge>
					{text('Content', 'Badge')}
				</Badge>
			</BadgeContainer>
		)
	);
