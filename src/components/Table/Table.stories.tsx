import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	action
} from '@storybook/addon-actions';
import Table, {
	TableHead,
	TableBody,
	TableFoot,
	TableRow,
	TableCell,
	Order
} from './';

export const stylableApi = `
Stylable API
---
- ::head
- ::body
- ::row
- ::cell
	- :head
	- :orderNone
	- :orderAsc
	- :orderDesc
`;

const rowsCount = 10;
const columnsCount = 3;

storiesOf('Table', module)
	.addParameters({
		info: stylableApi
	})
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
					{Array.from({ length: rowsCount }).map((_, i) => (
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
				<TableFoot>
					<TableRow>
						<TableCell colSpan={columnsCount}>
							Footer
						</TableCell>
					</TableRow>
				</TableFoot>
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
					{Array.from({ length: rowsCount }).map((_, i) => (
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
