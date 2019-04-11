import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	text,
	select
} from '@storybook/addon-knobs/react';
import Tooltip from './';

export const stylableApi = `
Stylable API
---
- ::tooltip
	- :active
	- :offset
	- :topPlacement
	- :rightPlacement
	- :bottomPlacement
	- :leftPlacement
	- :startAlign
	- :centerAlign
	- :endAlign
`;

storiesOf('Tooltip', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with text',
		() => (
			<Tooltip
				id='tooltip'
				placement={select('Placement', ['top', 'right', 'bottom', 'left'], 'bottom')}
				align={select('Align', ['start', 'center', 'end'], 'start')}
				content={text('Content', 'Tooltip text')}
			>
				Point mouse on me
			</Tooltip>
		)
	)
	.add(
		'with scroll',
		() => (
			<div
				style={{
					padding: '100px 0 1200px'
				}}
			>
				<Tooltip
					placement={select('Placement', ['top', 'right', 'bottom', 'left'], 'bottom')}
					align={select('Align', ['start', 'center', 'end'], 'start')}
					content={text('Content', 'Tooltip text')}
				>
					Point mouse on me
				</Tooltip>
			</div>
		)
	)
	.add(
		'with fixed block',
		() => (
			<div
				style={{
					padding: '100px 0 1200px'
				}}
			>
				<div
					style={{
						position: 'fixed',
						top:      '30px',
						left:     '100px',
						border:   '1px solid black',
						width:    '300px',
						height:   '200px',
						overflow: 'auto'
					}}
				>
					<div
						style={{
							padding: '100px 0 1200px'
						}}
					>
						<Tooltip
							placement={select('Placement', ['top', 'right', 'bottom', 'left'], 'bottom')}
							align={select('Align', ['start', 'center', 'end'], 'start')}
							content={text('Content', 'Tooltip text')}
						>
							Point mouse on me
						</Tooltip>
					</div>
				</div>
			</div>
		)
	);
