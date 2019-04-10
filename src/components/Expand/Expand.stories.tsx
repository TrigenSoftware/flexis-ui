import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	action
} from '@storybook/addon-actions';
import {
	boolean
} from '@storybook/addon-knobs/react';
import Expand, {
	ExpandTitle,
	ExpandContent
} from './';

export const stylableApi = `
Stylable API
---
- :active
- :disable
- ::title
- ::content
`;

storiesOf('Expand', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with simple content',
		() => (
			<Expand
				style={{
					width: '12rem'
				}}
				onToggle={action('toggle')}
				disabled={boolean('Disabled', false)}
			>
				<ExpandTitle id='expandTitle'>
					Click me!
				</ExpandTitle>
				<ExpandContent
					style={{
						padding:   '1rem',
						textAlign: 'center'
					}}
				>
					Expand content.
				</ExpandContent>
			</Expand>
		)
	)
	.add(
		'with default active',
		() => (
			<Expand
				style={{
					width: '12rem'
				}}
				onToggle={action('toggle')}
				disabled={boolean('Disabled', false)}
				defaultActive
			>
				<ExpandTitle>
					Click me!
				</ExpandTitle>
				<ExpandContent
					style={{
						padding:   '1rem',
						textAlign: 'center'
					}}
				>
					Expand content.
				</ExpandContent>
			</Expand>
		)
	)
	.add(
		'with disabled state',
		() => (
			<Expand
				style={{
					width: '12rem'
				}}
				onToggle={action('toggle')}
				disabled={boolean('Disabled', true)}
			>
				<ExpandTitle>
					Click me!
				</ExpandTitle>
				<ExpandContent
					style={{
						padding:   '1rem',
						textAlign: 'center'
					}}
				>
					Expand content.
				</ExpandContent>
			</Expand>
		)
	)
	.add(
		'with active state',
		() => (
			<Expand
				style={{
					width: '12rem'
				}}
				onToggle={action('toggle')}
				disabled={boolean('Disabled', false)}
				active={boolean('Active', true)}
			>
				<ExpandTitle>
					Click me!
				</ExpandTitle>
				<ExpandContent
					style={{
						padding:   '1rem',
						textAlign: 'center'
					}}
				>
					Expand content.
				</ExpandContent>
			</Expand>
		)
	);
