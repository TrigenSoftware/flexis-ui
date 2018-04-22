import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs/react';
import Table, {
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Order
} from './';

const stylableApi = `
Stylable API
---
`;

const rowsCount = 10;

storiesOf('Table', module)
	.addDecorator((story, context) => withInfo(stylableApi)(story)(context))
	.addDecorator(withKnobs)
	.add(
		'with rows',
		() => (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell head>
							Email
						</TableCell>
						<TableCell head>
							First name
						</TableCell>
						<TableCell head>
							Last name
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Array(rowsCount).fill(true).map((_, i) => (
						<TableRow key={i}>
							<TableCell>
								user{i}@email.com
							</TableCell>
							<TableCell>
								John{i}
							</TableCell>
							<TableCell>
								Smith{i}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		)
	)
	.add(
		'with order',
		() => (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell
							head
							onOrderChange={action('change')}
							order={Order.None}
						>
							Email
						</TableCell>
						<TableCell
							head
							onOrderChange={action('change')}
							order={Order.Asc}
						>
							First name
						</TableCell>
						<TableCell
							head
							onOrderChange={action('change')}
							order={Order.Desc}
						>
							Last name
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Array(rowsCount).fill(true).map((_, i) => (
						<TableRow key={i}>
							<TableCell>
								user{i}@email.com
							</TableCell>
							<TableCell>
								John{i}
							</TableCell>
							<TableCell>
								Smith{i}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		)
	);
