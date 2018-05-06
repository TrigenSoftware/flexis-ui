import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Table.st.css';

export * from './TableHead';
export * from './TableBody';
export * from './TableRow';
export * from './TableCell';

Table.propTypes = {
	children: PropTypes.node.isRequired
};

export default function Table({
	children,
	...props
}) {
	return (
		<table
			{...getHtmlProps(props)}
			{...stylesheet('root', {}, props)}
		>
			{children}
		</table>
	);
}
