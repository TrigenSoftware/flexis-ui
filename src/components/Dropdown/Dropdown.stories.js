import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	select
} from '@storybook/addon-knobs/react';
import Dropdown, { DropdownContent } from './';

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

storiesOf('Dropdown', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with simple content',
		() => (
			<Dropdown
				onToggle={action('toggle')}
				align={select('Align', ['left', 'center', 'right'], 'left')}
			>
				<button>
					Click me!
				</button>
				<DropdownContent
					style={{
						padding:   '1rem',
						width:     '12rem',
						textAlign: 'center'
					}}
				>
					Dropdown content.
				</DropdownContent>
			</Dropdown>
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
				<Dropdown
					onToggle={action('toggle')}
					align={select('Align', ['left', 'center', 'right'], 'left')}
				>
					<button>
						Click me!
					</button>
					<DropdownContent
						style={{
							padding:   '1rem',
							width:     '12rem',
							textAlign: 'center'
						}}
					>
						Dropdown content.
					</DropdownContent>
				</Dropdown>
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
						<Dropdown
							onToggle={action('toggle')}
							align={select('Align', ['left', 'center', 'right'], 'left')}
						>
							<button>
								Click me!
							</button>
							<DropdownContent
								style={{
									padding:   '1rem',
									width:     '12rem',
									textAlign: 'center'
								}}
							>
								Dropdown content.
							</DropdownContent>
						</Dropdown>
					</div>
				</div>
			</div>
		)
	);
