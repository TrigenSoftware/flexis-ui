import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
	withKnobs,
	text,
	select
} from '@storybook/addon-knobs/react';
import Badge, {
	BadgeContainer,
	colors,
	sizes
} from './';

const { TestIcon } = global;

const stylableApi = `
Stylable API
---
${colors.map(_ => `- :${_}Color`).join('\n')}
${sizes.map(_ => `- :${_}Size`).join('\n')}
- BadgeContainer:topPlacement
- BadgeContainer:rightPlacement
- BadgeContainer:bottomPlacement
- BadgeContainer:leftPlacement
- BadgeContainer:startAlign
- BadgeContainer:centerAlign
- BadgeContainer:endAlign
`;

storiesOf('Badge', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with text',
		() => (
			<Badge
				label={text('Label', 'Badge')}
			/>
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
				<Badge
					label={text('Label', 'Badge')}
				/>
			</BadgeContainer>
		)
	)
	.add(
		'with custom styles',
		() => (
			<Badge
				color={select('Color', colors, colors[0])}
				size={select('Size', sizes, sizes[0])}
				label={text('Label', 'Badge')}
			/>
		)
	);
