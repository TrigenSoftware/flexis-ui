import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs/react';
import Menu, {
	MenuItem,
	MenuItemSeparator,
	MenuButton
} from './';

const stylableApi = `
Stylable API
---
- ::item
- ::itemSeparator
- ::button
`;

const events = {
	onClick: action('click'),
	onFocus: action('focus'),
	onBlur:  action('blur')
};

storiesOf('Menu', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with items',
		() => (
			<Menu style={{ width: '10rem' }}>
				<MenuItem>
					<MenuButton {...events}>
						Menu item #1
					</MenuButton>
				</MenuItem>
				<MenuItem>
					<MenuButton {...events}>
						Menu item #2
					</MenuButton>
				</MenuItem>
				<MenuItem>
					<MenuButton {...events}>
						Menu item #3
					</MenuButton>
				</MenuItem>
			</Menu>
		)
	)
	.add(
		'with separator',
		() => (
			<Menu style={{ width: '10rem' }}>
				<MenuItem>
					<MenuButton {...events}>
						Menu item #1
					</MenuButton>
				</MenuItem>
				<MenuItemSeparator style={{ minHeight: '1em' }}/>
				<MenuItem>
					<MenuButton {...events}>
						Menu item #2
					</MenuButton>
				</MenuItem>
				<MenuItem>
					<MenuButton {...events}>
						Menu item #3
					</MenuButton>
				</MenuItem>
			</Menu>
		)
	)
	.add(
		'with items and submenu',
		() => (
			<Menu style={{ width: '10rem' }}>
				<MenuItem>
					<MenuButton {...events}>
						Menu item #1
					</MenuButton>
				</MenuItem>
				<MenuItem>
					<MenuButton {...events}>
						Menu item #2
					</MenuButton>
				</MenuItem>
				<MenuItem>
					<Menu style={{ width: '10rem', marginLeft: '4rem' }}>
						<MenuItem>
							<MenuButton {...events}>
								Menu item #1
							</MenuButton>
						</MenuItem>
						<MenuItem>
							<MenuButton {...events}>
								Menu item #2
							</MenuButton>
						</MenuItem>
					</Menu>
				</MenuItem>
			</Menu>
		)
	);
