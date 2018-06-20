import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
	withKnobs,
	boolean,
	number
} from '@storybook/addon-knobs/react';
import Paginator from './';

const stylableApi = `
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

storiesOf('Paginator', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
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
