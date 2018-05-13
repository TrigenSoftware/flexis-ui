import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
	withKnobs,
	boolean
} from '@storybook/addon-knobs/react';
import Table, {
	TableHead,
	TableBody,
	TableRow,
	TableCell
} from '../Table';
import ScrollArea from './';

const stylableApi = `
Stylable API
---
- ::scroller
	- :hideXScrollbar
	- :hideYScrollbar
- ::shadow
	- :active
	- :top
	- :right
	- :bottom
	- :left
`;

const colsCount = 20,
	rowsCount = 50;

storiesOf('ScrollArea', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with scroll content',
		() => (
			<ScrollArea
				style={{
					maxHeight: '400px',
					maxWidth:  '400px'
				}}
			>
				<div
					style={{
						width:      '600px',
						height:     '600px',
						background: 'aqua'
					}}
				>
					Content
				</div>
			</ScrollArea>
		)
	)
	.add(
		'with ignore shadows',
		() => (
			<ScrollArea
				style={{
					maxHeight: '400px',
					maxWidth:  '400px'
				}}
				ignoreTopShadow={boolean('Ingore top shadow', true)}
				ignoreRightShadow={boolean('Ingore right shadow', false)}
				ignoreBottomShadow={boolean('Ingore bottom shadow', true)}
				ignoreLeftShadow={boolean('Ingore left shadow', false)}
			>
				<div
					style={{
						width:      '600px',
						height:     '600px',
						background: 'aqua'
					}}
				>
					Content
				</div>
			</ScrollArea>
		)
	)
	.add(
		'with hidden scrollbars',
		() => (
			<ScrollArea
				style={{
					maxHeight: '400px',
					maxWidth:  '400px'
				}}
				hideXScrollbar={boolean('Hide X-scrollbar', true)}
				hideYScrollbar={boolean('Hide Y-scrollbar', true)}
			>
				<div
					style={{
						width:      '600px',
						height:     '600px',
						background: 'aqua'
					}}
				>
					Content
				</div>
			</ScrollArea>
		)
	)
	.add(
		'with table',
		() => (
			<ScrollArea>
				<Table>
					<TableHead>
						<TableRow>
							{Array(colsCount).fill(true).map((_, i) => (
								<TableCell key={i} head>
									Heading
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{Array(rowsCount).fill(true).map((_, i) => (
							<TableRow key={i}>
								{Array(colsCount).fill(true).map((_, i) => (
									<TableCell key={i}>
										Cell
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</ScrollArea>
		)
	);
