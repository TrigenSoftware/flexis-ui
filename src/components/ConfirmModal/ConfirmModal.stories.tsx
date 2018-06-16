import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	button
} from '@storybook/addon-knobs/react';
import ConfirmModal from './';

const stylableApi = `
Stylable API
---
- ::form
`;

storiesOf('ConfirmModal', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with active state',
		() => {

			let confirmRef = null;

			button('Show', async () => {

				if (confirmRef) {
					action('confirm')(await confirmRef.show());
				}
			});

			return (
				<ConfirmModal
					ref={(ref) => {
						confirmRef = ref;
					}}
					style={{
						width:     '500px',
						marginTop: '20px'
					}}
				>
					<p>
						Are you sure?
					</p>
					<footer>
						<button type='submit'>
							Yes
						</button>
						<button type='reset'>
							No
						</button>
					</footer>
				</ConfirmModal>
			);
		}
	);
