import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean
} from '@storybook/addon-knobs/react';
import Modal from './';

const stylableApi = `
Stylable API
---
- ::window
	- :centered
- ::closeButton
`;

const events = {
	onClose: action('close')
};

storiesOf('Modal', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with active state',
		() => (
			<Modal
				{...events}
				style={{
					width:     '500px',
					marginTop: '20px'
				}}
				active={boolean('Active', true)}
			>
				Modal content.
			</Modal>
		)
	)
	.add(
		'with centered state',
		() => (
			<Modal
				{...events}
				style={{
					width:     '500px',
					marginTop: '20px'
				}}
				active={boolean('Active', true)}
				centered={boolean('Centered', true)}
			>
				Modal content.
			</Modal>
		)
	)
	.add(
		'with custom button',
		() => (
			<Modal
				{...events}
				style={{
					width:     '500px',
					marginTop: '20px'
				}}
				active={boolean('Active', true)}
				centered={boolean('Centered', true)}
				closeButton={<a>x</a>}
			>
				Modal content.
			</Modal>
		)
	);
