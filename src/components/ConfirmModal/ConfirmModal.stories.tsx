import React from 'react';
import {
	action
} from '@storybook/addon-actions';
import {
	button
} from '@storybook/addon-knobs/react';
import {
	storiesOf
} from '../../helpers/stories';
import ConfirmModal from './';

export const stylableApi = `
Stylable API
---
- ::form
`;

let confirmRef = null;

export default storiesOf('ConfirmModal', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with show demo',
		() => {

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
