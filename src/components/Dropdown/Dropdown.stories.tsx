import React from 'react';
import {
	action
} from '@storybook/addon-actions';
import {
	select,
	boolean
} from '@storybook/addon-knobs/react';
import {
	storiesOf
} from '../../helpers/stories';
import Dropdown, {
	DropdownContent
} from './';

export const stylableApi = `
Stylable API
---
- :active
- :disable
- ::content
	- :active
	- :offset
	- :leftAlign
	- :centerAlign
	- :rightAlign
`;

export default storiesOf('Dropdown', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with simple content',
		() => (
			<Dropdown
				onToggle={action('toggle')}
				align={select('Align', ['left', 'center', 'right'], 'left')}
				disabled={boolean('Disabled', false)}
				blockScroll={boolean('Block scroll', true)}
			>
				<button id='dropdownToggleButton'>
					Click me!
				</button>
				<DropdownContent
					style={{
						padding:   '1rem',
						width:     '12rem',
						textAlign: 'center'
					}}
				>
					Dropdown content.<br/>
					<button>text</button>
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
				blockScroll={boolean('Block scroll', true)}
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
				blockScroll={boolean('Block scroll', true)}
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
				blockScroll={boolean('Block scroll', true)}
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
					blockScroll={boolean('Block scroll', true)}
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
							blockScroll={boolean('Block scroll', true)}
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
	)
	.add(
		'with two dropdowns',
		() => (
			<>
				<Dropdown
					onToggle={action('toggle')}
				>
					<button id='dropdownToggleButton'>
						Click me!
					</button>
					<DropdownContent>
						Dropdown content.
					</DropdownContent>
				</Dropdown>
				<Dropdown
					onToggle={action('toggle')}
				>
					<button id='dropdownToggleButton2'>
						Click me!
					</button>
					<DropdownContent>
						Dropdown content.
					</DropdownContent>
				</Dropdown>
			</>
		)
	);
