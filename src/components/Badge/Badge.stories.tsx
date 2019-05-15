import React from 'react';
import {
	text,
	select
} from '@storybook/addon-knobs/react';
import {
	storiesOf,
	buildInfo
} from '../../helpers/stories';
import {
	PlacementValues,
	AlignValues
} from '../common/types';
import Badge, {
	BadgeContainer
} from './';

const {
	TestIcon
} = global as any;

export const stylableApi = `
Stylable API
---
- BadgeContainer
${buildInfo([
	{
		values:  PlacementValues,
		prefix:  ':',
		postfix: 'placement',
		indent:  1
	},
	{
		values:  AlignValues,
		prefix:  ':',
		postfix: 'align',
		indent:  1
	}
])}
`;

export default storiesOf('Badge', module)
	.addParameters({
		info: stylableApi
	})
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
				placement={select('Placement', PlacementValues, 'top')}
				align={select('Align', AlignValues, 'start')}
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
