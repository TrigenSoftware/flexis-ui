import React from 'react';
import {
	action
} from '@storybook/addon-actions';
import {
	storiesOf
} from '../../helpers/stories';
import Menu, {
	MenuItem,
	MenuItemSeparator,
	MenuButton
} from './';

export const stylableApi = `
Stylable API
---
- ::button
- ::item
- ::itemSeparator
`;

export const events = {
	onClick: action('click'),
	onFocus: action('focus'),
	onBlur:  action('blur')
};

export default storiesOf('Menu', module)
	.addParameters({
		info: stylableApi
	})
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
