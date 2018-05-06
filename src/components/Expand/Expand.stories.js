import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean
} from '@storybook/addon-knobs/react';
import Expand, {
	ExpandTitle,
	ExpandContent
} from './';

const stylableApi = `
Stylable API
---
- :active
- :disable
- ::title
- ::content
`;

storiesOf('Expand', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
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
