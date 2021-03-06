import React from 'react';
import {
	action
} from '@storybook/addon-actions';
import {
	boolean,
	number
} from '@storybook/addon-knobs/react';
import {
	storiesOf
} from '../../helpers/stories';
import Paginator from './';

export const stylableApi = `
Stylable API
---
- :disabled
- ::item
- ::separator
- ::button
	- :active
	- :disabled
`;

const totalPagesCount = 30;
const defaultPage = 15;

export default storiesOf('Paginator', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with simple content',
		() => (
			<Paginator
				onChange={action('change')}
				total={number('Total', totalPagesCount)}
				disabled={boolean('Disabled', false)}
			/>
		)
	)
	.add(
		'with default page',
		() => (
			<Paginator
				onChange={action('change')}
				total={number('Total', totalPagesCount)}
				disabled={boolean('Disabled', false)}
				defaultPage={defaultPage}
			/>
		)
	)
	.add(
		'with disabled state',
		() => (
			<Paginator
				onChange={action('change')}
				total={number('Total', totalPagesCount)}
				disabled={boolean('Disabled', true)}
			/>
		)
	)
	.add(
		'with page',
		() => (
			<Paginator
				onChange={action('change')}
				total={number('Total', totalPagesCount)}
				disabled={boolean('Disabled', false)}
				page={number('Page', defaultPage)}
			/>
		)
	);
