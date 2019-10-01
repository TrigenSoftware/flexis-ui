import React from 'react';
import FocusLock from 'react-focus-lock';
import {
	action
} from '@storybook/addon-actions';
import {
	boolean
} from '@storybook/addon-knobs/react';
import {
	storiesOf
} from '../../helpers/stories';
import Modal, {
	setAppElement
} from './';

setAppElement('#root');

export const stylableApi = `
Stylable API
---
- :appear
- :appearActive
- :enter
- :enterActive
- :enterDone
- :exit
- :exitActive
- :exitDone
- ::window
	- :centered
- ::closeButton
`;

export const events = {
	onClose: action('close')
};

export default storiesOf('Modal', module)
	.addParameters({
		info: stylableApi
	})
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
		'with inactive state',
		() => (
			<Modal
				{...events}
				style={{
					width:     '500px',
					marginTop: '20px'
				}}
				active={boolean('Active', false)}
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
	)
	.add(
		'with content wrapper',
		() => (
			<Modal
				{...events}
				style={{
					width:     '500px',
					marginTop: '20px'
				}}
				active={boolean('Active', true)}
				centered={boolean('Centered', true)}
				// tslint:disable-next-line: jsx-no-lambda
				wrapContent={_ => <FocusLock>{_}</FocusLock>}
			>
				Modal content.
			</Modal>
		)
	);
