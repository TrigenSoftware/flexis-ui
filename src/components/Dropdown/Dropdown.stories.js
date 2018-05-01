import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	select,
	boolean
} from '@storybook/addon-knobs/react';
import Dropdown, { DropdownContent } from './';

const stylableApi = `
Stylable API
---
- :active
- :disable
- ::content
	- :active
	- leftAlign
	- centerAlign
	- rightAlign
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
				disabled={boolean('Disabled', false)}
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
		'with default active',
		() => (
			<Dropdown
				onToggle={action('toggle')}
				align={select('Align', ['left', 'center', 'right'], 'left')}
				disabled={boolean('Disabled', false)}
				defaultActive
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
		'with disabled state',
		() => (
			<Dropdown
				onToggle={action('toggle')}
				align={select('Align', ['left', 'center', 'right'], 'left')}
				disabled={boolean('Disabled', true)}
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
		'with active state',
		() => (
			<Dropdown
				onToggle={action('toggle')}
				align={select('Align', ['left', 'center', 'right'], 'left')}
				disabled={boolean('Disabled', false)}
				active={boolean('Active', true)}
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
					disabled={boolean('Disabled', false)}
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
							disabled={boolean('Disabled', false)}
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
